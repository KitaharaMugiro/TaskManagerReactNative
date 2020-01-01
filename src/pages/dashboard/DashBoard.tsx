import {Button, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import DashboardActionList from '../../components/organisms/DashboardActionList';
import TodayTargetActionList from '../../components/organisms/TodayTargetActionList';
import {colors} from '../../constants/color';
import {PageName} from '../../constants/page-names';
import {ActionDashboardCard} from '../../domains/ActionDashboardCard';
import {ActionDashboardCardList} from '../../domains/ActionDashboardCardList';
import {SelectableActionList} from '../../domains/ActionList';
import {DailyTargetActionList} from '../../domains/DailyTargetActionList';
import {DailyTargetActionUsecase} from '../../usecases/DailyTargetActionUsecase';
import {DashBoardActionUsecase} from '../../usecases/DashBoardActionUsecase';
interface Props {
  navigation: NavigationStackProp;
}
export default (props: Props) => {
  const [actions, setActions] = useState(new ActionDashboardCardList([]));
  const [todayActions, setTodayActions] = useState(
    new DailyTargetActionList(new SelectableActionList()),
  );

  useEffect(() => {
    loadDashBoardAction();
    loadTodayTargetAction();
  }, []);

  const loadDashBoardAction = async () => {
    const actions = await DashBoardActionUsecase.loadList();
    setActions(actions);
  };

  const loadTodayTargetAction = async () => {
    const actions = await DailyTargetActionUsecase.loadTodayDailyTargetList();
    setTodayActions(actions);
  };

  const onClickCard = (action: ActionDashboardCard) => {
    props.navigation.push(PageName.ActionDetailUpdate, {id: action.getId()});
    props.navigation.addListener('willFocus', () => {
      loadDashBoardAction();
    });
  };

  const onClickAddAction = () => {
    props.navigation.push(PageName.ActionRegister);
    props.navigation.addListener('willFocus', () => {
      loadDashBoardAction();
    });
  };

  const onClickStartToday = () => {
    props.navigation.push(PageName.ActionSelect);
    props.navigation.addListener('didFocus', () => {
      loadTodayTargetAction();
    });
  };

  const onClickCheckout = () => {
    props.navigation.push(PageName.ActionReflect);
  };

  const renderTargetActionList = () => {
    if (todayActions.isEmpty()) return;
    return (
      <View style={styles.paddingBottom}>
        <TodayTargetActionList
          actions={todayActions}
          listTitle={'今日やること'}
          onClickCheckout={onClickCheckout}
        />
      </View>
    );
  };

  const renderStartTodayButton = () => {
    if (actions.isEmpty()) return;
    return (
      <Button style={styles.floating} onPress={onClickStartToday}>
        <Text>今日を始める</Text>
      </Button>
    );
  };

  return (
    <>
      <ScrollView>
        {renderTargetActionList()}

        <DashboardActionList
          listTitle={'やりたいことリスト'}
          actions={actions.actions}
          onClickAddAction={onClickAddAction}
          onClickCard={onClickCard}
        />
      </ScrollView>

      {renderStartTodayButton()}
    </>
  );
};

const styles = StyleSheet.create({
  paddingBottom: {
    paddingBottom: 20,
  },
  floating: {
    position: 'absolute',
    backgroundColor: colors.blue,
    bottom: 30,
    right: 10,
    left: 10,
  },
});
