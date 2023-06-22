import axios from "axios";

const base_url = "http://127.0.0.1:8000/api/v1.0/";

const instance = axios.create({
  baseURL: base_url,
  headers: {
    Authorization: "Token 47c5da30bdc6c02af71997580b5769faba723e1c",
  },
});

export const WorkersAPI = {
  getGeneralWorkers() {
    return instance.get("worker/").then((response) => response.data);
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
};
