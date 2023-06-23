import axios from "axios";

const base_url = "http://127.0.0.1:8000/api/v1.0/";

const instance = axios.create({
  baseURL: base_url,
  // headers: {
  //   Authorization: "Token 5ab9c7e2491ffe7b3b33388a742ddf24ce4e8459",
  // },
});

export const WorkersAPI = {
  getAllWorkers(pageNum) {
    return instance.get("worker/?page=" + pageNum).then(response => response.data.results)
  },
  getGeneralWorkers() {
    return instance.get("worker/general").then((response) => response.data);
  },
  getNestedWorkers(workerId) {
    return instance
      .get(`worker/${workerId}/subordinate`)
      .then((response) => response.data);
  },
  getNodeIds(workerId) {
    return instance
      .get(`worker/${workerId}/getnodesids`)
      .then((response) => response.data);
  },
  getWorkerDetail(workerId) {
    return instance.get(`worker/${workerId}/`)
      .then(response => response.data)
  },
  updateWorker(workerId, workerData) {
    return instance.put(`worker/${workerId}/`, {
      ...workerData
    })

  }
};
