import { Body, Controller, Ctx, Get, IsNumber, IsNumberString, MaxLength, Post, Query, ValidateIf } from "koa-ts-controllers";
import { Context } from "koa";

class PostAddCommentBody {
    @IsNumber({},{message:'boardListCardId必须为数字'})
    boardListCardId:number

    @MaxLength(2000,{
        message:"内容不能大于2000个字符"
    })
    content:string
}
class GetCommentsQuery {
    @IsNumberString({},{message:'boardListCardId必须为数字'})
    boardListCardId:number

    @ValidateIf(o=>o.page !== undefined)
    @IsNumberString({},{message:"分页必须是数字"})
    page?:number
}
@Controller('/comment')
export class CommentController {
    /**
     * 添加评论
     */
    @Post('')
    public async addComment(
        @Ctx() ctx:Context,
        @Body() body:PostAddCommentBody
    ) {
        let { boardListCardId,content } = body


        // 添加评论逻辑， userid,  boardListCardId 作为区分
        ctx.status = 201
        return {name:"?????"}
    }

    /**
     * 获取评论
     */
    @Get('')
    public async getComments(
        @Ctx() ctx:Context,
        @Query() query:GetCommentsQuery
    ){
        let {boardListCardId,page} = query

        // 验证 

        // 查询评论总数
        let commentCount = 100
        // 查询评论的具体信息

        // 每页的条数
        let limit = 10;
        let pages = Math.ceil(commentCount/limit);
        page = Number(page);
        if(!page){
            page = 1
        }
        page = Math.min(page,pages);
        page = Math.max(page,1)
        return {
            limit,
            page,
            pages,
            count:100,
            rows:[
                {id:1,userId:1,content:'测试',createdAt:"23点19分",upDateAt:"23点19分",user:{id:'1',name:"heihei"}},
                {id:2,userId:1,content:'测试1',createdAt:"23点19分",upDateAt:"23点19分",user:{id:'1',name:"heihei"}},
                {id:3,userId:1,content:'测试2',createdAt:"23点19分",upDateAt:"23点19分",user:{id:'1',name:"heihei"}},
                // {id:4,userId:1,content:'测试3',createdAt:"23点19分",upDateAt:"23点19分",user:{id:'1',name:"heihei"}},
                // {id:5,userId:1,content:'测试4',createdAt:"23点19分",upDateAt:"23点19分",user:{id:'1',name:"heihei"}}
            ]
        }
    }
}
