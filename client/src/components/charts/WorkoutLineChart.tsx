import React, { FunctionComponent, useState, useMemo } from "react";
import { darkTheme, XYChartTheme } from "@visx/xychart";
import CustomChartBackground from "./CustomChartBackground";
import { AnimationTrajectory } from "@visx/react-spring/lib/types";
import { curveLinear, curveStep, curveCardinal } from "@visx/curve";
import { convertTimestamp } from "../../helpers/Formats";
import {
  AnimatedAnnotation,
  AnimatedAxis,
  AnimatedGrid,
  Grid,
  AnimatedLineSeries,
  AreaSeries,
  LineSeries,
  AnnotationCircleSubject,
  AnnotationConnector,
  AnnotationLabel,
  Tooltip,
  XYChart,
} from "@visx/xychart";

import { XYChartProps, setAnnotationLabelPosition } from "../../types/Graphing";
import { GPXChartOptions, GPXMapping } from "../../types/Workout";

interface Props {
  data: GPXMapping[];
  filter: GPXChartOptions;
}

type GraphProps = Props & XYChartProps;

interface Accessors {
  elevation: Accessor;
  speed: Accessor;
}

const UNITS = {
  Elevation: "m",
  Speed: "m/s",
};

type DataType = "Elevation" | "Speed";
type Accessor = (d: GPXMapping) => number | string;
type DataKey = keyof Accessors;
type annotationDataKey = DataKey | null;

const WorkoutLineChart: FunctionComponent<GraphProps> = (props: GraphProps) => {
  const [animationTrajectory, setAnimationTrajectory] = useState<AnimationTrajectory | undefined>("center");
  const [sharedTooltip, setSharedTooltip] = useState(true);
  const [annotationDataKey, setAnnotationDataKey] =
    useState<annotationDataKey>(null);
  const [annotationDataIndex, setAnnotationDataIndex] = useState(13);

  const [annotationLabelPosition, setAnnotationLabelPosition] = useState({
    dx: -40,
    dy: -20,
  });

  
  const dateScaleConfig = { type: "band", paddingInner: 0.3 } as const;
  const valueScaleConfig = { type: "linear" } as const;

  const getTime = (d: GPXMapping) => convertTimestamp(d.time);
  const getElevation = (d: GPXMapping) => Number(d.elevation);
  const getSpeed = (d: GPXMapping) => Number(d.speed);


  const config = useMemo(
    () => ({
      x: dateScaleConfig,
      y: valueScaleConfig,
    }),
    []
  );

  const accessors = useMemo(
    () => ({
      x: {
        Elevation: getTime,
        Speed: getTime,
      },
      y: {
        Elevation: getElevation,
        Speed: getSpeed,
      },
      time: getTime,
    }),
    []
  );

  return (
    <XYChart
      theme={darkTheme}
      xScale={config.x}
      yScale={config.y}
      height={Math.min(400, props.height)}
      captureEvents={true}
      onPointerUp={(d) => {
        setAnnotationDataKey(d.key as "speed" | "elevation");
        setAnnotationDataIndex(d.index);
      }}
    >
      <CustomChartBackground />
      <Grid
        key={`grid-${animationTrajectory}`}
        rows={true}
        columns={true}
        // animationTrajectory={animationTrajectory}
        numTicks={4}
      />

      {props.filter === "Combined" && (
        <>
            <LineSeries
              dataKey="Elevation"
              data={props.data}
              xAccessor={accessors.x.Elevation}
              yAccessor={accessors.y.Elevation}
              curve={curveLinear}
            />

            <LineSeries
              dataKey="Speed"
              data={props.data}
              xAccessor={accessors.x.Speed}
              yAccessor={accessors.y.Speed}
              curve={curveLinear}
            />
        </>
      )}

      {props.filter === "Speed" && (
        <>
          <AreaSeries
            dataKey="Speed"
            data={props.data}
            xAccessor={accessors.x.Speed}
            yAccessor={accessors.y.Speed}
            curve={curveLinear}
          />
        </>
      )}

      {props.filter === "Elevation" && (
        <>
          <AreaSeries 
            dataKey="Elevation"
            data={props.data}
            xAccessor={accessors.x.Elevation}
            yAccessor={accessors.y.Elevation}
            curve={curveLinear}
          />
        </>
      )}

      <AnimatedAxis
        key={`time-axis-${animationTrajectory}`}
        orientation={"bottom"}
        numTicks={4}
        animationTrajectory={animationTrajectory}
      />
      <AnimatedAxis
        key={`value-axis-${animationTrajectory}`}
        orientation={"right"}
        numTicks={4}
        animationTrajectory={"center"}
      />
      {annotationDataKey && props.data[annotationDataIndex] && (
        <AnimatedAnnotation
          dataKey={annotationDataKey}
          datum={props.data[annotationDataIndex]}
          dx={annotationLabelPosition.dx}
          dy={annotationLabelPosition.dy}
          editable={false}
          canEditSubject={false}
          onDragEnd={({ dx, dy }) => setAnnotationLabelPosition({ dx, dy })}
        >
          <AnnotationConnector />
          <AnnotationCircleSubject />
          <AnnotationLabel
            title={annotationDataKey}
            subtitle={`${convertTimestamp(
              props.data[annotationDataIndex].time
            )}, ${props.data[annotationDataIndex][`${annotationDataKey.toLowerCase()}`]}`}
            width={135}
            backgroundProps={{
              stroke: darkTheme.gridStyles.stroke,
              strokeOpacity: 0.5,
              fillOpacity: 0.8,
            }}
          />
        </AnimatedAnnotation>
      )}
      {
        <Tooltip<GPXMapping>
          showHorizontalCrosshair={false}
          showVerticalCrosshair={true}
          snapTooltipToDatumX={true}
          snapTooltipToDatumY={true}
          showSeriesGlyphs={sharedTooltip}
          renderTooltip={({ tooltipData, colorScale }) => (
            <>
              {/* Time  */}
              {(tooltipData?.nearestDatum?.datum &&
                accessors.time(tooltipData?.nearestDatum?.datum)) ||
                "No time"}
              <br />
              <br />
              {/* Value */}
              {(
                (sharedTooltip
                  ? Object.keys(tooltipData?.datumByKey ?? {})
                  : [tooltipData?.nearestDatum?.key]
                ).filter((type) => type) as DataType[]
              ).map((type) => {
                const graphData =
                  tooltipData?.nearestDatum?.datum &&
                  accessors["y"][type](tooltipData?.nearestDatum?.datum);

                return (
                  <div key={type}>
                    <em
                      style={{
                        color: colorScale?.(type),
                        textDecoration:
                          tooltipData?.nearestDatum?.key === type
                            ? "underline"
                            : undefined,
                      }}
                    >
                      {type}
                    </em>{" "}
                    {graphData == null || Number.isNaN(graphData)
                      ? ""
                      : `${graphData} ${UNITS[type]}`}
                  </div>
                );
              })}
            </>
          )}
        />
      }
    </XYChart>
  );
};

export default WorkoutLineChart;
