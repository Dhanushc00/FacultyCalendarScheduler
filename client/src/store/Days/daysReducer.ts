import { api} from "../api";
import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {Iday} from './days'

/*----Action Type------------------*/
export const GET_DAY='GET_DAY';
export const UPDATE_DAY='UPDATE_DAY';
export const CREATE_DAY='CREATE_DAY';
export const DELETE_DAY='DELETE_DAY';
/*---------------------------*/
interface getDAYAction{
    type: typeof GET_DAY
}
interface updDayAction{
    type: typeof UPDATE_DAY,
    payload: Iday[],
}
interface createDayAction{
    type: typeof CREATE_DAY
}
interface delDayAction{
    type: typeof DELETE_DAY
}

export type DayActionTypes=getDAYAction|createDayAction|updDayAction|delDayAction;

export const toDate=(val:string):string=>{
    var today = new Date(val);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let d = String(yyyy+"-"+mm+"-"+dd );
    return d
}

export const AddDay = (
    DayOpts: Iday,
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
    DayOpts.date=await toDate(DayOpts.date);
    console.log(DayOpts);
    api.post('/ACal',{
        ...DayOpts
    }).then((res: Iday[]|any)=>{
        dispatch({type:UPDATE_DAY, payload: res.data})
        toast({
            title: `Day ${DayOpts.date} type create success`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
    }).catch(()=>{
        toast({
            title: `Day ${DayOpts.date} type create failure`,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
    }).finally(()=>console.log("api/ACal post request made"))
  }
  

  export const getDay = (
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
        api.get('/ACal').then((res:Iday[]|any)=>{
                dispatch({type: UPDATE_DAY, payload: res.data})
        }).catch((err:any)=>{
            toast({
                title: `Day get data failure`,
                description: `${err.response}`,
                status: "error",
                duration: 4000,
                isClosable: true,
              });
        }).finally(()=>console.log('/api/ACal get request made'))
  }


  export const delDay = (
    date: string,
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
        date=toDate(date)
        api.delete('/Acal',{
            params:{
                date:date
            }
        }).then((res:Iday[]|any)=>{
            dispatch({type: UPDATE_DAY, payload: res.data})
            toast({
                title: `Date ${date} type delete success`,
                status: "success",
                duration: 4000,
                isClosable: true,
              });
        }).catch((err:any)=>{
            toast({
                title: `Date ${date} type delete failure`,
                description: `${err.response}`,
                status: "error",
                duration: 4000,
                isClosable: true,
              });
        }).finally(()=>console.log('/api/ACal delete api called'))
  }
const initialState:Iday[]=[];
///^DAY_[1-9]_[1-2][0-9][0-9][0-9]$/.test('S_9_2011');
export const DAYReducer = (
    state = initialState,
    action: DayActionTypes
  ): Iday[] => {
    switch (action.type) {
      case UPDATE_DAY:
        return {...action.payload}
      default:
        return state;
    }
  };
  
  export default DAYReducer;
  