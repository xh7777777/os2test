function LruCache(capacity){
    function Node(key,value){
        this.key = key;
        this.value = value;
        this.pre = null;
        this.next = null;
    }
    this.bottom = null;
    this.top = null;
    this.capacity = capacity
    this.cache = new Map()       //key:页号 value：页在链表中的指针
    this.length = 0;
    
    LruCache.prototype.get = (key) => this.cache.get(key);    

    LruCache.prototype.getHead = () => this.top;

    LruCache.prototype.eliminateLast = () =>{
        this.cache.delete(this.bottom)
        this.length--;
        if(this.bottom.next){
            this.bottom = this.bottom.next;
            this.bottom.pre = null;
        }else if(this.bottom){
            this.bottom = null;
            this.top = null;
        }
    }

    LruCache.prototype.append = (key,value) => {
        let node = new Node(key,value);
            if(this.length === 0){
                this.bottom = node;
                this.top = node;
            }else{
                node.pre = this.top
                this.top.next = node
                this.top = node
            }
            this.length++;
            this.cache.set(key,node)
    }

    LruCache.prototype.query = (key) => {
        let target = this.cache.get(key)
        if(this.top === this.bottom || target === this.top) return target;
        if(target === this.bottom){         //队尾移动到队首
            this.bottom.next.pre = null;
            this.top.next = this.bottom;
            this.bottom.pre = this.top;
            this.bottom = this.bottom.next;
            this.top.next = this.top;
            this.top.next = null;
        }else{                            //队中移动到队首
            target.pre.next = target.next;
            target.next.pre = target.pre;
            target.next = null;
            target.pre = this.top;
            this.top.next = target;
            this.top = target;
        }
        return this.cache.get(key).value;
    }

    LruCache.prototype.test = ()=>{
        let arr = []
        let p = this.bottom;
        while(p !== null){
            console.log(p);
            arr.push(p)
            p = p.next;
        }
        return arr
    }
}
module.exports = LruCache