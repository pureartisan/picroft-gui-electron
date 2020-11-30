import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

interface DateTimeSkillProps {
  meta?: any // TODO
}

class DateTimeSkillComponent extends React.Component<DateTimeSkillProps> {
  render() {
    return (
      <React.Fragment>
        <h1>DateTimeSkill</h1>
        <div>{JSON.stringify(this.props.meta)}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: ReduxState /*, ownProps*/): Partial<DateTimeSkillProps> => ({
  // TODO
});

export const DateTimeSkill = connect(mapStateToProps)(DateTimeSkillComponent);
