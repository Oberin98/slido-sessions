import dayjs from 'dayjs';
import * as yup from 'yup';

import { SessionType } from '~entities/session';

import { CreateSessionFormState } from './types';

const sessionTypes: SessionType[] = ['event', 'meeting'];

export const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(128, 'Title cannot be longer than 128 characters'),

  body: yup.string().required('Body is required').max(1024, 'Body cannot be longer than 1024 characters'),

  sessionType: yup
    .string()
    .required('Type is required')
    .oneOf(sessionTypes, 'Type can be either a meeting or an event'),

  startDateTime: yup.string().required('Start date is required'),

  endDateTime: yup
    .string()
    .required('End date is required')
    .test('isEndDateAfterStartDate', 'End date cannot be before start date', (_, { parent }) => {
      const { startDateTime, endDateTime } = parent as CreateSessionFormState;

      const startDate = dayjs(startDateTime);
      const endDate = dayjs(endDateTime);

      if (startDate.isValid() && endDate.isValid()) {
        return !startDate.isAfter(endDate);
      }

      return false;
    })
    .test('isValidDateRangeForSessionType', 'Meeting cannot be longer than 24 hours', (_, { parent }) => {
      const { sessionType, startDateTime, endDateTime } = parent as CreateSessionFormState;

      const startDate = dayjs(startDateTime);
      const endDate = dayjs(endDateTime);

      if (!startDate.isValid() && !endDate.isValid()) {
        return false;
      }

      // Meeting can last up to 1 day
      // Event can be set up for more days
      if (sessionType === 'meeting') {
        const durationSec = endDate.diff(startDate, 'second');
        const oneDayInSec = 24 * 60 * 60;
        return durationSec <= oneDayInSec;
      }

      return true;
    }),
});
