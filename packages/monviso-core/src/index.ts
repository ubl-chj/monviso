export * from './state/'

export interface State {
  error?: Error;
}

export interface IConfig {
  currentImageId?: string
}
