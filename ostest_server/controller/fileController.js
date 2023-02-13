const {MainFileDir, UserFileDir, OpenDir} = require('../os/File/fileDir')
const main = new MainFileDir()
const opens = new OpenDir()
let currentUserDir;
class fileController{
    static getUserFiles(ctx,next) {
        const {name} = ctx.query
        currentUserDir = main.enterList(name)
        ctx.body = {
            ok:1,
            data: currentUserDir.fileList
        }
    }
    static getMainFiles(ctx,next) {
        ctx.body = {
            ok: 1,
            data: main.getList()
        }
    }
    static getOpenFiles(ctx, next) {
       ctx.body = {
        ok:1,
        data:opens.fileList
       }
    }
    static createFile(ctx,next) {
        const {filename, protect} = ctx.request.body
        if(currentUserDir.fileList.length>=10) {
            ctx.body ={
                ok:0,
                msg:'文件已经满了'
            }
            return
        }
        if(currentUserDir.isDup(filename)) {
            ctx.body ={
                ok:0,
                msg:'文件重名'
            }
            return
        }
        let check = true
        protect.split('').forEach(item => {
            if(+item === 0 || +item=== 1) {
                return 
            }
            check = false
        }) 
        if(check) {
            currentUserDir.create(filename,protect)
            ctx.body = {
                ok:1,
                data:currentUserDir.fileList
            }
        }else {
            ctx.body ={
                ok:0,
                msg:'权限应为0或1组成的三位数'
            }
        }
     }
    static deleteFile(ctx,next) {
        const name = ctx.params.name
        for(let i=0 ;i< opens.fileList.length; i++) {
            if(opens.fileList[i].filename === name) {
                ctx.body = {
                    ok:0,
                    msg: '文件已经打开，不能删除'
                }
                return 
            }
        }
        currentUserDir.delete(name)
        ctx.body = {
            ok:1,
            data: currentUserDir.fileList
        }
    }
    static openFile(ctx,next) {
        const {filename, protect, user} = ctx.request.body
        if(+protect.charAt(2) === 0) {
            ctx.body = {
                ok: 0,
                msg:'文件不允许打开'
            }
            return 
        }
        const theFile = currentUserDir.open(filename)
        opens.create(theFile.filename,theFile.protect,user)
        ctx.body = {
            ok:1,
            data: opens.fileList
        }
    }
    static closeFile(ctx,next) {
        const {name,user} = ctx.query
        console.log(name,user)
        for(let i=0 ;i< opens.fileList.length; i++) {
            if(opens.fileList[i].filename === name && opens.fileList[i].user === user) {
                opens.delete(name)
                ctx.body = {
                    ok:1,
                    data: opens.fileList
                }
                return 
            }
        }
        ctx.body = {
            ok:0,
            msg: '没有权限关闭文件'
        }
      
    }
    static writeFile(ctx,next) {
        const {filename, protect, user} = ctx.request.body
        if(+protect.charAt(0) === 0) {
            ctx.body = {
                ok: 0,
                msg:'文件不允许写'
            }
            return 
        }
        ctx.body = {
            ok:1,
        }
    }
    static readFile(ctx,next) {
        const {filename, protect, user} = ctx.request.body
        if(+protect.charAt(1) === 0) {
            ctx.body = {
                ok: 0,
                msg:'文件不允许读'
            }
            return 
        }
        ctx.body = {
            ok:1,
        }
    }
}

module.exports = fileController