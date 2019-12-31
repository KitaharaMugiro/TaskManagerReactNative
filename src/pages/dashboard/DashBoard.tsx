import {Text, Button, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import ListContainer from '../../components/molecules/ListContainer';
import GraphCardList from '../../components/organisms/GraphCardList';
import {ActionDashboardCard} from '../../domains/ActionDashboardCard';
import {ActionDashboardCardList} from '../../domains/ActionDashboardCardList';
import {NavigationStackProp} from 'react-navigation-stack';
import {DashBoardActionUsecase} from '../../usecases/DashBoardActionUsecase';
import {ScrollView} from 'react-native';
import {PageName} from '../../constants/page-names';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/color';
import DashboardActionList from '../../components/organisms/DashboardActionList';
import {DailyTargetActionList} from '../../domains/DailyTargetActionList';
import TodayTargetActionList from '../../components/organisms/TodayTargetActionList';
import {SelectableActionList} from '../../domains/ActionList';
import {DailyTargetActionUsecase} from '../../usecases/DailyTargetActionUsecase';
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

  return (
    <>
      <ScrollView>
        <View style={styles.paddingBottom}>
          <TodayTargetActionList
            actions={todayActions}
            listTitle={'今日やること'}
            onClickCheckout={onClickCheckout}
          />
        </View>

        <DashboardActionList
          listTitle={'やりたいことリスト'}
          actions={actions.actions}
          onClickAddAction={onClickAddAction}
          onClickCard={onClickCard}
        />
      </ScrollView>

      <Button style={styles.floating} onPress={onClickStartToday}>
        <Text>今日を始める</Text>
      </Button>
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
