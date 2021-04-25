import { api } from "../api";
import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import moment from "moment";

interface Inotification {
  title: string;
  time: string;
}
/*----ActionTypes--------*/
export const GET_notification = "GET_notification";
export const DELETE_notification = "DELETE_notification";
export const UPD_notification = "UPD_notification";

/*-------ActionTypeInterface--------*/
interface getnotificationAction {
  type: typeof GET_notification;
}
interface updnotificationAction {
  type: typeof UPD_notification;
  payload: Inotification[];
}

export type notificationActionTypes =
  | getnotificationAction
  | updnotificationAction;

interface IrevRem {
  EventEventId: string;
  createdAt: string;
  id: number;
  time: string;
  updatedAt: string;
  userUsername: string;
  Event?: { EventName?: string };
}
export const getnotification = (
  toast: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  console.log("Inn");
  api
    .get("/rem")
    .then(async (res: any) => {
      console.log("Innq");
      console.log(res.data);
      let data1 = Object.values(res.data).map((q: IrevRem | any) => {
        console.log(q.Event['EventName']);
       
          return {
            time: String(moment(q.time).toDate()),
            title: String(q.Event['EventName']),
          };
        
      });
      console.log(data1);
      dispatch({ type: UPD_notification, payload: data1 });
    })
    .catch((err) => {
      console.log("Inn3", err);
      //   toast({
      //     title: `notification get failure`,
      //     status: "error",
      //     duration: 4000,
      //     isClosable: true,
      //   });
    })
    .finally(() => console.log("api/notification get request made"));
};

const initialState: Inotification[] = [];

export const notificationReducer = (
  state = initialState,
  action: notificationActionTypes
): Inotification[] => {
  switch (action.type) {
    case UPD_notification:
      return { ...action.payload };
    default:
      return { ...state };
  }
};

export default notificationReducer;
