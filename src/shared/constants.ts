export const HEADER_KEY = {
  LOG_ID: 'X-LOG-ID',
  USER_ID: 'X-USER-ID',
};

export const ERR_CODE = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'.toLowerCase(),
  BAD_REQUEST: 'BAD_REQUEST'.toLowerCase(),
  UNAUTHORIZED: 'UNAUTHORIZED'.toLowerCase(),
  FORBIDDEN: 'FORBIDDEN'.toLowerCase(),
  NOT_FOUND: 'NOT_FOUND'.toLowerCase(),
  CONFLICT: 'CONFLICT'.toLowerCase(),
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY'.toLowerCase(),
  ALREADY_EXISTS: 'ALREADY_EXISTS'.toLowerCase(),
  ALREADY_PROJECT_EXISTS: 'ALREADY_PROJECT_EXISTS'.toLowerCase(),
  ALREADY_TASK_EXISTS: 'ALREADY_TASK_EXISTS'.toLowerCase(),
};

export const INJECTION_TOKEN = {
  REDIS_SERVICE: Symbol.for('REDIS_SERVICE'),
};

export const APP_ACTION = {
  HANDLE_EXCEPTION: 'HANDLE_EXCEPTION'.toLowerCase(),
};

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export const ENV_KEY = {
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRATION: 'JWT_EXPIRATION',
  JWT_REFRESH_EXPIRATION: 'JWT_REFRESH_EXPIRATION',
  JWT_ISSUER: 'JWT_ISSUER',
  JWT_AUDIENCE: 'JWT_AUDIENCE',
};

export enum PROJECT_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export enum TASK_STATUS {
  TO_DO = 'to_do',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
