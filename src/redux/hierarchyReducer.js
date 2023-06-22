import { WorkersAPI } from "../api/api";

const SET_GENERAL_WORKERS = "SET_GENERAL_WORKERS";
const SET_NESTED_WORKERS = "SET_NESTED_WORKERS";
const REMOVE_NESTED_WORKERS = "REMOVE_NESTED_WORKERS";

let initialState = {
  workers: [],
};

const hierarchyReducer = (state = initialState, action) => {
  const recursion = (workers, ids, data = []) => {
    if (workers.length) {
      workers = workers.map((worker) => {
         if (ids.value.includes(worker.id)) {
          ids.count += 1;
          if(ids.value.length === ids.count && !data.length) {
            worker.children = [];
          } else{
            worker.children = recursion(worker.children, ids, data);
          }
        }
        return worker;
      });
      return workers;
    } else {
      // console.log("DATA", data, workers);
      return data;
    }
  };

  switch (action.type) {
    case SET_GENERAL_WORKERS:
      return { workers: action.workers };

    case SET_NESTED_WORKERS:
      return {
        ...state,
        workers: recursion({ ...state }.workers, action.ids, action.data),
      };

    case REMOVE_NESTED_WORKERS:
      return {
        ...state,
        workers: recursion({ ...state }.workers, action.ids),
      };

    default:
      return state;
  }
};

export const setNestedWorkers = (ids, data) => {
  return {
    type: SET_NESTED_WORKERS,
    ids: { value: ids, count: 0 },
    data,
  };
};
export const removeNestedWorkers = (ids) => {
  return {
    type: REMOVE_NESTED_WORKERS,
    ids: { value: ids, count: 0 },
  };
};
export const setGeneralWorkers = (workers) => {
  return {
    type: SET_GENERAL_WORKERS,
    workers,
  };
};

export const getGeneralWorkers = () => {
  return (dispatch) => {
    WorkersAPI.getGeneralWorkers().then((data) => {
      dispatch(setGeneralWorkers(data));
    });
  };
};

export const getNestedWorkers = (workerId) => {
  return (dispatch) => {
    WorkersAPI.getNestedWorkers(workerId).then((data) => {
      WorkersAPI.getNodeIds(workerId).then((ids) => {
        dispatch(setNestedWorkers(ids, data));
      });
    });
  };
};
export const deleteNestedWorkers = (workerId) => {
  return (dispatch) => {
    WorkersAPI.getNodeIds(workerId).then((ids) => {
      dispatch(removeNestedWorkers(ids));
    });
  };
};

export default hierarchyReducer;
