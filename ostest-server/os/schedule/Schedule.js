let Pcb = require("./Pcb")
let LinkList = require("./LinkList")
class Schedule {
    initPcbQueue(num){
        let waitQueue = new LinkList();
        let createNum = (left,right)=>{
            return Math.floor(Math.random()*right+left);
        }
        for(let i = 0;i<num;i++){
            waitQueue.insert_priority(new Pcb({
                pid:i+1,
                priority:createNum(1,50),
                timeSlice:createNum(1,20),
            }))
        }
        return waitQueue;
    }
    prioritySchedule(list){
        let res = [];
        while(!list.isEmpty()){
            let temp = list.getHead();
            if(temp === null){
                break;
            }
            temp.state="R";
            temp.priority -= 3;
            temp.cpuTime += 1;
            if(temp.priority<0)temp.priority=0;
            temp.timeSlice -= 1;
            let formObj = {
                id:list.getData('pid'),
                priority:list.getData('priority'),
                cpuTime:list.getData('cpuTime'),
                allTime:list.getData('timeSlice'),
                state:list.getData('state'),
                next:list.getData('pid'),
            }
            list.shift();
            res.push(formObj);
            if(temp.timeSlice <= 0){
                temp.state = 'block';
            }else{
                temp.state ="W";
                list.insert_priority(temp);
            }
        }
        return res;
    }
    roundRobin(list){
        let res = [];
        while(!list.isEmpty()){
            let temp = list.getHead();
            if(temp === null){
                break;
            }
            temp.state="R";
            temp.cpuTime += 1;
            if(temp.priority<0)temp.priority=0;
            temp.timeSlice -= 1;
            let formObj = {
                id:list.getData('pid'),
                priority:list.getData('priority'),
                cpuTime:list.getData('cpuTime'),
                allTime:list.getData('timeSlice'),
                state:list.getData('state'),
                next:list.getData('pid'),
            }
            list.shift();
            res.push(formObj);
            if(temp.timeSlice <= 0){
                temp.state = 'block';
            }else{
                temp.state ="w";
                list.append(temp);
            }
        }
        return res;
    }
}

module.exports = Schedule;