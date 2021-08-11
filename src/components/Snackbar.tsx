import React from "react";
import { of, merge } from "rxjs";
import { switchMap, delay } from "rxjs/operators";
import { useObservableState } from "observable-hooks";
import { Snackbar as BaseSnackbar } from "@material-ui/core";
import { Alert } from "@material-ui/core";

import t from "components/i18n";
import { messages$ } from "data/messages";

/**
 * Timeout for visibility of a message in miliseconds
 */
const AUTO_HIDE_DELAY = 5000;

/**
 * The following epic will emit two values for each incoming message.
 * Each message is paired with whether or not the message should be visible.
 * After the delay the message is supposed to be closed.
 * If there is another message coming in before the timeout then the delay
 * is reset thanks to the switchMap.
 */
const messagesEpic$ = messages$.pipe(
  switchMap((message) =>
    merge(
      of({ message, open: message !== undefined }),
      of({ message, open: false }).pipe(delay(AUTO_HIDE_DELAY))
    )
  )
);

const Snackbar: React.FC = () => {
  const messageData = useObservableState(messagesEpic$);

  if (!messageData) {
    return null;
  }

  const { message, open } = messageData;

  return (
    <BaseSnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
    >
      <Alert elevation={6} variant="filled" severity={message.type}>
        {t(message.message)}
      </Alert>
    </BaseSnackbar>
  );
};

export default Snackbar;
