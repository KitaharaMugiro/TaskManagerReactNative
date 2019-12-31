import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Action} from '../../domains/types/Action';
import ActionCard from '../atoms/action-card/DeletableActionCard';
import NormalActionCard from '../atoms/action-card/NormalActionCard';

interface Props {
  actions: Action[];
}

export default (props: Props) => {
  const _renderItem = (item: Action, key: any) => {
    return (
      <NormalActionCard text={item.title} leftText="" key={key}>
        <></>
      </NormalActionCard>
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
