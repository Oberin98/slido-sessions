import { SessionType } from '~entities/session';

export type FilterSessionsValue = {
  query?: string;
  sessionType?: SessionType | '';
  startDateGte?: Date;
  endDateLte?: Date;
};
