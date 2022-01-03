import ms from 'ms';
import lunchtime from './lunchtime';

function millisecondsUntil(toWhen: Date, fromWhen: number): number {
	return toWhen.getTime() - fromWhen;
}

export function howLongTillLunch(hours: number = 12, minutes: number = 30): string {
  const DateCtr = howLongTillLunch.Date;
	const millisecondsUntilLunchTime = millisecondsUntil(lunchtime(hours, minutes, DateCtr), DateCtr.now());
	return ms(millisecondsUntilLunchTime, { long: true });
}

howLongTillLunch.Date = Date;
