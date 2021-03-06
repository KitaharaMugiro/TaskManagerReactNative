import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectableActionCard from '../atoms/action-card/SelectableActionCard';
import {SelectableAction} from '../../domains/types/Action';

interface Props {
  actions: SelectableAction[];
  onPressCard: (action: SelectableAction) => void;
}

export default (props: Props) => {
  const _renderItem = (item: SelectableAction, key: any) => {
    return (
      <SelectableActionCard
        text={item.title}
        selected={item.selected}
        key={key}
        onPressCard={() => props.onPressCard(item)}
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
    paddingTop: 22,
  },
});
