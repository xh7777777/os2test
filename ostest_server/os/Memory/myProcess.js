let Pcb = require("../schedule/Pcb")

class myProcess{
    constructor(){
        this.pcb;
        this.order = [];        //指令序列
        this.address = [];      //逻辑地址
    }
    generateOrderSequence(){           //生成随机指令序列及页表datasg  0 - 4000  codesg  8001 - 32767
        let st = Math.floor(Math.random()*10000+8000);
        function ranSegment(){
            let i = Math.floor(Math.random()*3);
            switch(i){
                case 0:                //loop
                    st = Math.max(4001,st-2000);
                    return st;
                    break;
                case 1:                //call
                    return Math.min(32767,st+10000);
                    break;
                case 2:                //read data
                    return Math.floor(Math.random()*4000);
                    break;
            }
        }
        for(let i = 0;i< 256;i++){
            i % 2 !== 0 ? this.order.push(st++) : this.order.push(ranSegment()); 
        }                          
    }
    processInit(pageSize){                     //初始化pcb，获取地址，页表指针
        if(this.order.length <= 0){
            return new Error('程序为空，无法初始化pcb');
        }else{
            this.pcb = new Pcb(Pcb.prototype.init());
            this.pcb.pageTable = [];              //初始化pcb页表指针
            this.address = [];
            this.order.forEach((val,index) => {    //初始化地址
                let temp  = Math.floor(val/pageSize);
                this.address.push({
                    pageNo: temp,
                    pageOffset: val - temp * pageSize 
                })
            })
        }
    }
}

module.exports = myProcess;