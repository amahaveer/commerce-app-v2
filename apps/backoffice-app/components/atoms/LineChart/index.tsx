import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { ILineChartPropType } from './type';

export default function LineChartComponent(props: ILineChartPropType) {

  const { xAxis, yAxis } = props;
  
  return (
    <LineChart
      xAxis={[{ data: xAxis, scaleType: 'point', }]}
      series={[
        {
          data: yAxis,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
