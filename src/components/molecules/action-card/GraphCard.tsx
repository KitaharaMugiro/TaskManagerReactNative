import {Container, Text} from 'native-base';
import React from 'react';
import NormalActionCard from '../../atoms/action-card/NormalActionCard';
import ActionProgressGraph from '../../atoms/graphs/ActionProgressGraph';
import {TouchableHighlight, TouchableOpacity} from 'react-native';

interface Props {
  text: string;
  ratio: number;
  leftText: string;
  onClickCard: () => void;
}

export default (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onClickCard}>
      <NormalActionCard text={props.text} leftText={props.leftText}>
        <ActionProgressGraph ratio={props.ratio} />
      </NormalActionCard>
    </TouchableOpacity>
  );
};
