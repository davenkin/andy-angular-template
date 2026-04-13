export interface Environment {
  development: boolean;
  production: boolean;
  apiHost: string;
  keycloakUrl: string;
}

export interface StandardApiError {
  code: string;
  message: string;
  userMessage: string;
  status: number;
  path: string;
  timestamp: string;
  traceId: string;
  data: any;
}

export interface CurrentOrg {
  id: string;
  name: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

export interface Option {
  value: string;
  label: string;
}

export enum OsType {
  WINDOWS = 'WINDOWS',
  LINUX = 'LINUX',
  ANDROID = 'ANDROID',
  MACOS = 'MACOS',
}

export enum CpuArchitecture {
  X86 = 'X86',
  X86_64 = 'X86_64',
  ARM = 'ARM',
  ARM_64 = 'ARM_64',
}
