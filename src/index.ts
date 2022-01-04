import ms from "ms";
import lunchtime from "./lunchtime";

export interface LunchInquirer {
  (hours?: number | undefined, minutes?: number | undefined): string;
  Date: DateConstructor;
}

function millisecondsUntil(toWhen: Date, fromWhen: number): number {
  return toWhen.getTime() - fromWhen;
}

export const howLongTillLunch: LunchInquirer = (hours, minutes): string => {
  const lunchHour = typeof hours === "number" ? hours : 12;
  const lunchMinute = typeof minutes === "number" ? minutes : 30;
  const DateCtr = howLongTillLunch.Date;
  const millisecondsUntilLunchTime = millisecondsUntil(
    lunchtime(lunchHour, lunchMinute, DateCtr),
    DateCtr.now()
  );
  const out = ms(millisecondsUntilLunchTime, { long: true });
  return out;
};

howLongTillLunch.Date = Date;
