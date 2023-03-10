const Koa = require("koa")
const schedule = require("./router/schedule")
const memory = require("./router/memory")
const file = require('./router/file')
const Cor = require("koa2-cors")
const bodyParser = require("koa-bodyparser")

const app = new Koa()
//配置库
app.use(bodyParser())
app.use(Cor())
//进程调度路由
app.use(schedule.routes())
schedule.allowedMethods()
//内存管理路由
app.use(memory.routes())
memory.allowedMethods()
//文件管理路由
app.use(file.routes())
file.allowedMethods()

app.listen(3000)