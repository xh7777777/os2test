let LinkList = require("./LinkList")
function Pcb({pid,priority,timeSlice}){
    this.pid = pid;                       // 进程ID
    this.priority = priority;             //优先级
    this.cpuTime = 0;                     //占用CPU总时间
    this.timeSlice = timeSlice;           //时间片数，根据优先级生成
    this.state = 'W';                      //进程状态
    this.next = null;                     // 链上的下一个进程
    this.pre = null;                     // 链上的前一个进程
    this.ldt = undefined;                     //段表指针
    this.pageTable = undefined;               //页表指针
}

module.exports = Pcb;