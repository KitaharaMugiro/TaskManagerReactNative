import {Button, Container, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import ListContainer from '../../components/molecules/ListContainer';
import FixedActionList from '../../components/organisms/FixedActionList';
import {ActionList, SelectableActionList} from '../../domains/ActionList';
import {SelectableAction} from '../../domains/types/Action';
import {ActionUsecase} from '../../usecases/ActionUsecase';
import {DailyTargetActionUsecase} from '../../usecases/DailyTargetActionUsecase';
import {ProgressUsecase} from '../../usecases/ProgressUsecase';
export default () => {
  const [selectableActions, setSelectableActions] = useState<
    SelectableActionList
  >(new SelectableActionList());

  useEffect(() => {
    loadTodayTargetActions();
  }, []);

  const loadTodayTargetActions = async () => {
    const actions = await DailyTargetActionUsecase.loadTodayDailyTargetList();
    setSelectableActions(actions.actionList);
  };

  const _onPressCard = (action: SelectableAction) => {
    setSelectableActions(selectableActions.toggleSelect(action));
  };

  const onClickDone = () => {
    const done = () => {
      const doneActions = selectableActions.getOnlySelected();
      setSelectableActions(doneActions);
      ProgressUsecase.incrementProgress(doneActions.getIds());
      DailyTargetActionUsecase.deleteTodayTarget();
    };

    Alert.alert('本日を終了しますか？', 'あとから変更できません。', [
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
        <Text>今日やったアクションを選択しよう</Text>
        <FixedActionList
          actions={selectableActions.actions}
          onPressCard={_onPressCard}
        />
      </ListContainer>
      <View style={styles.footer}>
        <View style={styles.container}>
          <Button onPress={onClickDone}>
            <Text>本日を終了する</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
});
