import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-spring/renderprops';

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
  skillId?: string
  styles?: any
  meta?: any
}

const SkillComponent = (props: SkillProps) => {
  const Component = skillMapper(props.skillId);
  return (
    <Transition
      items={Component}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {Comp => Comp && (style => <Comp {...(props as any)} style={style}/>)}
    </Transition>
  )
  // return Component ? <Component {...(props as any)} /> : null;
};

const mapStateToProps = (state: ReduxState, ownProps: SkillProps): Partial<SkillProps> => ({
  meta: ownProps.skillId ? (state.skills.meta[ownProps.skillId] || {}) : {}
});

export const Skill = connect(mapStateToProps)(SkillComponent);
