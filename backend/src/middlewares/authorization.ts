import {Context,Next} from 'koa';
import Boom from '@hapi/Boom';

export default async function authorization(
  ctx:Context,
  next:Next
){
  console.log(ctx.userInfo);
  
  if(!ctx.userInfo || ctx.userInfo.id<1){
    throw Boom.unauthorized('无权访问，敬请登录');
  }
  await next();
}