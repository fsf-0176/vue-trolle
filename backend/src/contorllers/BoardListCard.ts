import { Ctx, Post, Get, Query, Params, Controller, Body, Put, Delete } from "koa-ts-controllers";
import { Context } from "koa";
import { IsNotEmpty, isNumberString, IsNumberString, MaxLength, Min, min, ValidateIf } from "class-validator";
import path from "path";
class GetCardsQuery {
    @IsNumberString({}, { message: "boardListId不能为空且必须是数字" })
    boardListId: number;
}
class PutSetCoverBody {
    @Min(1,{message:'附件id必须是数字且大于零'})
    attachmentId:number
}
class PostAddCardBody {
    @Min(1,{ message:'boardListId不能为空且必须大于1的数字' })
    boardListId:number;

    @IsNotEmpty({message:'名称不能为空'})
    @MaxLength(255,{message:'描述长度不能大于255字符'})
    name:string;

    @ValidateIf(o=>o.description !== undefined)
    @MaxLength(2000,{message:'描述长度不能大于2000字符'})
    description:string;

}
class PutUpadteCardBody {
    @ValidateIf(o=>o.boardListId !== undefined)
    @Min(1,{ message:'boardListId不能为空且必须大于1的数字' })
    boardListId?:number;

    @ValidateIf(o=>o.name !== undefined)
    @MaxLength(255,{message:'描述长度不能大于255字符'})
    name?:string;

    @ValidateIf(o=>o.description !== undefined)
    @MaxLength(2000,{message:'描述长度不能大于2000字符'})
    description?:string;

    @ValidateIf(o=>o.order !== undefined)
    @IsNumberString({},{message:'描述长度不能大于2000字符'})
    order?:number;

}
@Controller('/card')
export class BoardListCardController {

    /**
     * 创建卡片
     */
    @Post('')
    public async addCard(
        @Ctx() ctx: Context,
        @Body() body: PostAddCardBody
    ) {
        let {boardListId,name,description} = body;

        // await  校验用户

        // let boardListCard = insert  添加语句

        ctx.status = 201

        return [{boardListId,name,description}]
    }

    /**
     * 获取卡片列表
     */
    @Get('')
    public async getCards(
        @Ctx() ctx: Context,
        @Query() query: GetCardsQuery
    ) {
        let {boardListId} = query

        // await 校验用户
        // let boardListCards =   查询语句   查询卡片的评论，封面，附件
        return [
            {name:'哈哈哈0-'+boardListId,order:3333,boardListId,id:1,commentCount:12,attachments:[{id:1,path:'/public/attachments/logo.png'},{id:2,path:'/public/attachments/logo.png'}],description:'测试数据'},
            {name:'哈哈哈1-'+boardListId,order:3334,boardListId,id:2,commentCount:1,attachments:[{id:1,path:'/public/attachments/logo.png'}]},
            {name:'哈哈哈2-'+boardListId,order:3335,boardListId,id:3,commentCount:0,attachments:[],description:'哈哈哈哈'}
        ]
    }

    /**
     * 获取一个卡片
     */
    @Get('/:id(\\d+)')
    public async getCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        // let boardListCard = await 校验用户信息 和获取

        return {name:'哈哈哈2',order:3335,boardListId:1,id:3}
         
    }

    /**
     * 更新一个卡片
     */
    @Put('/:id(\\d+)')
    public async putCard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body:PutUpadteCardBody
    ) {
        let {boardListId,name,description,order} = body
        // 1. let boardListCard = await 校验用户

        // 2. 执行update更新数据库
        ctx.status = 204
        return;
    }

    /**
     * 删除一个卡片
     */
    @Delete('/:id(\\d+)')
    public async deleteCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        //1. let boardListCard = await 校验用户
        //2. 执行删除数据库语句
        ctx.status = 204
        return;
    }   

    /**
     * 上传附件
     */
    @Post('/attachment')
    public async addAttachment(
        @Ctx() ctx:Context,
        @Body() body:any
    ){
        let {boardListCardId} = body

        // let card = await ..... 验证卡片是否存在
        if(!ctx.request.files || !ctx.request.files.attachment){
            throw new Error("");
        }
        let url = ctx.request.files.attachment.path.split(path.sep).pop()
        return {path: '/public/attachments/'+url,boardListCardId}
        // console.log(ctx.request.files.attachment.path.split(path.sep).pop());
        
    }
    
    /**
     * 删除附件
     */
    @Delete('attachment/:id(\\d+)')
    public async deleteAttachment(
        @Ctx() ctx:Context,
        @Params('id') id:number
    ){
        // 验证，删除附件逻辑

        ctx.status = 204;
        return ;
    }

    /**
     * 设置封面
     */
    @Put('/attachment/cover/:id(\\d+)')
    public async setCover(
        @Ctx() ctx:Context,
        @Params('id') id: number
    ){
  

        // 验证， 修改逻辑

        ctx.status = 204;
        return ;

    }

    /**
     * 取消封面
     */
    @Delete('/attachment/cover/:id(\\d+)')
    public async DeleteCover(
        @Ctx() ctx:Context,
        @Params('id') id:number
    ){
        // 验证，删除封面逻辑
        ctx.status = 204;
        return ;  
    }

}
