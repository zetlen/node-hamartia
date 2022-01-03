import 'jest';
const {howLongTillLunch} = require('../src/main');

class MockDate {
	private date = 0;
	private hours = 0;
	private minutes = 0;
	private seconds = 0;
	private milliseconds = 0;

	getDate (): number { return this.date; }
	setDate (date: number): void { this.date = date; }
	setHours (h: number) { this.hours = h; }
	setMinutes (m: number): void { this.minutes = m; }
	setSeconds (s: number): void { this.seconds = s; }
	setMilliseconds (ms: number): void { this.milliseconds = ms; }
	getTime (): number {
		return (
			this.milliseconds +
			this.seconds * 1e3 +
			this.minutes * 1e3 * 60 +
			this.hours * 1e3 * 60 * 60 +
			this.date * 1e3 * 60 * 60 * 24
		);
	}

	static now () {
    return now.getTime();
  }
}

howLongTillLunch.Date = MockDate;

let now: MockDate;

describe('lunch', () => {
  beforeEach(() => {
    now = new MockDate();
  })

function planLunch(hours: number, minutes: number, seconds: number, expected: string, lunchHours = 12, lunchMinutes = 30): void {
  it(`says when lunch`, () => {
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(seconds);
    expect(howLongTillLunch(lunchHours, lunchMinutes)).toEqual(expected);
  })
}

it('assumes lunch is 12:30', () => {
    now.setHours(12);
    now.setMinutes(25);
    now.setSeconds(0);
    expect(howLongTillLunch()).toEqual('5 minutes')
});

planLunch(11, 30, 0, '1 hour');
planLunch(10, 30, 0, '2 hours');
planLunch(12, 25, 0, '5 minutes');
planLunch(12, 29, 15, '45 seconds');
planLunch(13, 30, 0, '23 hours');

planLunch(10, 30, 0, '30 minutes', 11, 0);

})
