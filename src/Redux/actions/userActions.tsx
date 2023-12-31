import { Dispatch } from "redux";
import { USER_TOKEN_SAVE, MATERIALS, USERS } from "../types/index";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseInit";

export function saveToken(token: string | undefined) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: USER_TOKEN_SAVE,
      token,
    });
  };
}

export const fetchPosts = () => {
  return (dispatch: Dispatch) => {
    const unsubscribe = onSnapshot(
      collection(db, "materials"),
      (querySnapshot) => {
        const newData: { id: string; data: DocumentData }[] =
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
        dispatch({
          type: MATERIALS,
          data: newData,
        });
      }
    );

    // Return the unsubscribe function if needed
    return unsubscribe;
  };
};

export const fetchUsers = () => {
  return (dispatch: Dispatch) => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const newData: { id: string; data: DocumentData }[] =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
      dispatch({
        type: USERS,
        data: newData,
      });
    });

    // Return the unsubscribe function if needed
    return unsubscribe;
  };
};
