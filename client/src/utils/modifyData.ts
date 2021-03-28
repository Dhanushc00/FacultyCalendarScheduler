import {Ievent,Ieventsend} from '../store/Events/events'
import {Ileave,Ileavesend} from '../store/applyLeave/leave';
export const ModifyData=(dt:Ievent):Ieventsend=>{
    let obj:any={};
    obj.EventId=dt.EventId;
    obj.startTime=dt.startTime;
    obj.endTime=dt.endTime;
    obj.EventName=dt.EventName;
    obj.Description=dt.Description;
    obj.Participants=dt.users.map(q=>{
        return q.username
    })
    obj.type=dt.type;
    obj.Location=dt.Location;
    return obj;
}
export const ModifyLeave=(dt:Ileave)=>{
        let obj:any={};
        return;
}