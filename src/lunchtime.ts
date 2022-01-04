export default function getNextLunchtime(
  hours: number,
  minutes: number,
  DateCtr: DateConstructor
): Date {
  const lunchtime = new DateCtr();

  lunchtime.setHours(hours);
  lunchtime.setMinutes(minutes);
  lunchtime.setSeconds(0);
  lunchtime.setMilliseconds(0);

  // if we've already had lunch today, start planning
  // tomorrow's lunch
  if (lunchtime.getTime() < DateCtr.now())
    lunchtime.setDate(lunchtime.getDate() + 1);

  return lunchtime;
}
