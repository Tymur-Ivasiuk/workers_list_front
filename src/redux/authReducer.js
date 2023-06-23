const SET_USER_DATA = "SET-USER-DATA";

let initialState = {
  userId: null,
  email: null,
  login: "fakelogin",
  isAuth: false,
  isFetching: false,
  authToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login) => {
  return {
    type: SET_USER_DATA,
    data: {
      userId,
      email,
      login,
      isAuth: true,
    },
  };
};

export default authReducer;
