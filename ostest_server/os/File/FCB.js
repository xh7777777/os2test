class FCB {
    constructor(filename = '***',protect = '000') {
        this.filename = filename,
        this.protect = protect,
        this.size = 1024,
        this.cnt = 0;      //使用计数  
    }
}

module.exports = FCB