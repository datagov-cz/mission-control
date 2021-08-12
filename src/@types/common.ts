import i18n from "i18n";
import Routes from "app/routes";

export type Locale = keyof typeof i18n;

export type Iri = string;

export type Id = string;

export type MessageType = "error" | "warning" | "info" | "success";

export type MessageKey = string;

export type Message = {
  type: MessageType;
  message: MessageKey;
};

export type Route = typeof Routes[keyof typeof Routes];
