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
import {GetCardsQuery,PostAddCardBody,PutUpdateCardBody,getAndValidateBoardListCard} from '../validators/BoardListCard';
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard';

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
    boardListCard.description =  boardListCard.description;
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
      order:[['id','asc']]
    });
    return boardListCard;
  }
  @Get('/id:(\\d+)')
  public async getCard(
    @Ctx() ctx:Context,
    @Params('id') id:number
  ){
    let boardListCard= await getAndValidateBoardListCard(id,ctx.userInfo.id);
    
    return boardListCard;
  }
  @Put('/id:(\\d+)')
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


}