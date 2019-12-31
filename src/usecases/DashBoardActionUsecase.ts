import {ProgressRepository} from './../repositories/ProgressRepository';
import {GoalRepository} from './../repositories/GoalRepository';
import {ActionRepository} from './../repositories/ActionRepository';
import {ActionDashboardCard} from '../domains/ActionDashboardCard';
import {ActionDashboardCardList} from '../domains/ActionDashboardCardList';
export const DashBoardActionUsecase = {
  async loadList() {
    const actionEntities = await new ActionRepository().listActions();

    let dashboardActions: ActionDashboardCard[] = [];
    for (const e of actionEntities) {
      const actionGoal = await new GoalRepository().getGoal(e.actionId);
      const progress = await new ProgressRepository().getProgress(e.actionId);

      dashboardActions.push(
        new ActionDashboardCard(
          {title: e.title, actionId: e.actionId},
          {count: actionGoal.count},
          progress,
        ),
      );
    }
    return new ActionDashboardCardList(dashboardActions);
  },

  async getAction(actionId: string) {
    const actionEntity = await new ActionRepository().getAction(actionId);
    const actionGoal = await new GoalRepository().getGoal(actionId);
    const progress = await new ProgressRepository().getProgress(actionId);
    return new ActionDashboardCard(
      {title: actionEntity.title, actionId: actionEntity.actionId},
      {count: actionGoal.count},
      progress,
    );
  },
  async modifyAction(action: ActionDashboardCard) {
    await new ActionRepository().modifyAction(action.action);
    await new GoalRepository().modifyGoal(action.getId(), action.goal);
  },
};
