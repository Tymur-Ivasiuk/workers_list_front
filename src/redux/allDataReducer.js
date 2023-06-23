import { WorkersAPI } from "../api/api";

const SET_WORKERS = "SET_WORKERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  workers: [],
  currentPage: 1,
  isFetching: false,
};

const allDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKERS:
      return {
        ...state,
        workers: [...state.workers, ...action.data],
      }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNum,
      }

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    default:
      return state;
  }
};

export const setWorkersAllData = (data) => {
  return {
    type: SET_WORKERS,
    data,
  }
}
export const setCurrentPage = (pageNum) => {
  return {
    type: SET_CURRENT_PAGE,
    pageNum,
  }
}
export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  }
}


export const getAllWorkers = (pageNum) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));

    WorkersAPI.getAllWorkers(pageNum).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setCurrentPage(pageNum+1))
      dispatch(setWorkersAllData(data))
    })
  }
}




export default allDataReducer;