
import { IsNotEmpty, IsNumber, IsNumberString ,MaxLength,Min, ValidateIf} from 'class-validator';
import Boom from '@hapi/Boom'
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard';

export class PostAddCardBody {
  @Min(1,{
    message:'Id不能为空且必须为数字'
  })
  boardListId:number
  @IsNotEmpty({
    message:'名称不能为空'
  })
  @MaxLength(255,{
    message:'最大255字符'
  })
  name:string
  @ValidateIf(o=>o.description !== undefined)
  @MaxLength(2000,{
    message:'最大2000字符'
  })
  description?:string
}
export class GetCardsQuery{
  @IsNumberString({
    message:'不能为空且为数字'
  })
  boardListId:number
}

export class PutUpdateCardBody{
  @ValidateIf(o=>o.boardListId !== undefined)
  @Min(1,{
    message:'Id不能为空且必须为数字'
  })
  boardListId?:number
  @ValidateIf(o=>o.name !== undefined)
  @MaxLength(255,{
    message:'最大255字符'
  })
  name?:string
  @ValidateIf(o=>o.description !== undefined)
  @MaxLength(2000,{
    message:'最大2000字符'
  })
  description?:string
  @ValidateIf(o=>o.order !== undefined)
  @IsNumber({},{
    message:'必须为数字'
  })
  order?:number
}
export async function getAndValidateBoardListCard(id:number,userId:number):Promise<BoardListCardModel>{
  let board = await BoardListCardModel.findByPk(id);
    if(!board){
      throw Boom.notFound('指定列表不存在')
    }
    if(board.userId !==userId){
      throw Boom.forbidden('禁止访问该列表')
    }
  return  board;
}