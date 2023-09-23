import { Router } from 'express';

export interface IAppRouter {
  createRouter(): Router;
  getPath(): string;
}

export abstract class BaseRouter implements IAppRouter {
  constructor(private path: string) { }

  createRouter(): Router {
    throw new Error('Method not implemented.');
  }

  getPath(): string {
    return this.path;
  }
}
