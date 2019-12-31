import {RealmHandler} from '../libs/RealmHandler';
import {ActionGoal} from './../domains/types/Action';
import {GoalEntity} from './../entities/GoalEntity';
export class GoalRepository {
  async modifyGoal(actionId: string, goal: ActionGoal) {
    const realm = await RealmHandler.openRealm([GoalEntity.schema]);
    realm.write(() => {
      const goalEntity: GoalEntity | undefined = realm.objectForPrimaryKey(
        GoalEntity.schema.name,
        actionId,
      );
      if (goalEntity) {
        goalEntity.goalCount = goal.count;
      }
    });
    RealmHandler.closeRealm(realm);
  }
  async getGoal(actionId: string) {
    const realm = await RealmHandler.openRealm([GoalEntity.schema]);
    let goalEntity: GoalEntity | undefined = realm.objectForPrimaryKey(
      GoalEntity.schema.name,
      actionId,
    );

    let actionGoal: ActionGoal;
    if (!goalEntity) {
      actionGoal = await this.createGoal({actionId: actionId});
    } else {
      actionGoal = {count: goalEntity.goalCount};
    }
    RealmHandler.closeRealm(realm);
    return actionGoal;
  }

  async createGoal({
    goalCount,
    actionId,
  }: {
    goalCount?: number;
    actionId: string;
  }): Promise<ActionGoal> {
    const realm = await RealmHandler.openRealm([GoalEntity.schema]);
    const entity = new GoalEntity(actionId, goalCount);
    realm.write(() => {
      realm.create(GoalEntity.schema.name, entity);
    });
    RealmHandler.closeRealm(realm);
    return {count: entity.goalCount};
  }
}
