import * as libenvironment from "./environment"

export interface Environment {
  production: boolean;
  platformUrl: string;
  fileUrl: string;
  xmlRoot: string;
  ws: string;
}

export const environment: Environment = libenvironment;
