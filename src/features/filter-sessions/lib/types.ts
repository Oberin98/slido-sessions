import { SessionType } from '~entities/session';

export type FilterSessionsValue = {
  query?: string;
  sessionType?: SessionType | '';
  startDateGte?: string | '';
  endDateLte?: string | '';
};
