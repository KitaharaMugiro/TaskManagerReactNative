import {Action, SelectableAction} from './types/Action';

export class ActionList {
  actions: Action[];

  constructor(actions: Action[]) {
    this.actions = actions;
  }

  deleteAction(action: Action) {
    const slicedActions = this.actions.filter(a => a !== action);
    const _actionList = new ActionList(slicedActions);
    return _actionList;
  }

  addAction(text: string, actionId: string) {
    const _actionList = new ActionList([
      ...this.actions,
      {title: text, actionId},
    ]);
    return _actionList;
  }
  initializeSelectableActions(): SelectableActionList {
    const actionList = new SelectableActionList();
    actionList.actions = this.actions.map(a => {
      return {...a, selected: false};
    });
    return actionList;
  }
}

export class SelectableActionList {
  isEmpty() {
    return this.actions.length === 0;
  }
  getIds() {
    return this.actions.map(a => a.actionId);
  }
  constructor(actions: SelectableAction[] = []) {
    this.actions = actions;
  }

  getOnlySelected() {
    const _selectableActions = this.actions.filter(a => a.selected);
    const actionList = new SelectableActionList();
    actionList.actions = _selectableActions;
    return actionList;
  }
  actions: SelectableAction[] = [];

  toggleSelect(action: SelectableAction) {
    const _selectableActions = this.actions.map(a => {
      if (a === action) {
        a.selected = !a.selected;
      }
      return a;
    });
    const actionList = new SelectableActionList();
    actionList.actions = _selectableActions;
    return actionList;
  }
}
