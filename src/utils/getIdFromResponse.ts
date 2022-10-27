import { Id } from "../@types";
import getIdFromIri from "./getIdFromIri";
import { AxiosResponse } from "axios";


const getIdFromResponse = (response: AxiosResponse): Id => {
  console.log("response header")
  console.log(response.headers["location"] ?? "")
  return getIdFromIri(response.headers["location"] ?? "");
}


export default getIdFromResponse;
