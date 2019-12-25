import {Action, SelectableAction} from './Action';

export class ActionList {
  deleteAction(action: Action) {
    const slicedActions = this.actions.filter(a => a !== action);
    const _actionList = new ActionList();
    _actionList.actions = slicedActions;
    return _actionList;
  }
  addAction(text: string) {
    const _actionList = new ActionList();
    _actionList.actions = [...this.actions, {text}];
    return _actionList;
  }
  actions: Action[] = [];

  initializeSelectableActions(): SelectableActionList {
    const actionList = new SelectableActionList();
    actionList.actions = this.actions.map(a => {
      return {...a, selected: false};
    });
    return actionList;
  }
}

export class SelectableActionList {
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
