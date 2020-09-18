import configs from './config'
import Koa,{ Context } from "koa"
import Router from 'koa-router'
import path from "path";
import KoaBodyParser from "koa-bodyparser";
import { bootstrapControllers } from "koa-ts-controllers"



const app = new Koa()
const router = new Router();

(async () => {
    await bootstrapControllers(app, {
        router,
        basePath: '/api',
        versions: [1],
        controllers: [
            path.resolve(__dirname,'contorllers/**/*')
        ],
        // 统一错误处理
        errorHandler: async (err:any, ctx:Context)=>{
            let status = 500
            let body:any = {
                statusCode:status,
                error:"Internal Server error",
                message:'An internal Server error occurred'
            }
            if (err.output){
                status = err.output.statusCode;
                body = {...err.output.payload}
                if(err.data){
                    body['errorDetails'] = err.data
                }
            }
            ctx.status = status;
            ctx.body = body
        }
    })
    app.use(KoaBodyParser())
    app.use(router.routes())

    const port = configs.server.port, host = configs.server.host
    app.listen(port, host, () => {
        console.log(`服务启动成功：${host}:${port}`);

    })
})()