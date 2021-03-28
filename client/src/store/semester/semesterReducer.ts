import { api} from "../api";
import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {Isem} from './sem';

/*----Action Type------------------*/
export const GET_SEM='GET_SEM';
export const UPDATE_SEM='UPDATE_SEM';
export const CREATE_SEM='CREATE_SEM';
export const DELETE_SEM='DELETE_SEM';
/*---------------------------*/
interface getSemAction{
    type: typeof GET_SEM
}
interface updSemAction{
    type: typeof UPDATE_SEM,
    payload: Isem[],
}
interface createSemAction{
    type: typeof CREATE_SEM
}
interface delSemAction{
    type: typeof DELETE_SEM
}

export type SemesterActionTypes=getSemAction|createSemAction|updSemAction|delSemAction;

const toDate=(val:string):string=>{
    var today = new Date(val);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let d = String(yyyy+"-"+mm+"-"+dd );
    return d
}

export const AddSem = (
    semOpts: Isem,
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
    semOpts.startDate=await toDate(semOpts.startDate);
    semOpts.endDate=await toDate(semOpts.endDate);
    console.log(semOpts);
    api.post('/sem',{
        ...semOpts
    }).then((res: Isem[]|any)=>{
        dispatch({type:UPDATE_SEM, payload: res.data})
        toast({
            title: `Semester ${semOpts.SemId} create success`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
    }).catch(()=>{
        toast({
            title: `Semester ${semOpts.SemId} create failure`,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
    }).finally(()=>console.log("api/sem post request made"))
  }
  

  export const getSem = (
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
        api.get('/sem').then((res:Isem[]|any)=>{
                dispatch({type: UPDATE_SEM, payload: res.data})
        }).catch((err:any)=>{
            toast({
                title: `Semester get data failure`,
                description: `${err.response}`,
                status: "error",
                duration: 4000,
                isClosable: true,
              });
        }).finally(()=>console.log('/api/sem get request made'))
  }


  export const delSem = (
    SemId: string,
    toast: any | undefined,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
  ) => {
        api.delete('/sem',{
            params:{
                SemId: SemId
            }
        }).then((res:Isem[]|any)=>{
            dispatch({type: UPDATE_SEM, payload: res.data})
            toast({
                title: `Semester ${SemId} delete data success`,
                status: "success",
                duration: 4000,
                isClosable: true,
              });
        }).catch((err:any)=>{
            toast({
                title: `Semester ${SemId} delete data failure`,
                description: `${err.response}`,
                status: "error",
                duration: 4000,
                isClosable: true,
              });
        }).finally(()=>console.log('/api/sem delete api called'))
  }
const initialState:Isem[]=[];
///^SEM_[1-9]_[1-2][0-9][0-9][0-9]$/.test('S_9_2011');
export const semReducer = (
    state = initialState,
    action: SemesterActionTypes
  ): Isem[] => {
    switch (action.type) {
      case UPDATE_SEM:
        return {...action.payload}
      default:
        return state;
    }
  };
  
  export default semReducer;
  