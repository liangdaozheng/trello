import { Body, Controller, Ctx, Get, Header, Params, Post, Query } from "koa-ts-controllers";
import {IsNotEmpty, IsNumberString} from 'class-validator';
import Boom from '@hapi/Boom'
import {Context} from 'koa';

class GetUsersQuery {
  @IsNumberString({
    // message:'page必须位数字'
  })
  page: number;
}

class PostUserBody {
  @IsNotEmpty({
    message:'用户名不能为空'
  })
  name:string
  @IsNotEmpty({
    message:'密码不能为空'
  })
  password:string
}

@Controller('/test')
class TestControllers{

  @Get('/hello')
  async hello(a:any) {
    console.log(a.b);
    
    return 'hello Test';
  }
  // @Get('/user/:id(\\d+)')
  // async getUser(@Params('id') id:number){
  //   return `当前请求的params的id是：${id}`;
  // }
  // @Get('/user')
  // async getUser2(@Query() q:{id:number}){
  //   return `当前请求的Query的id是：${q.id}`;
  // }
  @Post('/user')
  async postUser(
    @Ctx() ctx:Context,
    @Body() body:PostUserBody,
    @Header() h:any
  ){
    // console.log(body);
    // console.log(h);
    // return `当前请求的Body的提交的数据是：${JSON.stringify(body)}`;
    ctx.status=201;
    return {
      id:1,
      name:body.name,
      cteateAt:new Date()
    }
  }
  @Get('/users')
  async getUsers(
    @Query() q:GetUsersQuery
  ){

    if(true){
      throw Boom.notFound('注册失败','用户已存在')
    }

    return '传过来的query：' + JSON.stringify(q);
    
  }





}