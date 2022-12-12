import axios from "axios";

// const DEV = false;
// const devURL = "https://localhost:7151/";
// const prodURL = "https://mymovies-task.azurewebsites.net/";

axios.defaults.baseURL = "https://calm-inlet-82346.herokuapp.com/crypto";
// axios.defaults.headers["X-CMC_PRO_API_KEY"] = "13fb332a-a0ce-49ba-8b8d-234dde93f9d8";

export const axiosReq = axios.create();
export const axiosRes = axios.create();
