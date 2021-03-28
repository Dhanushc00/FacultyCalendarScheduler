import { api} from "../api";
import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import Moment from 'moment';
import {Iperiod,IperiodInput,IperiodPK,IPksingle} from './periods';

const GET_PK='GET_PK';

const UPD_PERIODS='UPD_PERIODS';
export const CLR_PERIODS='CLR_PERIODS';


// interface getPeriods{
//     type: typeof GET_PERIODS
// }
interface updPeriodsAction{
    type: typeof UPD_PERIODS,
    payload : Iperiod[],
}
interface clrPeriodsAction{
    type: typeof CLR_PERIODS,
}
interface getPkAction{
    type: typeof GET_PK,
    payload: IperiodPK
}

export type PeriodsActionTypes= updPeriodsAction|getPkAction|clrPeriodsAction;


export const AddPeriods = (
    periodOpts: IperiodInput,
    username:string,
    sem:string,
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
    periodOpts.startTime=Moment(periodOpts.startTime).day(periodOpts.day).toISOString();
    periodOpts.endTime=Moment(periodOpts.endTime).day(periodOpts.day).toISOString();
    console.log(periodOpts,sem,username);
    api.post('/CPeriods',{
        ...periodOpts,semesterSemId:sem,userUsername:username
    }).then((res: Iperiod[]|any)=>{
        dispatch({type:UPD_PERIODS, payload: res.data})
        toast({
            title: `Period ${periodOpts.courseCode} create success`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
    }).catch(()=>{
        toast({
            title: `Period ${periodOpts.courseCode} create failure`,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
    }).finally(()=>console.log("api/CPeriods post request made"))
  }
  
export const getPeriods= (
    sem:string,
    username:string,
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
        api.get('/CPeriods',{
            params:{
                SemId:sem,
                FId:username
            }
        }).then((res: Iperiod[]|any)=>{
            console.log(res.data)
            dispatch({type:UPD_PERIODS, payload: res.data})
        }).catch(()=>{
            toast({
                title: `Period fetch failure`,
                status: "error",
                duration: 4000,
                isClosable: true,
              });
        }).finally(()=>console.log("api/CPeriods get request made"))
  }
export const getPk= (
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
    api.get('/CPeriods/details').then((res:IperiodPK|any)=>{
        dispatch({type:GET_PK,payload:res.data});
    }).catch(()=>{
        toast({
            title: `Period fetch failure`,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
    }).finally(()=>console.log("api/CPeriods/details get request made"))
  }

export const deletePeriod= (
    periodId:string,
    semesterSemId:string,
    userUsername:string,
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
      api.delete('/CPeriods',{
          params:{
              periodId,
              semesterSemId,
              userUsername
          }
      }).then((res: Iperiod[]|any)=>{
        console.log(res.data)
        dispatch({type:UPD_PERIODS, payload: res.data})
    }).catch(()=>{
        toast({
            title: `Period delete failure`,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
    }).finally(()=>console.log("api/CPeriods delete request made"))
  } 

interface Iinit{
    periods: Iperiod[],
    pk: IperiodPK
}

const initialState:Iinit={
    periods: [],
    pk: {
        username:[],
        sem:[]
    }
};

export const PeriodsReducer = (
    state = initialState,
    action: PeriodsActionTypes
  ): Iinit => {
    switch (action.type) {
      case UPD_PERIODS:
        return {...state,periods:action.payload}
      case GET_PK:
          return {...state,pk:action.payload}
    case CLR_PERIODS:
        return {...state,periods:[]}
      default:
        return state;
    }
  };
export default PeriodsReducer;