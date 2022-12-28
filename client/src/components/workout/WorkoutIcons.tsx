import {
  FaWalking,
  FaRunning,
  FaBiking,
  FaSwimmer,
  FaHiking,
  FaWheelchair,
  FaBed,
  FaClock,
  FaFire,
  FaMapMarkerAlt,
  FaThermometerHalf,
  FaSuperpowers,
  FaHandHoldingWater,
  FaMountain,
  FaHeart,
} from "react-icons/fa";


export const WorkoutIconMapping = {
  Duration: <FaClock className="text-5xl rounded-full bg-green-500 p-2" />,
  Distance: (
    <FaMapMarkerAlt className="text-5xl rounded-full bg-purple-500 p-2" />
  ),
  Calories: <FaFire className="text-5xl rounded-full bg-orange-500 p-2" />,
  "Elevation Ascended": (
    <FaMountain className="text-5xl rounded-full bg-green-300 p-2" />
  ),
  "Weather Temperature": (
    <FaThermometerHalf className="text-5xl rounded-full bg-blue-300 p-2" />
  ),
  "Weather Humidity": (
    <FaHandHoldingWater className="text-5xl rounded-full bg-blue-500 p-2" />
  ),
  "Average ME Ts": (
    <FaSuperpowers className="text-5xl rounded-full bg-yellow-500 p-2" />
  ),
  Heart: <FaHeart className="text-5xl rounded-full bg-red-500 p-2" />,
  Walking: <FaWalking />,
  Running: <FaRunning />,
  Cycling: <FaBiking />,
  Elliptical: "",
  Rower: "",
  Swim: <FaSwimmer />,
  Hiking: <FaHiking />,
  WheelChair: <FaWheelchair />,
  "High Intensity Interval Training": "",
  Dance: "",
  "Cardio Dance": "",
  "Preparation And Recovery": <FaBed />,
  "Stair Climbing": "",
};
