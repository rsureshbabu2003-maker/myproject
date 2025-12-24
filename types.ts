
export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Stop {
  id: string;
  name: string;
  coordinate: Coordinate;
  eta: string;
}

export interface BusRoute {
  id: string;
  name: string;
  busNumber: string;
  driverName: string;
  path: Coordinate[];
  stops: Stop[];
  status: 'On Time' | 'Delayed' | 'Departed';
}

export interface BusState {
  currentPosition: Coordinate;
  speed: number;
  nextStopId: string;
  lastUpdated: string;
}

export type Page = 'home' | 'login' | 'routes' | 'track' | 'profile';
