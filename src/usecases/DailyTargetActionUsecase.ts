import {DailyTargetActionList} from '../domains/DailyTargetActionList';
import {DailyTargetRepository} from './../repositories/DailyTargetRepository';

export const DailyTargetActionUsecase = {
  async deleteTodayTarget() {
    await new DailyTargetRepository().deleteTodayTargets();
  },
  async setTodayDailyTarget(targetActions: DailyTargetActionList) {
    //今日の分を削除
    await new DailyTargetRepository().deleteTodayTargets();

    //DBに保存
    const actionIds = targetActions.getIds();
    await new DailyTargetRepository().setTodayTargets({actionIds});
  },

  async loadTodayDailyTargetList() {
    const actions = await new DailyTargetRepository().getTodayTargets();
    return actions;
  },
};
