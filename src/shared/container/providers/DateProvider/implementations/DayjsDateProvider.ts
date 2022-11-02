import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  public compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUtc(start_date);
    const end_date_utc = this.convertToUtc(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  public compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUtc(start_date);
    const end_date_utc = this.convertToUtc(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'days');
  }

  public convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  public dateNow(): Date {
    return dayjs().toDate();
  }

  public dateAfterDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}

export { DayjsDateProvider };
