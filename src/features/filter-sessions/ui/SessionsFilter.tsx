import React, { memo } from 'react';

import { FilterSessionsValue } from '../lib/types';

interface SessionsFilterProps {
  value?: FilterSessionsValue;
  onChange?: (v: FilterSessionsValue) => void;
  className?: string;
}

function SessionsFilter({ value, onChange, className }: SessionsFilterProps) {
  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, [ev.currentTarget.name]: ev.currentTarget.value });
  };

  const handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.({ ...value, [ev.currentTarget.name]: ev.currentTarget.value });
  };

  return (
    <article className={className}>
      <h2>Search sessions</h2>

      <div>
        <input
          type="text"
          name="query"
          placeholder="Search sessions..."
          value={value?.query}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="session-type-select">Filter by session type:</label>

        <select id="session-type-select" name="sessionType" value={value?.sessionType} onChange={handleSelectChange}>
          <option value="">No filter</option>
          <option value="meeting">Meeting</option>
          <option value="event">Event</option>
        </select>
      </div>

      <div>
        <label htmlFor="start-date-gte-input">From:</label>

        <input
          id="start-date-gte-input"
          name="startDateGte"
          type="datetime-local"
          value={value?.startDateGte}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="end-date-lte-input">To:</label>

        <input
          id="end-date-lte-input"
          name="endDateLte"
          type="datetime-local"
          value={value?.endDateLte}
          onChange={handleInputChange}
        />
      </div>
    </article>
  );
}

export default memo(SessionsFilter);
