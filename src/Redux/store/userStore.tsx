import { DocumentData } from "firebase/firestore";
import { USER_TOKEN_SAVE, MATERIALS, USERS } from "../types/index";
import { AnyAction, Reducer } from "redux";

type CurrentUser = {
  uid: string;
};

type MyData = {
  currentUser: CurrentUser | undefined;
  token: string | undefined;
  data: { id: string; data: DocumentData }[] | undefined;
  users: { id: string; data: DocumentData }[] | undefined;
};
type ActionType = {
  type: string;
  currentUser: CurrentUser;
  token: string;
  data: { id: string; data: DocumentData }[];
  users: { id: string; data: DocumentData }[];
};
type ReducerActionType = ActionType | AnyAction;

const initialState: MyData = {
  currentUser: undefined,
  token: undefined,
  data: undefined,
  users: undefined,
};

const counterReducer: Reducer<MyData, ReducerActionType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case USER_TOKEN_SAVE: {
      return { ...state, token: action.token };
    }
    case MATERIALS: {
      return { ...state, data: action.data };
    }
    case USERS: {
      return { ...state, users: action.data };
    }
    default:
      return state;
  }
};

export default counterReducer;
