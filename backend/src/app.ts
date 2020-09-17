import configs from './config'
import Koa from "koa"



const app  = new Koa()

const port = configs.server.port,host = configs.server.host
app.listen(port,host,()=>{
    console.log(`服务启动成功：${host}:${port}`);
    
})