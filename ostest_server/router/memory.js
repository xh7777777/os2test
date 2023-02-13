const Router = require('@koa/router')
const router = new Router();
const Memory = require("../os/Memory/memory")
const MyProcess = require("../os/Memory/myProcess")
const LruCache = require("../os/Memory/lruCache")

router.prefix('/memory')
const myProcess = new MyProcess();
const memory = new Memory();
myProcess.generateOrderSequence();

router.get("/FIFO",(ctx,next) => {
    let page = ctx.query.page;
    if(page && page<=32 && page >= 1){
        memory.setPageSize(page)
        myProcess.processInit(page*1024);
        let res = memory.displace(myProcess,memory.fifo);
        ctx.body = {
            ok:'1',
            res,
        }
    }else{
        ctx.body = {
            ok: '0',
            message: '页面尺寸太大或未传'
        }
    }
})

router.get("/LRU",(ctx,next) => {
    let page = ctx.query.page;
    if(page && page<=32 && page >= 1){
        memory.setPageSize(page)
        myProcess.processInit(page*1024);
        let res = memory.displace(myProcess,memory.lru);
        ctx.body = {
            ok:'1',
            res,
        }
    }else{
        ctx.body = {
            ok: '0',
            message: '页面尺寸太大或未传'
        }
    }
})

router.get("/test",(ctx,next) => {
    let lruCache = new LruCache(30);
    lruCache.append(1,1);
    lruCache.append(2,2);
    lruCache.append(3,3)
    lruCache.append(4,4)
    let res = lruCache.test();
    ctx.body={
        res
    }
})


module.exports = router;