import { CreateSessionInputDTO, UpdateSessionInputDTO, SessionDTO } from './types';
import { CreateSessionBody, UpdateSessionBody, SessionObj } from '../../api';

/**
 * Formats a session coming from the API into a session DTO
 * @example
 * startDateTime (timestamp in sec -> Date)
 * endDateTime (timestamp in sec -> Date)
 */
export function formatSessionForStore(session: SessionObj): SessionDTO {
  return {
    ...session,
    startDateTime: new Date(session.startDateTime * 1000),
    endDateTime: new Date(session.endDateTime * 1000),
  };
}

/**
 * Formats create input DTO into create request body for API
 * @example
 * startDateTime (Date -> timestamp in sec)
 * endDateTime (Date -> timestamp in sec)
 */
export function formatCreateInputForAPI(input: CreateSessionInputDTO): CreateSessionBody {
  return {
    ...input,
    startDateTime: input.startDateTime.getTime() / 1000,
    endDateTime: input.endDateTime.getTime() / 1000,
  };
}

/**
 * Formats update input DTO into update request body for API
 * @example
 * startDateTime (Date -> timestamp in sec)
 * endDateTime (Date -> timestamp in sec)
 */
export function formatUpdateInputForAPI(input: UpdateSessionInputDTO): UpdateSessionBody {
  return {
    ...input,
    ...(input.startDateTime && { startDateTime: input.startDateTime.getTime() / 1000 }),
    ...(input.endDateTime && { endDateTime: input.endDateTime.getTime() / 1000 }),
  } as UpdateSessionBody;
}
