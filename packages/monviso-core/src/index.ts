export * from './state/'

export interface IState {
  error?: Error;
}

export interface IConfig {
  currentImageId?: string;
}
