import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { Date } from './Date';
import { Clock } from './Clock';

import './style.scss';

interface DateTimeSkillMeta {
  date_string?: string
}

interface DateTimeSkillProps {
  style?: any
  meta?: DateTimeSkillMeta
}

class DateTimeSkillComponent extends React.Component<DateTimeSkillProps> {
  render() {
    return (
      <div className="DateTimeSkill" style={this.props.style}>
        <Date />
        <Clock />
        <div>{JSON.stringify(this.props.meta)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState /*, ownProps*/): Partial<DateTimeSkillProps> => ({
  // TODO
});

export const DateTimeSkill = connect(mapStateToProps)(DateTimeSkillComponent);
