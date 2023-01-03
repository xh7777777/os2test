class LinkList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    insert_priority(val){    //根据优先级插入
        if(this.head === null){
            this.head = val;
            this.tail = val;
        }else if(this.head.priority < val.priority){
            val.next = this.head;
            this.head = val;
        }else{
            let p = this.head;
            while(p.next !== null && p.next.priority > val.priority){
                p=p.next;
            }
            val.next = p.next;
            if(p.next === null)this.tail = val;
            p.next = val;
        }
        this.length++;
    }
    getData(str)    //获取对应名字的所有属性的数据  返回一个数组
    {
        let res = [];
        let p = this.head;
        while(p){
            if(Object.prototype.hasOwnProperty.call(p,str))
            {
                res.push(p[str]);
                p=p.next;
            }
            else{
                res.push(p.id);
                p=p.next;
            }
        }
        return res;
    }
    shift(){        //链首出队
        if(this.head === null)
            return;
        else if(this.head === this.tail){
            this.head = null;
            this.tail = null;
        }else{
            this.head = this.head.next;
        }
        this.length--;
    }
    push(item){      //链尾添加元素
        let node = item;
        if(this.head === null){
            this.head = node;
            this.tail = node;
        }else{
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }   
    append(val){        //在链尾部添加节点
        if(this.head === null){
            this.head = val;
            this.tail = val;
        }else{
            let p = this.head;
            while(p.next !== null){
                p=p.next;
            }
            val.next = p.next;
            p.next = val;
            this.tail = val;
        }
        this.length++;
    }
    getHead(){              //获取头部节点指针
        return this.head;
    }
    getTail(){             //获取链尾指针
        return this.tail;
    }
    size(){           //获取链表长度
        return this.length;
    } 
    isEmpty(){           //判断链表为空？
        return this.length === 0;
    }
    show(){
        let p = this.head;
        while(p){
            console.log(p)
            p=p.next;
        }
    }
}

module.exports = LinkList;