import { AjaxResponse } from "rxjs/ajax";

import { Id } from "@types";
import getIdFromIri from "./getIdFromIri";

const getIdFromResponse = (response: AjaxResponse): Id =>
  getIdFromIri(response.xhr.getResponseHeader("Location") || "");

export default getIdFromResponse;
