import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DailyNotification from '../domains/DailyNotification';
import ActionDetailUpdatePage from './action-detail-update/ActionDetailUpdatePage';
import DashBoard from './dashboard/DashBoard';
import TopPage from './top/TopPage';
import ActionRegisterPage from './action-register/ActionRegisterPage';
import {PageName} from '../constants/page-names';
import ActionSelectPage from './action-select/ActionSelectPage';
import ActionReflectPage from './action-reflect/ActionReflectPage';
const AppNavigator = createStackNavigator(
  {
    [PageName.Home]: TopPage,
    [PageName.DashBoard]: DashBoard,
    [PageName.ActionDetailUpdate]: ActionDetailUpdatePage,
    [PageName.ActionRegister]: ActionRegisterPage,
    [PageName.ActionSelect]: ActionSelectPage,
    [PageName.ActionReflect]: ActionReflectPage,
  },
  {
    initialRouteName: PageName.DashBoard,
  },
);
const AppContainer = createAppContainer(AppNavigator);

export default () => {
  DailyNotification(this, this);
  return (
    <>
      <AppContainer />
    </>
  );
};
