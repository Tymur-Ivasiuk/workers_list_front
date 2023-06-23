import { WorkersAPI } from "../api/api";

const SET_GENERAL_WORKERS = "SET_GENERAL_WORKERS";
const SET_NESTED_WORKERS = "SET_NESTED_WORKERS";
const REMOVE_NESTED_WORKERS = "REMOVE_NESTED_WORKERS";
const SET_DRAG_ID = "SET_DRAG_ID";
const SET_DROP_ID = "SET_DROP_ID";
const CHANGE_WORKERS_WARDEN = "CHANGE_WORKERS_WARDEN";

let initialState = {
  workers: [],
  dragId: null,
  dropId: null,
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
      return data;
    }
  };

  switch (action.type) {
    case SET_GENERAL_WORKERS:
      return { ...state,
        workers: action.workers 
      };

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


    // drag n drop
    case SET_DRAG_ID:
      return {
        ...state,
        dragId: action.dragId,
      }
    case SET_DROP_ID:
      return {
        ...state,
        dropId: action.dropId,
      }

    case CHANGE_WORKERS_WARDEN:
      function findById(data, id) {
        function iter(a) {
          if (a.id === id) {
            result = a;
            return true;
          }

          return Array.isArray(a.children) && a.children.some(iter);
        }

        var result;
        const newData = data.map(a => iter(a));
        return result;
      }

      function insertByIds(workers, ids, data=[], idDrop=1) {
        if(idDrop === 0) {
          workers.push(data)
          return workers
        }
        if (workers.length) {
          workers = workers.map((worker) => {
            if (ids.value.includes(worker.id)) {
              ids.count += 1;
              if (ids.value.length === ids.count && !data.length) {
                worker.children = [];
                worker.haveChildren = false;
              } else if(ids.value.length === ids.count) {
                worker.haveChildren = true;
                worker.children = [...worker.children, data[0]]
              } else {
                worker.haveChildren = true;
                if (!worker.children.find((e) => e.id === data[0].id)) {
                  worker.children = [
                    ...insertByIds(worker.children, ids, data),
                  ];
                  worker.haveChildren = true;
                }
              }
            }
            return worker;
          });
          return workers;
        } else {
          return data;
        }
      }

      function recursionDeleteWorker(workers, ids)  {
        if (workers.length) {
          workers = workers.map((worker) => {
            if (ids.value.includes(worker.id)) {
              ids.count += 1;
              if (ids.value.length === ids.count) {
                worker = undefined;
              } else {
                worker.children = recursionDeleteWorker(worker.children, ids);
                if (worker.children.length == 0) {
                  // worker.haveChildren = false;
                }
              }
            }
            return worker;
          });
          return workers.filter(function (element) {
            return element !== undefined;
          });
        } else {
          return [];
        }
      };
      const getData = findById([...state.workers], action.idDrag);

      let stateCopy = {
        ...state,
        workers: recursionDeleteWorker([...state.workers], action.idsDrag)
      }
      stateCopy = {
        ...state,
        workers: insertByIds([...stateCopy.workers], action.idsDrop , [getData], action.idDrop)
      };
      return stateCopy

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

export const setDragIdAC = (dragId) => {
  return {
    type: SET_DRAG_ID,
    dragId,
  };
};
export const setDropIdAC = (dropId) => {
  return {
    type: SET_DROP_ID,
    dropId,
  };
};

export const changeWorkersWarden = (idDrag, idsDrag, idsDrop, idDrop) => {
  return {
    type: CHANGE_WORKERS_WARDEN,
    idDrag,
    idDrop,
    idsDrag: { value: idsDrag, count: 0 },
    idsDrop: { value: idsDrop, count: 0 }
  }
}

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

export const setDragId = (workerId) => {
  return (dispatch) => {
    dispatch(setDragIdAC(workerId));
  };
};
export const setDropId = (workerId) => {
  return (dispatch) => {
    dispatch(setDropIdAC(workerId))
  };
};



export const updateWorker = (workerIdDrag, workerIdDrop) => {
  return (dispatch) => {
    WorkersAPI.getNodeIds(workerIdDrag).then((idsDrag) => {
        WorkersAPI.getNodeIds(workerIdDrop).then((idsDrop) => {
          WorkersAPI.getWorkerDetail(workerIdDrag).then((workerData) => {
            WorkersAPI.updateWorker(workerIdDrag, {
              ...workerData,
              warden: workerIdDrop,
            })
              .then((response) => {
                dispatch(changeWorkersWarden(workerIdDrag, idsDrag, idsDrop, workerIdDrop));
                dispatch(setDragIdAC(null));
                dispatch(setDropIdAC(null));
              }).catch((error) => {
                alert("You can't make a boss, your worker");
                // return Promise.reject(error)
              });
          });
        });
    });
  };
}


export default hierarchyReducer;
