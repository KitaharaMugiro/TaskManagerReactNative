import {Button, Text} from 'native-base';
import React from 'react';
import ListContainer from '../molecules/ListContainer';
import GraphCardList from './GraphCardList';
import {ActionDashboardCard} from '../../domains/ActionDashboardCard';
interface Props {
  listTitle: string;
  actions: ActionDashboardCard[];
  onClickCard: (action: ActionDashboardCard) => void;
  onClickAddAction: () => void;
}
export default (props: Props) => {
  const onClickCard = (action: ActionDashboardCard) => {
    props.onClickCard(action);
  };

  const onClickAddAction = () => {
    props.onClickAddAction();
  };
  return (
    <ListContainer>
      <Text>{props.listTitle}</Text>
      <GraphCardList actions={props.actions} onClickCard={onClickCard} />
      <Button onPress={onClickAddAction}>
        <Text>追加</Text>
      </Button>
    </ListContainer>
  );
};
