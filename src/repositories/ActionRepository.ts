import {Action} from './../domains/types/Action';
import {ActionEntity} from '../entities/ActionEntity';
import {RealmHandler} from '../libs/RealmHandler';
export class ActionRepository {
  async modifyAction(action: Action) {
    const realm = await RealmHandler.openRealm([ActionEntity.schema]);
    realm.write(() => {
      const actionEntity: ActionEntity | undefined = realm.objectForPrimaryKey(
        ActionEntity.schema.name,
        action.actionId,
      );
      if (actionEntity) {
        actionEntity.title = action.title;
      }
    });
    RealmHandler.closeRealm(realm);
  }

  async getAction(actionId: string) {
    const realm = await RealmHandler.openRealm([ActionEntity.schema]);
    const actionEntity: ActionEntity | undefined = realm.objectForPrimaryKey(
      ActionEntity.schema.name,
      actionId,
    );
    if (!actionEntity) throw new Error('Actionが見つかりませんでした。');
    const action = {
      title: actionEntity.title,
      actionId: actionEntity.actionId,
    };
    RealmHandler.closeRealm(realm);
    return action;
  }
  async createAction({title}: {title: string}) {
    const realm = await RealmHandler.openRealm([ActionEntity.schema]);
    const uuidv1 = require('uuid/v1');
    const uuid = uuidv1();
    const entity = new ActionEntity(title, uuid);
    realm.write(() => {
      realm.create(ActionEntity.schema.name, entity);
    });
    RealmHandler.closeRealm(realm);
    return entity;
  }

  async deleteAction(action: Action) {
    const realm = await RealmHandler.openRealm([ActionEntity.schema]);
    realm.write(() => {
      let actions = realm.objects(ActionEntity.schema.name);
      let actionEntity = actions.filtered(`actionId = "${action.actionId}"`);
      realm.delete(actionEntity);
    });
    RealmHandler.closeRealm(realm);
  }

  async listActions() {
    const realm = await RealmHandler.openRealm([ActionEntity.schema]);
    const actionEntities: Realm.Results<ActionEntity> = realm.objects(
      ActionEntity.schema.name,
    );
    const actions: Action[] = actionEntities.map(e => ({
      title: e.title,
      actionId: e.actionId,
    }));
    RealmHandler.closeRealm(realm);
    return actions;
  }
}
