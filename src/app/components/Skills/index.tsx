import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { DateTimeSkill } from './DateTimeSkill';
import { WeatherSkill } from './WeatherSkill';
import { IpSkill } from './IpSkill';

const skillMapper = (skillId?: string | null) => {
  switch (skillId) {
    case 'mycroft-date-time.mycroftai':
      return DateTimeSkill;
    case 'mycroft-weather.mycroftai':
      return WeatherSkill;
    case 'mycroft-ip.mycroftai':
      return IpSkill;
    default:
      return null;
  }
};

interface SkillProps {
  skillId?: string | null
  meta?: any
  style?: any
}

const SkillComponent = (props: SkillProps) => {
  const Component = skillMapper(props.skillId);
  return Component ? <Component {...(props as any)} /> : null;
};

const mapStateToProps = (state: ReduxState, ownProps: SkillProps): Partial<SkillProps> => ({
  meta: ownProps.skillId ? (state.skills.meta[ownProps.skillId] || {}) : {}
});

export const Skill = connect(mapStateToProps)(SkillComponent);
