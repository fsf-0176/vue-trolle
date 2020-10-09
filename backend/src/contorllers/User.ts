import { Controller, Get, Post,Ctx } from "koa-ts-controllers";
import { Context } from "vm";


@Controller('/user')
class UserController {
    @Post('/register')
    async register(){
        return '注册成功'
    }
    @Get('/login')
    async login(
        @Ctx() ctx:Context
    ){
        ctx.set('authorization','12345679')
        return {'msg':'登录成功','name':'hei','id':'1'}
    }

}
