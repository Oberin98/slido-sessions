import React, { memo } from 'react';

import { SessionType } from '~entities/session';
import DateTimeInput from '~shared/ui/DateTimeInput';
import Input from '~shared/ui/Input';
import Label from '~shared/ui/Label';
import Select from '~shared/ui/Select';

import { FilterSessionsValue } from '../lib/types';

interface SessionsFilterProps {
  value?: FilterSessionsValue;
  onChange?: (v: FilterSessionsValue) => void;
  className?: string;
}

function SessionsFilter({ value, onChange, className }: SessionsFilterProps) {
  const handleQueryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, query: ev.currentTarget.value });
  };

  const handleTypeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.({ ...value, sessionType: ev.currentTarget.value as SessionType });
  };

  const handleDateChange = (value: Date, ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, [ev.currentTarget.name]: value } as FilterSessionsValue);
  };

  return (
    <article className={className}>
      <h2>Search sessions</h2>

      <div>
        <Label htmlFor="session-title-input">Filter by session title:</Label>
      </div>
      <div>
        <Input
          id="session-title-input"
          type="text"
          name="query"
          placeholder="Search sessions..."
          value={value?.query}
          onChange={handleQueryChange}
        />
      </div>

      <div>
        <Label htmlFor="session-type-select">Filter by session type:</Label>
      </div>
      <div>
        <Select id="session-type-select" name="sessionType" value={value?.sessionType} onChange={handleTypeChange}>
          <option value="">No filter</option>
          <option value="meeting">Meeting</option>
          <option value="event">Event</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="start-date-gte-input">From:</Label>
      </div>
      <div>
        <DateTimeInput
          id="start-date-gte-input"
          name="startDateGte"
          value={value?.startDateGte}
          onChange={handleDateChange}
        />
      </div>

      <div>
        <Label htmlFor="end-date-lte-input">To:</Label>
      </div>
      <div>
        <DateTimeInput
          id="end-date-lte-input"
          name="endDateLte"
          value={value?.endDateLte}
          onChange={handleDateChange}
        />
      </div>
    </article>
  );
}

export default memo(SessionsFilter);
