import { store } from '@app/redux/store';

export interface SkillsChangeActiveSkillAction {
  type: 'SKILLS_CHANGE_ACTIVE_SKILL',
  skillId: string
}

export interface SkillsSetSessionDataAction {
  type: 'SKILLS_SET_SESSION_DATA',
  skillId: string,
  data: any
}

export interface SkillsSetSessionComponents {
  type: 'SKILLS_SET_SESSION_COMPONENTS',
  skillId: string,
  components?: string[]
  componentFocus: number
}

export type SkillsActionTypes = SkillsChangeActiveSkillAction | SkillsSetSessionDataAction | SkillsSetSessionComponents;

// ACTIONS --------------

export const setActiveSkill = (skillId: string) => store.dispatch({
  type: 'SKILLS_CHANGE_ACTIVE_SKILL',
  skillId
} as SkillsChangeActiveSkillAction);

export const setSessionData = (skillId: string, data: any) => store.dispatch({
  type: 'SKILLS_SET_SESSION_DATA',
  skillId,
  data
} as SkillsSetSessionDataAction);

export const setSkillComponents = (skillId: string, componentFocus?: number, components?: string[]) => store.dispatch({
  type: 'SKILLS_SET_SESSION_COMPONENTS',
  skillId,
  componentFocus,
  components
} as SkillsSetSessionComponents);