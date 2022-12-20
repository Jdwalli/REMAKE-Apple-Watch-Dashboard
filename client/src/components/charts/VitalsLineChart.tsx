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
import { Vitals } from "../../types/Vitals";

interface Props {
  data: Vitals[];
  vitalType: string
}

type GraphProps = Props & XYChartProps;

interface Accessors {
  startDate: Accessor;
  value: Accessor;
}


type DataType = "startDate" | "value";
type Accessor = (d: Vitals) => number | string;
type DataKey = keyof Accessors;
type annotationDataKey = DataKey | null;

const VitalsLineChart: FunctionComponent<GraphProps> = (props: GraphProps) => {
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

  const getTime = (d: Vitals) => convertTimestamp(d.startDate);
  const getValue = (d: Vitals) => Number(d.value);
  const vitalsUnit = props.data.length > 0 ?  props.data[0].unit : ''


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
        startDate: getTime,
      },
      y: {
        value: getValue,
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
        setAnnotationDataKey(d.key as "startDate" | "value");
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

            <LineSeries
              dataKey="startDate"
              data={props.data}
              xAccessor={accessors.x.startDate}
              yAccessor={accessors.y.value}
              curve={curveLinear}
            />



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
      {/* {annotationDataKey && props.data[annotationDataIndex] && (
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
      )} */}
      {/* {
        <Tooltip<GPXMapping>
          showHorizontalCrosshair={false}
          showVerticalCrosshair={true}
          snapTooltipToDatumX={true}
          snapTooltipToDatumY={true}
          showSeriesGlyphs={sharedTooltip}
          renderTooltip={({ tooltipData, colorScale }) => (
            <>
              {(tooltipData?.nearestDatum?.datum &&
                accessors.time(tooltipData?.nearestDatum?.datum)) ||
                "No time"}
              <br />
              <br />
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
                      : `${graphData} `}
                  </div>
                );
              })}
            </>
          )}
        />
      } */}
    </XYChart>
  );
};

export default VitalsLineChart;
