import {
    Body,
    Controller,
    Get,
    Header,
    Params,
    Post,
    Query
} from "koa-ts-controllers";
import { IsNumberString,IsNotEmpty } from 'class-validator'
class GetUsersQuery {
    @IsNumberString()
    page: number;
}
class PostUserBody{
    @IsNotEmpty({message:"用户名不能为空"})
    name:string
    @IsNotEmpty({message:"密码不能为空"})
    password:string
}
@Controller('/test')
class TestController {
    @Get('/hello')
    async hello(a: any) {
        console.log(a.b);

        return 'Hello Test!'
    }

    @Get('/register')
    async postUser(
        @Body() body:PostUserBody,
    ){

        
        return `当前提交的数据是${JSON.stringify(body)}`
    }

    /**
     * 
     *  通过params获取， ..../id/1
     *  (\\d+)  正则验证url的数据格式
     */
    // @Get('/user/:id(\\d+)')
    // async getUser(
    //     @Params('id') id:number
    // ){
    //     return `当前用户id是${id}` 
    // }


    /**
     * 
     *  通过query获取   ...?id=1
     * 
     */

    // @Get('/user')
    // async getUser(
    //     @Query() p:{id:number}
    // ){
    //     return `当前用户id是${p.id}` 
    // }


    // @Get('/users')
    // async getUsers(
    //     @Query() p: GetUsersQuery
    // ) {
    //     console.log(p);
  
    //     return `传过来的query：${p.page}`

    // }
}