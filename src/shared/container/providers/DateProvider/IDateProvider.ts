interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUtc(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  dateAfterDays(days: number): Date;
  dateAfterHours(hours: number): Date;
  isBeforeDate(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
