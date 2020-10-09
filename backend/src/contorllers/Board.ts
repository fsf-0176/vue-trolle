import { Controller, Ctx, Post, Get, Put, Delete, Flow, Params, Query, Body } from "koa-ts-controllers";
import { Context } from "koa";
import Boom from "@hapi/Boom";
import { IsEmpty, IsNotEmpty, MaxLength, ValidateIf } from "class-validator";
let testData = [
    {createAt:"2020-09-27 08:48:08",id:1,name:"eos0 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
    {createAt:"2020-09-27 08:48:08",id:2,name:"eos1 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
    {createAt:"2020-09-27 08:48:08",id:3,name:"eos2 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
    {createAt:"2020-09-27 08:48:08",id:4,name:"eos3 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
    {createAt:"2020-09-27 08:48:08",id:5,name:"eos4 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
]
class PostAddBoardBody {
    @IsNotEmpty({
        message: "面板名称不能为空"
    })
    @MaxLength(255, {
        message: "面板名称不能大于255个字符"
    })
    name: string;
}
class PutUpdateBoardBody {
    @ValidateIf(o => o.name !== undefined)
    @MaxLength(255, {
        message: '面板名称不能大于255个字符'
    })
    name?: string
}
class BoardModel{

}

@Controller('/board')
export class BoardController {
    /**
     * 创建面板
     */
    @Post('')
    public async addBoard(
        @Ctx() ctx: Context,
        @Body() body: PostAddBoardBody
    ) {
        console.log(body);
        
        let { name } = body
        // let board = new BoardModel()
        // board.name = name
        // board.userId = ctx.userInfo.id
        // await board.save()
        ctx.status = 201

       
        // return board
        return 123
    }

    /**
     * 获取当前登录用户的所有面板
     */
    @Get('')
    public async getBoards(
        @Ctx() ctx: Context
    ) {
        // let where = {
        //     userId:ctx.userInfo.id
        // };
        // let boards = await BoardModel.findAll({where})
        // return boards;
        let testReturnArr = [
            {createAt:"2020-09-27 08:48:08",id:1,name:"eos0 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
            {createAt:"2020-09-27 08:48:08",id:2,name:"eos1 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
            {createAt:"2020-09-27 08:48:08",id:3,name:"eos2 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
            {createAt:"2020-09-27 08:48:08",id:4,name:"eos3 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
            {createAt:"2020-09-27 08:48:08",id:5,name:"eos4 voluptatem rerum",updateAt:"2020-09-27 08:48:08",userId:1},
        ]
        return testReturnArr
    }

    /**
     * 获取当前用户指定的一个看板详情
     */
    @Get('/:id(\\d+)')
    public async getBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {

        // 从数据库中查询
        // let board = await getBoard(id,ctx.userInfo.id)

        // 测试数据  查询出数据返回
        let board = testData.filter(board=>board.id==id)[0]
        
        return board
    }

    /**
     * 更新指定的看板
     */
    @Put('/:id(\\d+)')
    public async updateBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateBoardBody
    ) {
        let board = await getBoard(id,ctx.userInfo.id)
        // board.name = body.name || board.name;
        // await board.save()
        ctx.status = 204
    }

    /**
     * 删除指定的面板
     */
    @Delete('/:id(\\d+)')
    public async deleteBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        let board = await getBoard(id,ctx.userInfo.id)
        // await board.destroy();

        ctx.status = 204
    }
}

async function getBoard(id:number,userId:number):Promise<BoardModel> {
    var board
    //    let board = await BoardModel.findByPk(id)
    if (!board) {
        throw Boom.notFound('指定看板不存在');
    }
    // if(board.userId !== ctx.userInfo.id){
    if(board !== userId){
        throw Boom.notFound('禁止访问该面板');
    }

    return board
}