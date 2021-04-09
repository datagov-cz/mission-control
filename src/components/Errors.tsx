import React from "react";
import { AjaxError } from "rxjs/ajax";
import { Box, IconButton, styled, Typography } from "@material-ui/core";

import Icon from "components/Icon";
import t from "components/i18n";

const BackdropGradient = styled(Box)({
  background: "#263238 radial-gradient(circle, #057fa5 0%, #263238 100%)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

type ErrorPageProps = {
  code: number;
  message: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ code, message, children }) => {
  return (
    <BackdropGradient color="white">
      <Box p={2} display="flex" alignItems="center">
        <IconButton color="inherit">
          <Icon />
        </IconButton>
        <Typography variant="h6">{t`controlPanel`}</Typography>
      </Box>
      <Typography variant="h1">{code}</Typography>
      <Typography variant="h3">{t(message)}</Typography>
      {children && (
        <Box maxWidth={500} margin={4}>
          {children}
        </Box>
      )}
    </BackdropGradient>
  );
};

export const Error404 = () => <ErrorPage code={404} message={"pageNotFound"} />;

type ErrorFallbackProps = {
  error: Error | AjaxError;
};

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const isAjax = error instanceof AjaxError;
  if (!isAjax) {
    return <ErrorPage code={500} message={"somethingWentWrong"} />;
  }
  const ajaxError = error as AjaxError;
  const responseJson = ajaxError.xhr.response;
  return (
    <ErrorPage code={ajaxError.status} message={"somethingWentWrongWithApi"}>
      <Typography paragraph style={{ fontFamily: "monospace" }}>
        {ajaxError.request.method} {ajaxError.request.url}
      </Typography>
      <Typography style={{ fontFamily: "monospace" }}>
        {responseJson.message}
      </Typography>
    </ErrorPage>
  );
};
