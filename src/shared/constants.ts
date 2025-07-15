export const HEADER_KEY = {
  LOG_ID: 'X-LOG-ID',
  USER_ID: 'X-USER-ID',
};

export const ERR_CODE = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'.toLowerCase(),
};

export const INJECTION_TOKEN = {
  REDIS_SERVICE: Symbol.for('REDIS_SERVICE'),
};

export const APP_ACTION = {
  HANDLE_EXCEPTION: 'HANDLE_EXCEPTION'.toLowerCase(),
};
