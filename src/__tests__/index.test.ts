import "jest";
import { howLongTillLunch } from "..";

class MockDate {
  private date = 0;
  private hours = 0;
  private minutes = 0;
  private seconds = 0;
  private milliseconds = 0;

  getDate(): number {
    return this.date;
  }
  setDate(date: number): void {
    this.date = date;
  }
  setHours(h: number): void {
    this.hours = h;
  }
  setMinutes(m: number): void {
    this.minutes = m;
  }
  setSeconds(s: number): void {
    this.seconds = s;
  }
  setMilliseconds(ms: number): void {
    this.milliseconds = ms;
  }
  getTime(): number {
    return (
      this.milliseconds +
      this.seconds * 1e3 +
      this.minutes * 1e3 * 60 +
      this.hours * 1e3 * 60 * 60 +
      this.date * 1e3 * 60 * 60 * 24
    );
  }

  static now(): number {
    return now.getTime();
  }
}

howLongTillLunch.Date = MockDate as unknown as DateConstructor;

let now: MockDate;

function timeIs(hours: number, minutes: number, seconds: number): void {
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(seconds);
}

describe("lunch", () => {
  beforeEach(() => {
    now = new MockDate();
  });

  it("is in our future", () => {
    timeIs(10, 45, 15);
    expect(howLongTillLunch(12, 0)).toEqual("1 hour");
  });

  describe("default", () => {
    it("is 12:30", () => {
      timeIs(12, 25, 0);
      expect(howLongTillLunch()).toEqual("5 minutes");
    });

    it("is at least 12 something", () => {
      timeIs(12, 1, 30);
      expect(howLongTillLunch(undefined, 2)).toEqual("30 seconds");
    });

    it("is at least half past something", () => {
      timeIs(9, 51, 0);
      expect(howLongTillLunch(10)).toEqual("39 minutes");
    });
  });

  it("is tomorrow if we're late", () => {
    timeIs(15, 0, 0);
    expect(howLongTillLunch(13, 0)).toEqual("22 hours");
  });
  // planLunch(11, 30, 0, "1 hour");
  // planLunch(10, 30, 0, "2 hours");
  // planLunch(12, 25, 0, "5 minutes");
  // planLunch(12, 29, 15, "45 seconds");
  // planLunch(13, 30, 0, "23 hours");

  // planLunch(10, 30, 0, "30 minutes", 11, 0);
});
