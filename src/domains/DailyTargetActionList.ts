import {SelectableActionList} from './ActionList';
import {Action} from './types/Action';

export class DailyTargetActionList {
  actionList: SelectableActionList;

  getIds() {
    return this.actionList.getIds();
  }
  constructor(actions: SelectableActionList) {
    this.actionList = actions;
  }

  getActions(): Action[] {
    return this.actionList.actions;
  }
}
