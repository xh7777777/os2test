const Router = require('@koa/router')
const router = new Router();
const fileController = require('../controller/fileController')
router.prefix('/file')
router.get("/main", fileController.getMainFiles )
router.get("/open", fileController.getOpenFiles )
router.get("/user", fileController.getUserFiles )
router.post("/create", fileController.createFile )
router.delete("/delete/:name", fileController.deleteFile )
router.post("/openfile", fileController.openFile )
router.delete("/close", fileController.closeFile )
router.post("/read", fileController.readFile )
router.post("/write", fileController.writeFile )



module.exports = router;