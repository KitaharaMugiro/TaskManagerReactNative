import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Action} from '../../domains/types/Action';
import GraphCard from '../molecules/action-card/GraphCard';
import {ActionDashboardCard} from '../../domains/ActionDashboardCard';

interface Props {
  actions: ActionDashboardCard[];
  onClickCard: (action: ActionDashboardCard) => void;
}

export default (props: Props) => {
  const _renderItem = (item: ActionDashboardCard, key: any) => {
    return (
      <GraphCard
        text={item.action.title}
        leftText={item.displaySuccessiveDays()}
        ratio={item.getProgressRate()}
        onClickCard={() => props.onClickCard(item)}
        key={key}
      />
    );
  };

  return (
    <View style={styles.container}>
      {props.actions.map((d, index) => _renderItem(d, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
});
