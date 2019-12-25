import {Container, Text} from 'native-base';
import React, {useState} from 'react';
import ListContainer from '../../components/molecules/ListContainer';
import ActionFormOrganism from '../../components/organisms/ActionFormOrganism';
import ActionListView from '../../components/organisms/ActionList';
import {Action} from '../../domains/Action';
import {ActionList} from '../../domains/ActionList';
export default () => {
  const [actions, setActions] = useState<ActionList>(new ActionList());

  const addAction = (text: string) => {
    setActions(actions.addAction(text));
  };

  const deleteAction = (action: Action) => {
    setActions(actions.deleteAction(action));
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
