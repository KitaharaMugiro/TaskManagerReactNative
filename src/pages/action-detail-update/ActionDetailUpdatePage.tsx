import {Form, Input, Item, Label, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {ActionDashboardCard} from '../../domains/ActionDashboardCard';
import {DashBoardActionUsecase} from '../../usecases/DashBoardActionUsecase';
interface Props {
  navigation: NavigationStackProp;
}
export default (props: Props) => {
  const [action, setAction] = useState<ActionDashboardCard>();

  useEffect(() => {
    loadAction();
  }, []);

  const loadAction = async () => {
    const actionId = props.navigation.getParam('id', '');
    setAction(await DashBoardActionUsecase.getAction(actionId));
  };

  const onChangeActionTitle = async (text: string) => {
    const newAction = action?.setTitle(text);
    if (newAction) {
      await DashBoardActionUsecase.modifyAction(newAction);
      setAction(newAction);
    }
  };

  const onChangeActionGoal = async (text: string) => {
    const number = Number(text);
    const newAction = action?.setGoal(number);
    if (newAction) {
      await DashBoardActionUsecase.modifyAction(newAction);
      setAction(newAction);
    }
  };

  if (!action) {
    return <Spinner />;
  }
  return (
    <>
      <Form>
        <Item fixedLabel>
          <Label>アクション名</Label>
          <Input
            value={action.action.title}
            onChangeText={text => onChangeActionTitle(text)}
          />
        </Item>
        <Item fixedLabel last>
          <Label>目標回数</Label>
          <Input
            keyboardType="numeric"
            value={action.getGoalCountString()}
            onChangeText={text => onChangeActionGoal(text)}
          />
        </Item>
      </Form>
    </>
  );
};
