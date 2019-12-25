//import 'babel-polyfill';
import React from 'react';
import {View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';

interface Props {
  width: number;
  height: number;
  ratio: number;
}

export default (props: Props) => {
  const data = {
    labels: [],
    data: [props.ratio || 0],
  };
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.1,
    labelColor: () => 'black',
  };
  return (
    <View>
      <ProgressChart
        data={data}
        width={props.width || 100}
        height={props.height || 100}
        chartConfig={chartConfig}
        hideLegend={true}
      />
    </View>
  );
};
