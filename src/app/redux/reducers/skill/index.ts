import { SkillActionTypes, ChangeActiveSkillAction } from '@app/redux/actions/skill';

export interface SkillState {
  activeSkill: string | null
}

const initialState: SkillState = {
  activeSkill: null
};

export const skill = (state = initialState, action: SkillActionTypes): SkillState  => {

  switch (action.type) {
    case 'CHANGE_ACTIVE_SKILL':
      return {
        ...state,
        activeSkill: action.skill
      };
    default:
      return state;
  }

};
