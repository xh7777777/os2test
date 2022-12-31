const Koa = require("koa")
const schedule = require("./router/schedule")
const Cor = require("koa2-cors")
const bodyParser = require("koa-bodyparser")

const app = new Koa()

app.use(bodyParser())
app.use(Cor())

app.use(schedule.routes())
schedule.allowedMethods()


app.listen(3000)