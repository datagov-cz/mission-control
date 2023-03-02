import { Locale } from "../@types";

const DAYS_THRESHOLD = 20;

export const calculateTimeDifference = (
  modifiedDate: Date,
  language: Locale
) => {
  const formatter = new Intl.RelativeTimeFormat(language);
  let diff = new Date().getTime() - Number(modifiedDate);
  diff /= 1000 * 60 * 60 * 24;

  if (diff >= 30) {
    diff /= 30;
    diff = Math.floor(diff);
    return {
      formattedText: formatter.format(-diff, "months"),
      showWarning: true,
    };
  } else if (diff < 1 && diff * 60 * 24 >= 60) {
    diff *= 24;
    diff = Math.floor(diff);
    return {
      formattedText: formatter.format(-diff, "hours"),
      showWarning: false,
    };
  } else if (diff < 1 && diff * 60 * 24 < 60) {
    diff *= 24 * 60;
    diff = Math.floor(diff);
    return {
      formattedText: formatter.format(-diff, "minutes"),
      showWarning: false,
    };
  }

  diff = Math.floor(diff);
  return {
    formattedText: formatter.format(-diff, "days"),
    showWarning: diff >= DAYS_THRESHOLD,
  };
};
