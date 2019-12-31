import {ProgressRepository} from './../repositories/ProgressRepository';
export const ProgressUsecase = {
  async incrementProgress(actionIds: string[]) {
    for (const actionId of actionIds) {
      await new ProgressRepository().incrementProgress(actionId);
    }
  },
};
