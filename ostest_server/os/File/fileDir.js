const FCB = require('./FCB')
class fileDir {
    constructor() {
        this.fileList = []   // type :FCB[]
    }
    create(name='***' , protect = '000') {
        const newFile = new FCB(name,protect)
        this.fileList.push(newFile)
    }
    delete(filename) {
        let index = 0;
        if(this.fileList.some(item => {
            index++;
            return item.filename === filename
        })) {
            this.fileList.splice(index-1, 1)
        } else return 
    }
}
class OpenDir extends fileDir {
    constructor() {
        super();
    }
    create(name='***' , protect = '000', user) {
        const newFile = new FCB(name,protect)
        newFile.user = user
        this.fileList.push(newFile)
    }
}

class UserFileDir extends fileDir{
    constructor(name) {
        super()
        this.filename = name
    }
    open(filename) {
        let res;
        for(let i=0 ; i< this.fileList.length; i++) {
            if(this.fileList[i].filename === filename)
            {
                res = this.fileList[i];
                break;
            }
        }
        return res
    }
    isDup(filename){  //是否有重名文件
        for(let i=0 ; i< this.fileList.length; i++) {
            if(this.fileList[i].filename === filename)
                return true
        }
        return false
    }
}
class MainFileDir{
    constructor() {
        this.userList = []       // interface {filename:string , userDir: UserFileDir}
        for(let i = 0 ; i< 10;i++) {
            let name = 'user'+i;
            let dir = new UserFileDir(name)
            this.userList.push(dir)
        }
    }
    getList() {
        return this.userList.map(item => item.filename)
    }
    enterList(filename) {
        let res
        this.userList.some((item) => {
            if(item.filename === filename)
            {
                res = item
                return true
            }
            return false
        })
        return res
    }
}


module.exports = {
    MainFileDir,
    UserFileDir,
    OpenDir
}
