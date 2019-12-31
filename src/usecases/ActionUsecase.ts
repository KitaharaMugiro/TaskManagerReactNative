import {ActionRepository} from '../repositories/ActionRepository';
import {ActionList} from '../domains/ActionList';
import {Action} from '../domains/types/Action';

export const ActionUsecase = {
  async loadActionList() {
    const actions = await new ActionRepository().listActions();
    return new ActionList(actions);
  },

  async loadSelectableActionList() {
    const actions = await this.loadActionList();
    return actions.initializeSelectableActions();
  },

  async addAction(actions: ActionList, title: string) {
    const entity = await new ActionRepository().createAction({title});
    return actions.addAction(entity.title, entity.actionId);
  },

  async deleteAciton(actions: ActionList, action: Action) {
    await new ActionRepository().deleteAction(action);
    return actions.deleteAction(action);
  },
};
