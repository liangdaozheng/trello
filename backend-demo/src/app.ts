import configs from "./configs";
import Koa from 'koa';
import { bootstrapControllers } from 'koa-ts-controllers';
import KoaRouter from 'koa-router';
import path from "path";
import KoaBodyParser from 'koa-bodyparser';
import { Context } from "vm";
import Boom from '@hapi/Boom';
import {Sequelize} from 'sequelize-typescript'


(async () => {

  const app = new Koa();

  const router=new KoaRouter();

  // 连接数据库
  const db=new Sequelize({
    ...configs.database,
    models:[__dirname+'/models/**/*']
  });

  // 注册路由
  await bootstrapControllers(app,{
    router,
    basePath:'/api',
    versions:[1],
    controllers:[
      path.resolve(__dirname,'controllers/**/*')
    ],
    errorHandler:async (err:any,ctx:Context) => {
      let status=500;
      let body:any={
        statusCode:status,
        error:'Internet Server error',
        message:'An internet server error occurred'
      };
      if(err.output){
        status=err.output.statusCode;
        body={...err.output.payload};
        if(err.data){
          body.errorDatails=err.data;
        }
      }
      ctx.status=status;
      ctx.body=body;
    }
  });

  router.all('*', async ctx => {
      throw Boom.notFound('没有该路由');
  });

  app.use(KoaBodyParser());
  app.use(router.routes());


  app.listen(configs.server.port, configs.server.host, () => {
    console.log(`服务启动成功：http://${configs.server.host}:${configs.server.port}`);

  });

})()











