import React from 'react';
import classnames from 'classnames';

import { MainClock } from './MainClock';

import './style.scss';

interface StandByScreenProps {
  listening?: boolean;
  onClick?: () => void
}

class StandByScreen extends React.Component<StandByScreenProps> {

  props: StandByScreenProps = {};

  render() {
    return (
      <div
        className={classnames("StandByScreen", {
          'listening': this.props.listening
        })}
        onClick={this.props.onClick}
      >
        <MainClock />
      </div>
    );
  }
}

export { StandByScreen };
