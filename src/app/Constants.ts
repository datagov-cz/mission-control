const constants = {
  LANG: {
    CS: {
      locale: "cs-CZ",
      label: "Čestina",
      flag: "flags/cz.svg",
    },
  },
  // Error origin caused by the inability to connect to the backend server
  CONNECTION_ERROR: "CONNECTION_ERROR",
  JSON_MIME_TYPE: "application/json",
  JSON_LD_MIME_TYPE: "application/ld+json",
  TEXT_MIME_TYPE: "text/plain",
  HTML_MIME_TYPE: "text/html",
  CSV_MIME_TYPE: "text/csv",
  TTL_MIME_TYPE: "text/turtle",
  EXCEL_MIME_TYPE:
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  X_WWW_FORM_URLENCODED: "application/x-www-form-urlencoded;charset=UTF-8",
  MULTIPART_FORM_DATA: "multipart/form-data",
  // HTTP response status 401 Unauthorized
  STATUS_UNAUTHORIZED: 401,
  // HTTP response status 409 Conflict
  STATUS_CONFLICT: 409,
  // Axios uses lower case for header names
  Headers: {
    ACCEPT: "accept",
    AUTHORIZATION: "authorization",
    CONTENT_DISPOSITION: "content-disposition",
    CONTENT_TYPE: "content-type",
    IF_MODIFIED_SINCE: "if-modified-since",
    LAST_MODIFIED: "last-modified",
    LOCATION: "location",
    X_TOTAL_COUNT: "x-total-count",
  },
};

export default constants;
