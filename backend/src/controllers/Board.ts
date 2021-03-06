import {
  Controller,
  Ctx,
  Post,
  Get,
  Put,
  Delete,
  Flow,
  Params,
  Body
} from 'koa-ts-controllers'
import {Context} from 'koa'
// import Boom from '@hapi/Boom'
import authorization from '../middlewares/authorization'
import { Board as BoardModel } from '../models/Board';
import {PostAddBoardBody,PutUpdateBoardBody,getAndValidateBoard} from '../validators/Board';
@Controller('/board')
@Flow([authorization])
export class BoardController {
  // 创建新面板
  @Post('')
  public async addBoard(
    @Ctx() ctx:Context,
    @Body() body:PostAddBoardBody
  ){
    let {name} = body;
    let board = new BoardModel();
    board.name=name;
    board.userId=ctx.userInfo.id;
    await board.save();
    ctx.status = 201;
    return board;
  }
  // 获取当前登录用户的所有看板
  @Get('')
  public async getBoards(
    @Ctx() ctx:Context
  ){
    let where ={
      userId:ctx.userInfo.id
    };
    let boards = await BoardModel.findAll({where})
    return boards

  }
  // 制定看板详情
  @Get('/:id(\\d+)')
  public async getBoard(
    @Ctx() ctx:Context,
    @Params('id') id:number
  ){
    let board = await getAndValidateBoard(id,ctx.userInfo.id)
    return board;
  }
  // 更新看板
  @Put('/id:(\\d+)')
  public async updatedBoard(
    @Ctx() ctx:Context,
    @Params('id') id:number,
    @Body() body:PutUpdateBoardBody
  ) {
    let {name} =body;
    let board = await getAndValidateBoard(id,ctx.userInfo.id);
    board.name = name || board.name;
    await board.save();
    ctx.status=204;
  }
  // 删除面板
  @Delete('/id:(\\d+)')
  public async deleteBoard(
    @Ctx() ctx:Context,
    @Params('id') id:number,
  ){
    let board = await getAndValidateBoard(id,ctx.userInfo.id);
    await board.destroy();
    ctx.status=204;
  }

}

