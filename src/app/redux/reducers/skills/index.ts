import { SkillsActionTypes } from '@app/redux/actions/skills';

export interface SkillMeta<T> {
  data: T
  components?: string[]
  componentFocus?: number
}

export interface SkillsState<T> {
  activeSkill: string | null,
  meta: {
    [skillId: string]: SkillMeta<T>
  }
}

const initialState: SkillsState<any> = {
  activeSkill: null,
  meta: {}
};

const updateSkillsData = <T>(existingMeta: SkillMeta<T>, newMeta: Partial<SkillMeta<T>>): SkillMeta<T> => {
  // extract the properties (setting default values, if not present)
  const {
    data: existingData = {},
    ...existingMetaRest
  } = existingMeta || {};
  const {
    data: newData = {},
    ...newMetaRest
  } = newMeta || {};

  return {
    ...existingMetaRest,
    ...newMetaRest,
    data: {
      ...existingData,
      ...newData
    }
  } as SkillMeta<T>;
};

// const updateSkillsComponents = <T>(existingMeta: SkillMeta<T>, componentFocus: number, components?: string[]): SkillMeta<T> => {
//   const newData: Partial<SkillMeta<T>> = {
//     componentFocus
//   };
//   if (components) {
//     newData.components = components;
//   }
//   return updateSkillsData(existingMeta, newData);
// };

export const skills = (state = initialState, action: SkillsActionTypes): SkillsState<any> => {

  switch (action.type) {
    case 'SKILLS_CHANGE_ACTIVE_SKILL':
      return {
        ...state,
        activeSkill: action.skillId
      };
    case 'SKILLS_SET_SESSION_DATA':
      return {
        ...state,
        meta: {
          ...state.meta,
          [action.skillId]: updateSkillsData(state.meta[action.skillId], {
            data: action.data
          })
        }
      };
    case 'SKILLS_SET_SESSION_COMPONENTS':
      return {
        ...state,
        meta: {
          ...state.meta,
          [action.skillId]: updateSkillsData(state.meta[action.skillId], {
            componentFocus: action.componentFocus,
            components: action.components
          })
        }
      };
    default:
      return state;
  }

};
