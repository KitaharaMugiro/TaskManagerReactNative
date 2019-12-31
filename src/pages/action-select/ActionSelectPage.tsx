import {Button, Container, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, ShadowPropTypesIOS} from 'react-native';
import ListContainer from '../../components/molecules/ListContainer';
import FixedActionList from '../../components/organisms/FixedActionList';
import {SelectableActionList} from '../../domains/ActionList';
import {SelectableAction} from '../../domains/types/Action';
import {ActionUsecase} from '../../usecases/ActionUsecase';
import {NavigationStackProp} from 'react-navigation-stack';
import {DailyTargetActionUsecase} from '../../usecases/DailyTargetActionUsecase';
import {DailyTargetActionList} from '../../domains/DailyTargetActionList';

interface Props {
  navigation: NavigationStackProp;
}
export default (props: Props) => {
  const [selectableActions, setSelectableActions] = useState(
    new SelectableActionList(),
  );

  useEffect(() => {
    loadSelectableActions();
  }, []);

  const loadSelectableActions = async () => {
    setSelectableActions(await ActionUsecase.loadSelectableActionList());
  };

  const _onPressCard = (action: SelectableAction) => {
    setSelectableActions(selectableActions.toggleSelect(action));
  };

  const onClickDone = () => {
    const done = () => {
      setSelectableActions(selectableActions.getOnlySelected());
      const todayTargetActions = new DailyTargetActionList(
        selectableActions.getOnlySelected(),
      );
      DailyTargetActionUsecase.setTodayDailyTarget(todayTargetActions);
      props.navigation.goBack();
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
