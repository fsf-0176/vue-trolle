import { Ctx, Controller, Post, Get, Params, Query, Body, Delete, Put } from "koa-ts-controllers";
import { Context } from "koa";
import { IsNotEmpty, IsNumber, IsNumberString, MaxLength, Min, ValidateIf } from "class-validator";
class PostAddListBody {
    @Min(1, { message: 'boardListId不能为空且必须是大于1的数字' })
    boardListId: number

    @IsNotEmpty({ message: '列表名称不能为空' })
    @MaxLength(255, { message: '卡片名称不能大于255个字符' })
    name: string

    @ValidateIf(o => o.description !== undefined)
    @MaxLength(2000, {
        message: '卡片描述不能大于2000个字符'
    })
    description?: string;
}
class GetListsQuery {
    @IsNumberString({}, {
        message: '面板id不能为空且必须为数字'
    })
    boardId: number
}
class PutUpdateListBody {
    @ValidateIf(o => o.boardId !== undefined)
    @Min(1, {
        message: "面板id不能为空且必须是数字"
    })
    boardId: number

    @ValidateIf(o => o.name !== undefined)
    @IsNotEmpty({ message: '列表名称不能为空' })
    name: string

    @ValidateIf(o => o.order !== undefined)
    @IsNumber({}, { message: '列表名称不能为空' })
    order: number

}
@Controller('/list')
export class BoardListController {
    /**
     * 创建列表
     */
    @Post('')
    public async addList(
        @Ctx() ctx: Context,
        @Body() body: PostAddListBody
    ) {
        let { boardListId, name } = body

        // 获取和验证用户的id
        // await  getAndValidateBoard(boardId,ctx.userInfo.id)

        // 插入数据库逻辑
        // let boardList = new BoardListModel()

        ctx.status = 201;
        return [{ boardId: boardListId, name }]
    }

    /**
     * 获取当前用户指定的看板下的所有列表集合
     */
    @Get('')
    public async getLists(
        @Ctx() ctx: Context,
        @Query() query: GetListsQuery
    ) {
        let { boardId } = query

        // 验证前端发送过来的id
        //  await  getAndVaildateBoard()s

        // 数据库中查找列表
        // let boardList = await ......
        return [
            { data: 'getlists', boardId: 1, name: "list1",order:123,id:1 },
            { data: 'getlists', boardId: 1, name: "list2",order:124,id:2 }
        ]
    }

    /**
     * 获取指定的列表详情
     */
    @Get('/:id(\\d+)')
    public async getList(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        // 验证用户id， 查找语句 通过 id
        // let boardList = await  ...await....

        return { data: 'getlist' }
    }


    /**
     * 更新指定的列表
     */
    @Put('/:id(\\d+)')
    public async updateList(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateListBody
    ) {
        let { boardId, name, order } = body
        // 验证用户Id 是否存在
        // let boardList = await  ...await....

        // 更新列表语句
        console.log('success');
        
        // ctx.status = 204;
        return  { data: 'getlists', boardId: 1, name: "list1",order:123,id:1 }
        

    }

    /**
     *  删除列表
     * @param ctx
     * @param id  列表id
     */
    @Delete('/:id(\\d+)')
    public async deleteList(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        // 验证用户Id 是否存在
        // let boardList = await  ...await....


        // 删除语句
        ctx.status = 204
        return
    }
}