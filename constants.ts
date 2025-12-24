
import { BusRoute } from './types';

export const DINDIGUL_CENTER = { lat: 10.3673, lng: 77.9803 };

// Simulated paths for routes
const generatePath = (start: {lat: number, lng: number}, end: {lat: number, lng: number}, steps: number = 20) => {
  const path = [];
  for (let i = 0; i <= steps; i++) {
    path.push({
      lat: start.lat + (end.lat - start.lat) * (i / steps),
      lng: start.lng + (end.lng - start.lng) * (i / steps),
    });
  }
  return path;
};

export const MOCK_ROUTES: BusRoute[] = [
  {
    id: 'R1',
    name: 'Dindigul ↔ Madurai',
    busNumber: 'TN-57-N-1234',
    driverName: 'S. Muthu',
    status: 'On Time',
    path: generatePath(DINDIGUL_CENTER, { lat: 9.9252, lng: 78.1198 }),
    stops: [
      { id: 's1', name: 'Dindigul Central', coordinate: DINDIGUL_CENTER, eta: '10:00 AM' },
      { id: 's2', name: 'Chinnalapatti', coordinate: { lat: 10.2647, lng: 77.9351 }, eta: '10:20 AM' },
      { id: 's3', name: 'Kodai Road', coordinate: { lat: 10.1554, lng: 77.8724 }, eta: '10:45 AM' },
      { id: 's4', name: 'Madurai Periyar', coordinate: { lat: 9.9252, lng: 78.1198 }, eta: '11:30 AM' },
    ]
  },
  {
    id: 'R2',
    name: 'Dindigul ↔ Palani',
    busNumber: 'TN-57-N-5678',
    driverName: 'K. Rajan',
    status: 'Delayed',
    path: generatePath(DINDIGUL_CENTER, { lat: 10.4501, lng: 77.5197 }),
    stops: [
      { id: 'p1', name: 'Dindigul Central', coordinate: DINDIGUL_CENTER, eta: '09:00 AM' },
      { id: 'p2', name: 'Reddiarchatram', coordinate: { lat: 10.4182, lng: 77.8541 }, eta: '09:25 AM' },
      { id: 'p3', name: 'Oddanchatram', coordinate: { lat: 10.4851, lng: 77.7471 }, eta: '10:00 AM' },
      { id: 'p4', name: 'Palani Bus Stand', coordinate: { lat: 10.4501, lng: 77.5197 }, eta: '10:45 AM' },
    ]
  },
  {
    id: 'R3',
    name: 'Dindigul ↔ Kodaikanal',
    busNumber: 'TN-57-N-9988',
    driverName: 'M. Palani',
    status: 'On Time',
    path: generatePath(DINDIGUL_CENTER, { lat: 10.2381, lng: 77.4892 }),
    stops: [
      { id: 'k1', name: 'Dindigul Central', coordinate: DINDIGUL_CENTER, eta: '07:00 AM' },
      { id: 'k2', name: 'Batlagundu', coordinate: { lat: 10.1584, lng: 77.7654 }, eta: '07:45 AM' },
      { id: 'k3', name: 'Silver Cascade', coordinate: { lat: 10.2381, lng: 77.5122 }, eta: '09:00 AM' },
      { id: 'k4', name: 'Kodai Lake', coordinate: { lat: 10.2381, lng: 77.4892 }, eta: '09:15 AM' },
    ]
  }
];
