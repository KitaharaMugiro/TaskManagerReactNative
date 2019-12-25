import {Button, Container, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ListContainer from '../../components/molecules/ListContainer';
import FixedActionList from '../../components/organisms/FixedActionList';
import {Action, SelectableAction} from '../../domains/Action';
import {ActionList, SelectableActionList} from '../../domains/ActionList';
export default () => {
  const [selectableActions, setSelectableActions] = useState(
    new SelectableActionList(),
  );

  useEffect(() => {
    const demo: Action[] = [{text: 'hi'}, {text: 'hallo'}, {text: 'world'}];
    const actions = new ActionList();
    actions.actions = demo;
    setSelectableActions(actions.initializeSelectableActions());
  }, []);

  const _onPressCard = (action: SelectableAction) => {
    setSelectableActions(selectableActions.toggleSelect(action));
  };

  const onClickDone = () => {
    const done = () => {
      setSelectableActions(selectableActions.getOnlySelected());
    };

    Alert.alert('本日を開始しますか？', 'あとから変更できません。', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: done},
    ]);
  };

  return (
    <Container>
      <ListContainer>
        <Text>今日やるアクションを選択しよう</Text>
        <FixedActionList
          actions={selectableActions.actions}
          onPressCard={_onPressCard}
        />
        <Button onPress={onClickDone}>
          <Text>選択したActionを今日やる</Text>
        </Button>
      </ListContainer>
    </Container>
  );
};
