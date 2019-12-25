import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, ScrollView} from 'react-native';
import ActionCard from '../atoms/action-card/DeletableActionCard';
import {Action} from '../../domains/Action';

interface Props {
  actions: Action[];
  onClickDelete: (action: Action) => void;
}

export default (props: Props) => {
  const _renderItem = (item: Action, key: any) => {
    return (
      <ActionCard
        text={item.text}
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
