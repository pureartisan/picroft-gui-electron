import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

interface WeatherSkillProps {
  meta?: any // TODO
}

class WeatherSkillComponent extends React.Component<WeatherSkillProps> {
  render() {
    return (
      <React.Fragment>
        <h1>WeatherSkill</h1>
        <div>{JSON.stringify(this.props.meta)}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: ReduxState /*, ownProps*/): Partial<WeatherSkillProps> => ({
  // TODO
});

export const WeatherSkill = connect(mapStateToProps)(WeatherSkillComponent);
