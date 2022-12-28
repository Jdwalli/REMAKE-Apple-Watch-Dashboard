export interface WorkoutsStatisticsProps {
  WorkoutType: string;
  MaxDuration: number;
  MaxTotalDistance: number;
  MaxTotalEnergyBurned: number;
  MinDuration: number;
  MinTotalDistance: number;
  MinTotalEnergyBurned: number;
}

export interface WorkoutMetadata {
  key: string;
  value: number;
  unit?: string;
}

interface WorkoutEvent {
  date?: string;
  duration?: string;
  durationUnit?: string;
  type?: string;
}

interface WorkoutGPX {
  Latitude: number[] | [];
  Longitude: number[] | [];
  Mapping: GPXMapping[];
  Vitals: GPXVitals[];
  Center: [number, number];
  Zoom: number;
}

export interface GPXMapping {
  course: number;
  elevation: number;
  hAcc: number;
  speed: number;
  time: string;
  vAcc: number;
  [key: string]: any;
}




export interface GPXVitals {
  startDate: string;
  unit: string;
  value: number;
  [key: string]: any;
}

export declare type GPXChartOptions = "Combined" | "Elevation" | "Speed" | "Heart Rate";


export interface Workout {
  workoutActivityType: string;
  MetadataEntry?: WorkoutMetadata[];
  WorkoutEvent?: WorkoutEvent[];
  WorkoutGPX: WorkoutGPX;
  startDate?: string;
  endDate?: string;
  creationDate?: string;
  duration?: number | undefined;
  unit?: string | undefined;
  totalDistance?: number;
  totalDistanceUnit?: string;
  totalEnergyBurned?: number;
  totalEnergyBurnedUnit?: string;
  minimumHeartRate : number | string
  maximumHeartRate : number | string
  averageHeartRate : number | string
  heartRateUnit? : string
}

export const Default: Workout[] = [
  {
    WorkoutGPX: {
      Latitude: [],
      Longitude: [],
      Center: [33.07, 10.59],
      Zoom: 2,
      Mapping: [
        {
          course: 0,
          elevation: 0,
          hAcc: 0,
          speed: 0,
          time: "",
          vAcc: 0,
        },
      ],
      Vitals: [
        {
          startDate: '',
          unit: '',
          value: 0
        },
      ],
    },
    workoutActivityType: "No Workout",
    minimumHeartRate: "",
    maximumHeartRate: '',
    averageHeartRate: ''
  },
];


export const COLORS = {
  Elevation: '#7A7251',
  Speed: '#2C646C'
}
