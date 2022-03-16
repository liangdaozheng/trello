import {
  Controller,
  Ctx,
  Post,
  Get,
  Put,
  Delete,
  Flow,
  Params,
  Query,
  Body
} from 'koa-ts-controllers'
import {Context} from 'koa'
import Boom from '@hapi/Boom'
import authorization from '../middlewares/authorization'
import { Board as BoardModel } from '../models/Board';
import {PostAddBoardBody,PutUpdateBoardBody} from '../validators/Board';
@Controller('/board')
@Flow([authorization])
export class BoardController {
  @Post('')
  public async addBoard(
    @Ctx() ctx:Context,
    @Body() body:PostAddBoardBody
  ){

  }
  @Get('')
  public async getBoards(
    @Ctx() ctx:Context
  ){

  }
  // 制定看板详情
  @Get('/:id(\\d+)')
  public async getBoard(
    @Ctx() ctx:Context,
    @Params('id') id:number
  ){

  }
  // 更新看板
  @Put('/id:(\\d+)')
  public async updatedBoard(
    @Ctx() ctx:Context,
    @Params('id') id:number,
    @Body() body:PutUpdateBoardBody
  ) {
    
  }
  // 删除面板
  @Delete('/id:(\\d+)')
  public async deleteBoard(
    @Ctx() ctx:Context,
    @Params('id') id:number,
  ){

  }

}