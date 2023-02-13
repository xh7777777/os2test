class memoryManage{
    constructor(){
        this.space = []          //虚存数组 
        this.pageSize            //页大小
        this.volume              //虚存容量
        this.stack               //用于LRU算法
    }
    resetSpace(){
        this.space = [];
    }
    setPageSize(pageSize)
    {
        this.pageSize = pageSize;
        this.volume = Math.floor(32/this.pageSize);
    }
    displace(process,algo){
        let {address} = process;
        let res = [];
        this.stack = [];
        for(let block=this.pageSize*4;block<=32;block+=2){
            this.resetSpace();
            let target = 0;                                           //命中次数
            //程序执行
            for(let i=0;i<address.length;i++){
                let isTarget = false;
                this.space.forEach((val,index)=>{
                    if(val === address[i].pageNo)                //命中
                    {
                        target++;
                        isTarget = true;
                    }
                })  
                if(!isTarget)                                   //未命中
                {
                    if(this.space.length < Math.floor(block/this.pageSize))              //未满
                    {
                        this.space.push(address[i].pageNo);         //直接装入页框
                        let idx = this.stack.indexOf(address[i].pageNo);
                        if(idx !== -1){
                            let temp = this.stack[idx];
                            this.stack.splice(idx,1);
                            this.stack.push(temp);
                        }else{
                            this.stack.push(address[i].pageNo)
                        }
                    }else{                                         //满了需要置换
                        algo(this.space,this.stack,address[i].pageNo);
                    }
                }
            }
            res.push({
                block,
                target,
                targetRate:target/256,
            })
        }
        return res;
    }
    fifo(data,stk,pageNo){
        data.shift()
    }
    lru(data,stk,pageNo){
        let bottom = stk[0];
        let idx = data.indexOf(bottom);
        data.splice(idx,1);
        data.push(pageNo);
        stk.shift();
        stk.push(pageNo);
    }
}

module.exports = memoryManage;