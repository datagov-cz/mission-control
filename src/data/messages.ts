import { Subject } from "rxjs";

import { Message, MessageType } from "@types";

export const messages$ = new Subject<Message>();

const showMessage = (type: MessageType) => (message: string) =>
  messages$.next({
    type,
    message,
  });

export const showError = showMessage("error");

export const showWarning = showMessage("warning");

export const showInfo = showMessage("info");

export const showSuccess = showMessage("success");
