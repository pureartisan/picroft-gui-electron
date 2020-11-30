import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { DateTimeSkill } from './DateTimeSkill';
import { WeatherSkill } from './WeatherSkill';

const skillMapper = (skillId?: string) => {
  switch (skillId) {
    case 'mycroft-date-time.mycroftai':
      return DateTimeSkill;
    case 'mycroft-weather.mycroftai':
      return WeatherSkill;
    default:
      return null;
  }
};

interface SkillProps {
  skillId?: string,
  meta?: any
}

const SkillComponent = (props: SkillProps) => {
  const Component = skillMapper(props.skillId);
  return Component ? <Component {...(props as any)} /> : null;
};

const mapStateToProps = (state: ReduxState, ownProps: SkillProps): Partial<SkillProps> => ({
  meta: ownProps.skillId ? (state.skills.meta[ownProps.skillId] || {}) : {}
});

export const Skill = connect(mapStateToProps)(SkillComponent);
