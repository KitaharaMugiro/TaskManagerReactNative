import {Button, Text} from 'native-base';
import React from 'react';
import {Action} from '../../domains/types/Action';
import ListContainer from '../molecules/ListContainer';
import NormalActionList from './NormalActionList';
import {DailyTargetActionList} from '../../domains/DailyTargetActionList';
interface Props {
  listTitle: string;
  actions: DailyTargetActionList;
  onClickCheckout: () => void;
}

export default (props: Props) => {
  const onClickCheckout = () => {
    props.onClickCheckout();
  };

  return (
    <ListContainer>
      <Text>{props.listTitle}</Text>
      <NormalActionList actions={props.actions.getActions()} />
      <Button onPress={onClickCheckout}>
        <Text>やったことをチェックする</Text>
      </Button>
    </ListContainer>
  );
};
