import {
    FaHome,
    FaRunning,
    FaHeartbeat,
    FaDumbbell,
    FaBed,
    FaChartPie,
  } from "react-icons/fa";
  
  export const SidebarData = [
    {
      title: "Home",
      link: "/",
      icon: <FaHome />,
    },
    {
      title: "Activity",
      link: "/activity",
      icon: <FaRunning />,
    },
    {
      title: "Vitals",
      link: "/vitals",
      icon: <FaHeartbeat />,
    },
    {
      title: "Workouts",
      link: "/workouts",
      icon: <FaDumbbell />,
    },
    {
      title: "Sleep",
      link: "/sleep",
      icon: <FaBed />,
    },
    {
      title: "Reports",
      link: "/reports",
      icon: <FaChartPie />,
    },
  ];
  