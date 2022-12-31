const Router = require('@koa/router')
const router = new Router();
const Schedule = require("../os/schedule/Schedule")
const schedule = new Schedule()
router.prefix('/result')

router.get('/priority/:num', (ctx,next) => {
    let num = ctx.params.num;
    let wq = schedule.initPcbQueue(num);
    let res = schedule.prioritySchedule(wq);
    ctx.body = {
        ok: '1',
        message: '成功',
        res
    }
})

router.get('/roundrobin/:num', (ctx,next) => {
    let num = ctx.params.num;
    let wq = schedule.initPcbQueue(num);
    let res = schedule.roundRobin(wq);
    ctx.body = {
        ok: '1',
        message: '成功',
        res
    }
})

module.exports = router;