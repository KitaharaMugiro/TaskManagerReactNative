import {Container, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import ListContainer from '../../components/molecules/ListContainer';
import ActionFormOrganism from '../../components/organisms/ActionFormOrganism';
import ActionListView from '../../components/organisms/DeletableActionList';
import {ActionList} from '../../domains/ActionList';
import {Action} from '../../domains/types/Action';
import {ActionUsecase} from '../../usecases/ActionUsecase';
import {Button} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
const HomeScreen = () => {
  const [actions, setActions] = useState<ActionList>(new ActionList([]));

  useEffect(() => {
    loadAction();
  }, []);

  const loadAction = async () => {
    setActions(await ActionUsecase.loadActionList());
  };

  const addAction = async (title: string) => {
    setActions(await ActionUsecase.addAction(actions, title));
  };

  const deleteAction = async (action: Action) => {
    setActions(await ActionUsecase.deleteAciton(actions, action));
  };

  return (
    <Container>
      <ListContainer>
        <Text>Actions</Text>
        <ActionListView
          actions={actions.actions}
          onClickDelete={deleteAction}
        />
        <ActionFormOrganism addAction={addAction} />
      </ListContainer>
    </Container>
  );
};

HomeScreen.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  return {
    title: 'アクション編集',
  };
};

export default HomeScreen;
