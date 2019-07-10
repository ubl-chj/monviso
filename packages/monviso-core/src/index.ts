export * from './state/'

export interface IState {
  error?: Error;
}

export interface IConfig {
  currentImageId?: string;
}

export interface IAnnotations {
  pointAnnotations: IPointAnnotation[];
}
export interface IPointAnnotation {
  timestamp: number;
  lat: number;
  lng: number;
}
