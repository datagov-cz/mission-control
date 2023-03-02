import { Id } from "../@types";
import getIdFromIri from "./getIdFromIri";
import { AxiosResponse } from "axios";

const getIdFromResponse = (response: AxiosResponse): Id => {
  return getIdFromIri(response.headers["location"] ?? "");
};

export default getIdFromResponse;
