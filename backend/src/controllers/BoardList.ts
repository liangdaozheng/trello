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
import Boom from '@hapi/Boom'
import authorization from '../middlewares/authorization'
import {PostAddListBody,GetListsQuery,PutUpdateListBoard,getAndValidateBoardList} from '../validators/BoardList';
import {getAndValidateBoard} from '../validators/Board';
import { BoardList as BoardListModle} from '../models/BoardList';

@Controller('/list')
@Flow([authorization])
export class BoardListController{
  // 创建列表
  @Post('')
  public async addList(
    @Ctx() ctx:Context,
    @Body() body:PostAddListBody
  ){
    let {boardId,name} = body;
    await getAndValidateBoard(boardId,ctx.userInfo.id);

    let maxOrderBoardList = await BoardListModle.findOne({
      where:{boardId},
      order:[['order','desc']]
    });

    let boardList = new BoardListModle();
    boardList.userId=ctx.userInfo.id;
    boardList.boardId=boardId;
    boardList.name=name;
    boardList.order=maxOrderBoardList?maxOrderBoardList.order + 65535:65535;
    await boardList.save();

    ctx.status=201;
    return boardList;

  }
  // 获取列表集合
  @Get('')
  public async getLists(
    @Ctx() ctx:Context,
    @Query() query:GetListsQuery
  ){
    let {boardId} = query;
    await getAndValidateBoard(boardId,ctx.userInfo.id);
    let boardList = await BoardListModle.findAll({
      where:{
        boardId,
      },
      order:[['order','asc']]
    });
    return boardList;

  }
  // 获取指定的列表
  @Get('/:id(\\d+)')
  public async getList(
    @Ctx() ctx:Context,
    @Params('id') id:number
  ){
    let boardList = await getAndValidateBoardList(id,ctx.userInfo.id);
    return boardList;
  }
  // 更新一个指定列表
  @Put('/:id(\\d+)')
  public async updateList(
    @Ctx() ctx:Context,
    @Params('id') id:number,
    @Body() body:PutUpdateListBoard
  ){
    let {name,order,boardId} = body;
    let boardList = await getAndValidateBoardList(id,ctx.userInfo.id);
    boardList.boardId=boardId || boardList.boardId;
    boardList.name=name || boardList.name;
    boardList.order=order || boardList.order;
    await boardList.save();
    // console.log(boardList);
    
    ctx.status=204;
    return boardList;
  }
  // 删除
  @Delete('/:id(\\d+)')
  public async deteleList(
    @Ctx() ctx:Context,
    @Params('id') id:number,
  ){
    let boardList = await getAndValidateBoardList(id,ctx.userInfo.id);
    boardList.destroy();
    ctx.status=204;
    return;
  }
}