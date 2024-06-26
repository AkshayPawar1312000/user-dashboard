import * as api from "../Api/index";
import { ADD_USER_DATA, USER_LOGIN, LOADER,ERROR_MESSAGE,SUCCESS_MESSAGE } from "../Constatnt";

export const loader = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOADER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const successMessage = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const errorMessage = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ERROR_MESSAGE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addUserData = (userData, navigate) => async (dispatch) => {
  try {
    //   const { data } = await api.getQuiz(id);

    dispatch({
      type: ADD_USER_DATA,
      payload: userData,
    });

    //   if (data) {
    //     navigate(`/quize`);
    //   }
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = (userData, navigate) => async (dispatch) => {
  try {
    //   const { data } = await api.getQuiz(id);

    dispatch({
      type: USER_LOGIN,
      payload: userData,
    });

    //   if (data) {
    //     navigate(`/quize`);
    //   }
  } catch (error) {
    console.log(error);
  }
};
