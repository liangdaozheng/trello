import {
  Controller,
  Ctx,
  Post,
  Get,
  Put,
  Delete,
  Flow,
  Params,
  Body,
  Query
} from 'koa-ts-controllers'
import {Context} from 'koa'
import {getAndValidateBoardList} from '../validators/BoardList'
import authorization from '../middlewares/authorization'
import {GetCardsQuery,PostAddCardBody,PutUpdateCardBody,getAndValidateBoardListCard,getAndValidateCardAttachment,PutSetCoverBody} from '../validators/BoardListCard';
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard';
import {Comment as CommentModel} from '../models/Comment'
import { CardAttachment as CardAttachmentModel } from '../models/CardAttachment';
import { Attachment as AttachmentModel } from '../models/Attachment';
import configs from '../configs';
import Boom from '@hapi/Boom'

@Controller('/card')
@Flow([authorization])
export class BoardListCardController{

  // 创建卡片
  @Post('')
  public async addCard(
    @Ctx() ctx:Context,
    @Body() body:PostAddCardBody
  ){
    let {boardListId,name,description} = body;

    await getAndValidateBoardList(boardListId,ctx.userInfo.id);

    let boardListCard = new BoardListCardModel();
    boardListCard.userId = ctx.userInfo.id;
    boardListCard.boardListId = boardListId;
    boardListCard.name = name;
    boardListCard.description =  boardListCard.description || '';
    await boardListCard.save();
    ctx.status=201;
    return boardListCard;

  }
  // 获取开片列表
  @Get('')
  public async getCards(
    @Ctx() ctx:Context,
    @Query() query:GetCardsQuery
  ){
    let {boardListId} = query;

    await getAndValidateBoardList(boardListId,ctx.userInfo.id);
    let boardListCard = await BoardListCardModel.findAll({
      where:{
        boardListId
      },
      order:[['id','asc']],
      include:[
        {
          model:CommentModel,
          attributes:['id']
        },
        {
          model:CardAttachmentModel,
          include:[
            {
              model:AttachmentModel,
            }
          ]
        }
      ]
    });
    let boardListCardsData = boardListCard.map((card:BoardListCardModel)=>{
      // 处理附件的路径和封面
      let coverPath = '';
      let attachments = card.attachments.map( attachment => {
          let data = attachment.toJSON() as CardAttachmentModel & {path: string};
          data.path = configs.storage.prefix + '/' + data.detail.name;
          if (data.isCover) {
              coverPath = data.path;
          }
          return data;
      });
      return {
          id: card.id,
          userId: card.userId,
          boardListId: card.boardListId,
          name: card.name,
          description: card.description,
          order: card.order,
          createdAt: card.createdAt,
          updatedAt: card.updatedAt,
          attachments: attachments,
          coverPath: coverPath,
          commentCount: card.comments.length
      }

    })
    return boardListCardsData;
  }
  @Get('/id:(\\d+)')
  public async getCard(
    @Ctx() ctx:Context,
    @Params('id') id:number
  ){
    let boardListCard= await getAndValidateBoardListCard(id,ctx.userInfo.id);
    
    return boardListCard;
  }
  @Put('/:id(\\d+)')
  public async putCard(
    @Ctx() ctx:Context,
    @Params('id') id:number,
    @Body() body:PutUpdateCardBody
  ){
    let {boardListId, name, description, order} = body;

    let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);

    boardListCard.boardListId = boardListId || boardListCard.boardListId;
    boardListCard.name = name || boardListCard.name;
    boardListCard.description = description || boardListCard.description;
    boardListCard.order = order || boardListCard.order;

    await boardListCard.save();

    ctx.status = 204;
    return boardListCard;

  }
  @Delete('/id:(\\d+)')
  public async deleteCard(
    @Ctx() ctx:Context,
    @Params('id') id:number
  ){
    let boardListCard= await getAndValidateBoardListCard(id,ctx.userInfo.id);
    boardListCard.destroy();
    ctx.status = 204;
    return;
  }
  
   @Post('/attachment')
   public async addAttachemnt(
       @Ctx() ctx: Context,
       @Body() body: any
   ) {

       let {boardListCardId} = body;

       let card = await getAndValidateBoardListCard(boardListCardId, ctx.userInfo.id);

       //ctx.request.files.attachment;
       if (!ctx.request.files || !ctx.request.files.attachment) {
           throw Boom.badData('缺少附件');
       }

       let file = ctx.request.files.attachment;
       
       let attachment = new AttachmentModel();
       attachment.userId = ctx.userInfo.id;
       attachment.originName = file.name;
       attachment.name = file.path.split(/\\/).pop() as string;
       attachment.type = file.type;
       attachment.size = file.size;
       await attachment.save();

       let cardAttachment = new CardAttachmentModel();
       cardAttachment.userId = ctx.userInfo.id;
       cardAttachment.boardListCardId = boardListCardId;
       cardAttachment.attachmentId = attachment.id;
       await cardAttachment.save();

       ctx.status = 201;
       return {
           id: cardAttachment.id,
           userId: cardAttachment.userId,
           boardListCardId: cardAttachment.boardListCardId,
           attachmentId: attachment.id,
           path: configs.storage.prefix + '/' + attachment.name,
           isCover: false,
           detail: attachment
       }

   }

  //  删除附件
   @Delete('/attachment/:id(\\d+)')
   public async deleteAttachment(
       @Ctx() ctx: Context,
       @Params('id') id: number
   ) {
       let cardAttachment = await getAndValidateCardAttachment(id, ctx.userInfo.id);

       // 这里只是移除了关联表，附件表，硬盘里存储的附件是没有删除
       await cardAttachment.destroy();
       ctx.status = 204;
       return;
   }
  //  设置封面
   @Put('/attachment/cover/:id(\\d+)')
   public async setCover(
       @Ctx() ctx: Context,
       @Params('id') id: number
   ) {

       let cardAttachment = await getAndValidateCardAttachment(id, ctx.userInfo.id);

       await CardAttachmentModel.update({
           isCover: false
       }, {
           where: {
               boardListCardId: cardAttachment.boardListCardId
           }
       });

       cardAttachment.isCover = true;
       await cardAttachment.save();

       ctx.status = 204;
       return;

   }
  //  取消封面
   @Delete('/attachment/cover/:id(\\d+)')
   public async deleteCover(
       @Ctx() ctx: Context,
       @Params('id') id: number
   ) {

       let cardAttachment = await getAndValidateCardAttachment(id, ctx.userInfo.id);

       cardAttachment.isCover = false;
       cardAttachment.save();

       ctx.status = 204;
       return;

   }


}