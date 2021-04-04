import { api } from "../api";
import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
 Ileave,Ileavesend
} from "./leave";
import Moment from 'moment';

/*----ActionTypes--------*/
export const GET_Leave = "GET_Leave";
export const DELETE_Leave = "DELETE_Leave";
export const UPD_LEAVE = "UPD_LEAVE";

/*-------ActionTypeInterface--------*/
interface getLeaveAction {
  type: typeof GET_Leave;
}
interface updLeaveAction {
  type: typeof UPD_LEAVE;
  payload: Ileave[];
}

export type LeaveActionTypes = getLeaveAction | updLeaveAction;

export const getLeave = (
  toast: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  api
    .get("/leave")
    .then((res: Ileave[] | any) => {
      dispatch({ type: UPD_LEAVE, payload: res.data });
    })
    .catch((err) => {
      toast({
        title: `Leave get failure`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    })
    .finally(() => console.log("api/leave get request made"));
};

export const applyLeave = (
  leaveOpts: Ileavesend,
  toast: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  api
    .post("/leave", {
      ...leaveOpts,
    })
    .then((res: Ileave[] | any) => {
      dispatch({ type: UPD_LEAVE, payload: res.data });
      toast({
        title: `Leave apply success`,
        description: `Leave applied from ${Moment(leaveOpts.fromdate).format('ll')} to ${Moment(leaveOpts.todate).format('ll')}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    })
    .catch((err) => {
      toast({
        title: `Leave apply failure`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    })
    .finally(() => console.log("api/leave post request made"));
};

export const updateLeave = (
  eventOpts: Ileave,
  toast: any | undefined,
  onClose: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  api
    .put("/leave", {
      ...eventOpts,
    })
    .then(async (res: Ileave | any) => {
      await onClose();
      dispatch(getLeave(toast));
      toast({
        title: `Leave update success`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      //dispatch(getEvent(toast));
      //history.replace('/protected/events')
    })
    .catch((err) => {
      toast({
        title: `Leave update failure`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    })
    .finally(() => console.log("api/leave put request made"));
};

export const delLeave = (
  Leaveid: string|any,
  toast: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  console.log(Leaveid)
  api
    .delete("/leave", {
    params:{
      Leaveid: Leaveid,
    }
    })
    .then((res: Ileave[] | any) => {
      dispatch(getLeave(toast));
      toast({
        title: `Leave delete data success`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    })
    .catch((err: any) => {
      toast({
        title: `Leave delete data failure`,
        description: `${err.response}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    })
    .finally(() => console.log("/api/events delete api called"));
};

const initialState: Ileave[] = [];

export const LeaveReducer = (
  state = initialState,
  action: LeaveActionTypes
): Ileave[] => {
  switch (action.type) {
    case UPD_LEAVE:
      return {...action.payload};
    default:
      return { ...state };
  }
};

export default LeaveReducer;
