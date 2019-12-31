import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Action} from '../../domains/types/Action';
import ActionCard from '../atoms/action-card/DeletableActionCard';

interface Props {
  actions: Action[];
  onClickDelete: (action: Action) => void;
}

export default (props: Props) => {
  const _renderItem = (item: Action, key: any) => {
    return (
      <ActionCard
        text={item.title}
        key={key}
        onClickDelete={() => props.onClickDelete(item)}
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
