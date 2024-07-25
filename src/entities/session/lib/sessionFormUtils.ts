import dayjs from 'dayjs';
import * as yup from 'yup';

import { SessionType } from '~entities/session';

export type SessionFormState = {
  title: string;
  body: string;
  sessionType: SessionType;
  startDateTime: Date;
  endDateTime: Date;
};

const sessionTypes: SessionType[] = ['event', 'meeting'];

export const sessionFormSchema = yup.object().shape({
  title: yup.string().required('Title is required').max(128, 'Title cannot be longer than 128 characters'),

  body: yup.string().required('Body is required').max(1024, 'Body cannot be longer than 1024 characters'),

  sessionType: yup
    .string()
    .required('Type is required')
    .oneOf(sessionTypes, 'Type can be either a meeting or an event'),

  startDateTime: yup.date().required('Start date is required'),

  endDateTime: yup
    .date()
    .required('End date is required')
    .test('isEndDateAfterStartDate', 'End date cannot be before start date', (_, { parent }) => {
      const { startDateTime, endDateTime } = parent as SessionFormState;

      const startDate = dayjs(startDateTime);
      const endDate = dayjs(endDateTime);

      if (startDate.isValid() && endDate.isValid()) {
        return !startDate.isAfter(endDate);
      }

      return false;
    })
    .test('isValidDateRangeForSessionType', 'Meeting cannot be longer than 24 hours', (_, { parent }) => {
      const { sessionType, startDateTime, endDateTime } = parent as SessionFormState;

      const startDate = dayjs(startDateTime);
      const endDate = dayjs(endDateTime);

      if (!startDate.isValid() && !endDate.isValid()) {
        return false;
      }

      // Meeting can last up to 1 day
      // Event can be set up for more days
      if (sessionType === 'meeting') {
        const durationMs = endDate.diff(startDate);
        const oneDayInMs = 24 * 60 * 60 * 1000;
        return durationMs <= oneDayInMs;
      }

      return true;
    }),
});
