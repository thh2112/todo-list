import { Request } from 'express';
import { QueryRunner } from 'typeorm';

export interface AppRequest extends Request {
  startTime: Date;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  code?: string;
}

export interface PaginationResult<T = any> {
  rows: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface AppRequest extends Request {
  id: string;
  user: any;
}

export interface ContractCallData {
  functionName: string;
}

export interface RunnerUser {
  alias: string;
  runner: QueryRunner;
}

export interface ExternalUserProfile {
  userId: string;
  userWalletAddress: string;
  userSource: string;
  username: string;
  email: string;
  fullName: string;
}
