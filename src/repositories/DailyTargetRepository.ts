import {SelectableAction} from './../domains/types/Action';
import {SelectableActionList} from './../domains/ActionList';
import {DailyTargetActionList} from './../domains/DailyTargetActionList';
import {ActionEntity} from './../entities/ActionEntity';
import {DailyTargetEntity} from './../entities/DailyTargetEntity';
import {RealmHandler} from '../libs/RealmHandler';
import {isSameDay} from '../libs/DateUtils';
import {Action} from '../domains/types/Action';
export class DailyTargetRepository {
  async getTodayTargets() {
    const realm = await RealmHandler.openRealm([
      DailyTargetEntity.schema,
      ActionEntity.schema,
    ]);
    const dailyTargets: Realm.Results<DailyTargetEntity> = realm.objects(
      DailyTargetEntity.schema.name,
    );
    const todayTargets = dailyTargets.filter(d =>
      isSameDay(d.date, new Date()),
    );

    const actionEntities: Realm.Results<ActionEntity> = realm.objects(
      ActionEntity.schema.name,
    );
    const actions: Action[] = actionEntities.map(e => ({
      title: e.title,
      actionId: e.actionId,
    }));
    let selectableActions: SelectableAction[] = [];
    todayTargets.forEach(t => {
      const action = actions.find(a => a.actionId === t.actionId);
      if (!action) return;
      selectableActions.push({...action, selected: false});
    });
    const selectableActionList = new SelectableActionList(selectableActions);
    const todayActions: DailyTargetActionList = new DailyTargetActionList(
      selectableActionList,
    );
    RealmHandler.closeRealm(realm);

    return todayActions;
  }

  async deleteTodayTargets() {
    const realm = await RealmHandler.openRealm([DailyTargetEntity.schema]);
    realm.write(() => {
      const targets: Realm.Results<DailyTargetEntity> = realm.objects(
        DailyTargetEntity.schema.name,
      );
      const todayTargets = targets.filter(t => isSameDay(t.date, new Date()));
      realm.delete(todayTargets);
    });
    RealmHandler.closeRealm(realm);
  }

  async setTodayTargets({actionIds}: {actionIds: string[]}) {
    const realm = await RealmHandler.openRealm([DailyTargetEntity.schema]);

    for (const actionId of actionIds) {
      const entity = new DailyTargetEntity(actionId, new Date());
      realm.write(() => {
        realm.create(DailyTargetEntity.schema.name, entity);
      });
    }
    RealmHandler.closeRealm(realm);
  }
}
