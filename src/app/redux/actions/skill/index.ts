import { store } from '@app/redux/store';

export interface ChangeActiveSkillAction {
  type: 'CHANGE_ACTIVE_SKILL',
  skill: string
}

export type SkillActionTypes = ChangeActiveSkillAction;

export const setActiveSkill = (skill: string) => store.dispatch({
  type: 'CHANGE_ACTIVE_SKILL',
  skill
});