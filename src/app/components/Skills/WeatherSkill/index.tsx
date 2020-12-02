import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface WeatherSkillMeta {
  data?: {
    current?: string // number
    min?: string // number
    max?: string // number
    location?: string // "Düsseldorf\nNorth Rhine-Westphalia\nGermany"
    condition?: string // "few clouds"
    icon?: string // "02d"
    weathercode?: number
    humidity?: string // "73 percent"
    wind?: string // "3 " number with spaces
  }
}

interface WeatherSkillProps {
  style?: any
  meta?: WeatherSkillMeta
}

class WeatherSkillComponent extends React.Component<WeatherSkillProps> {
  render() {
    return (
      <div className="WeatherSkill" style={this.props.style}>
        <div className="background" />
        <h1>WeatherSkill</h1>
        <div>{JSON.stringify(this.props.meta)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState /*, ownProps*/): Partial<WeatherSkillProps> => ({
  // TODO
});

export const WeatherSkill = connect(mapStateToProps)(WeatherSkillComponent);
