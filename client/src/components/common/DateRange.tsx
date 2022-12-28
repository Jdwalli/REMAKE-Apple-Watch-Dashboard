import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface DateRangeProps {
  componentName: string;
  startDate?: Date;
  endDate?: Date;
  onChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRange: React.FC<DateRangeProps> = ({
  componentName,
  startDate,
  endDate,
  onChange,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    startDate || null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    endDate || null
  );

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(event.target.value);
    setSelectedStartDate(date);
    if (selectedEndDate) {
      onChange(date, selectedEndDate);
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setSelectedEndDate(date);
    if (selectedStartDate) {
      onChange(selectedStartDate, date);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="text-xs uppercase font-bold">{componentName}</div>
      <div className="flex items-center">
        <label className="mr-2">
          <input
            type="date"
            onChange={handleStartDateChange}
            className={
              "first-line:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            value={
              selectedStartDate
                ? selectedStartDate.toISOString().substring(0, 10)
                : ""
            }
            placeholder="Pick a date"
          />
        </label>
        <div className="text-3xl line-height-4">
            <FaArrowRight />
        </div>
        <label className="ml-2">
          <input
            type="date"
            onChange={handleEndDateChange}
            className={
                "first-line:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            value={
              selectedEndDate
                ? selectedEndDate.toISOString().substring(0, 10)
                : ""
            }
          />
        </label>
      </div>
    </div>
  );
};

export default DateRange;
