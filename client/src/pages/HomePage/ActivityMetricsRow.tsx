import React, { useState, useEffect, FunctionComponent } from "react";
import { MetricCard } from "../../components/common/MetricCard";
import { RecordsRequest } from "../../helpers/DataRequests";

interface MetricCardProps {
  metricName: string;
  value: number;
  metricText: string;
  change: number;
  className?: string;
}

const ActivityMetricsRow: FunctionComponent = (props) => {
  const [totalCards, setTotalCards] = useState<number>(5);
  const [MetricCards, setMetricCards] = useState<MetricCardProps[]>([]);

  useEffect(() => {
    RecordsRequest("records", "HomeStatistics").then((response) => {
      if (response) {
        const workoutEvents = response as MetricCardProps[];
        setTotalCards(workoutEvents.length);
        console.log(workoutEvents.length)
        console.log(typeof(workoutEvents), workoutEvents)
        setMetricCards(workoutEvents);
      }
    });
  }, []);

  return (
    <div className={`grid grid-cols-${totalCards} gap-2`}>
      {MetricCards.map((card) => {
        return (
          <MetricCard
            metricName={card.metricName}
            value={card.value}
            metricText={card.metricText}
            change={card.change}
          />
        );
      })}
    </div>
  );
};

export default ActivityMetricsRow;
