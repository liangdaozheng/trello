import { IsNotEmpty, IsNumber, IsNumberString, Min, ValidateIf } from 'class-validator';
import Boom from '@hapi/Boom'
import { BoardList as BoardListModel } from '../models/BoardList';

export class GetListsQuery{
  @IsNumberString({
    message:'面板Id不能为空且必须为数字'
  })
  boardId:number
}
export class PostAddListBody{
  
  @Min(1,{
    message:'面板Id不能为空且必须为数字'
  })
  boardId:number;
  @IsNotEmpty({
    message:'列表名词不能为空'
  })
  name:string
}
export class PutUpdateListBoard{
  @ValidateIf(o=>o.boardId !== undefined)
  @Min(1,{
    message:'面板Id不能为空且必须为数字'
  })
  boardId:number;
  @ValidateIf(o=>o.name !== undefined)
  @IsNotEmpty({
    message:'列表名词不能为空'
  })
  name:string;
  @ValidateIf(o=>o.order !== undefined)
  @IsNumber({},{
    message:'必须是数字'
  })
  order:number;

}
export async function getAndValidateBoardList(id:number,userId:number):Promise<BoardListModel>{
  let board = await BoardListModel.findByPk(id);
    if(!board){
      throw Boom.notFound('指定列表不存在')
    }
    if(board.userId !==userId){
      throw Boom.forbidden('禁止访问该列表')
    }
  return  board;
}