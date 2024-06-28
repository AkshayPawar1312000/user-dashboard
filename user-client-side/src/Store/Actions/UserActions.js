import * as api from "../Api/index";
import {
  ADD_USER_DATA,
  USER_LOGIN,
  LOADER,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  ALL_USERS,
  DELETE_USER,
  UPDATE_USER,
  EDIT_USER_INFO,
} from "../Constatnt";

// This loader action works accordingly user action
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

// Dispatches a success message with provided data.
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

// Dispatches an error message with provided data.
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

// Fetches all user data in api and dispatches it.
export const allUsers = () => async (dispatch) => {
  try {
    const { data } = await api.allUsers();
    dispatch({
      type: ALL_USERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Adds new user data via API and dispatches success or error messages.
export const addUserData = (userData, navigate) => async (dispatch) => {
  try {
    await dispatch(loader(true));
    const { data } = await api.addUser(userData);
    dispatch({
      type: ADD_USER_DATA,
      payload: data,
    });
    await dispatch(loader(false));
    let messageData = {
      type: true,
      message: data?.message,
    };
    await dispatch(successMessage(messageData));

    if (data) {
      navigate(`/userDashboar`);
    }
  } catch (error) {
    await dispatch(loader(false));
    let messageData = {
      type: true,
      message: error?.message,
    };
    dispatch(errorMessage(messageData));
    console.log(error);
  }
};

// Handles user login via API, dispatches login status, and navigates to dashboard.
export const userLogin = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(userData);
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });

    if (data) {
      navigate(`/userDashboar`);
    }

    let messageData = {
      type: true,
      message: data?.message,
    };
    await dispatch(successMessage(messageData));
  } catch (error) {
    let messageData = {
      type: true,
      message: error?.message,
    };
    dispatch(errorMessage(messageData));
    console.log(error);
  }
};

// Deletes user data by ID via API and dispatches updated user list.
export const deleteUser = (id) => async (dispatch) => {
  try {
    await dispatch(loader(true));
    const { data } = await api.deleteUser(id);
    dispatch({
      type: DELETE_USER,
      payload: data,
    });
    if (data) {
      dispatch(allUsers());
    }
    await dispatch(loader(false));
  } catch (error) {
    await dispatch(loader(false));
    console.log(error);
  }
};

// Updates user data by ID via API, dispatches updated user data, and navigates to dashboard.
export const updateUser = (id, userdData, navigate) => async (dispatch) => {
  try {
    await dispatch(loader(true));
    const { data } = await api.updateUser(id, userdData);
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
    if (data) {
      navigate(`/userDashboar`);
    }
    await dispatch(loader(false));
  } catch (error) {
    await dispatch(loader(false));
    console.log(error);
  }
};

// In user dashboard edit user data pass the edit fields
export const editUSerData = (userdData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_USER_INFO,
      payload: userdData,
    });
    if (userdData) {
      navigate(`/`);
    }
  } catch (error) {
    await dispatch(loader(false));
    console.log(error);
  }
};
