import { Body, Controller, Get, Header, Params, Post, Query } from "koa-ts-controllers";
import {IsNumberString} from 'class-validator';
import Boom from '@hapi/boom'

class GetUsersQuery{
  @IsNumberString()
  page:number
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
  async postUser(@Body() body:{
    name:string;
    password:string
  },
  @Header() h:any
  ){
    console.log(body);
    console.log(h);
    
    
    return `当前请求的Body的提交的数据是：${JSON.stringify(body)}`;
  }
  @Get('/users')
  async getUsers(
    @Query() q:GetUsersQuery
  ){

    if(true){
      throw Boom.notFound('注册失败','用户已存在')
    }

    console.log(JSON.stringify(q));
    
  }





}