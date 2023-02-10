import { API_URL } from "../app/variables";
import axios from "axios";
import { getToken } from "@opendata-mvcr/assembly-line-shared";
import Constants from "../app/Constants";

export class Ajax {
  protected axiosInstance = axios.create({
    baseURL: API_URL,
  });

  constructor() {
    this.axiosInstance.interceptors.request.use((reqConfig) => {
      if (!reqConfig.headers) {
        reqConfig.headers = {};
      }
      reqConfig.headers[Constants.Headers.AUTHORIZATION] = getToken();
      reqConfig.withCredentials = true;
      return reqConfig;
    });
  }

  public get(path: string) {
    return this.axiosInstance.get(path);
  }

  public post(path: string, content: any) {
    return this.axiosInstance.post(path, content);
  }

  public delete(path: string, content: any) {
    //TODO: Fix this
    let headers = {};
    // @ts-ignore
    headers["content-type"] = "application/json";
    return this.axiosInstance.delete(path, { data: content, headers: headers });
  }
}

const instance = new Ajax();

export default instance;
