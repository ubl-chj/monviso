export * from './state/'

export interface IState {
  error?: Error;
}

export interface IConfig {
  currentImageId?: string;
}

export interface IAnnotations {
  points: IPointAnnotation[];
}
export interface IPointAnnotation {
  sender: string;
  timestamp: number;
  lat: number;
  lng: number;
}
