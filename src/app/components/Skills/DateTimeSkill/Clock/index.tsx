import React from 'react';
import classnames from 'classnames';

import { padZero } from '@app/utils/strings';

import './style.scss';

type ClockColorMode = 'dark' | 'light';

interface ClockProps {
  mode?: ClockColorMode
}

interface ClockState {
  interval?: number
  hours?: string
  mins?: string
  seconds?: string
}

class Clock extends React.Component<ClockProps, ClockState> {

  static defaultProps: ClockProps = {
    mode: 'light'
  };

  state: ClockState = {};

  componentDidMount() {
    this.startClock();
  }

  componentWillMount() {
    this.stopClock();
  }

  render() {
    return (
      <div
        className={classnames(`Clock mode-${this.props.mode}`, {
          'not-ready': this.state.hours === undefined
        })}
      >
        <span className="hours">{this.state.hours}</span>
        <span className="mins">{this.state.mins}</span>
        <span className="seconds">{this.state.seconds}</span>
      </div>
    );
  }

  private startClock(): void {
    const interval = window.setInterval(() => {

      const date = new Date();
      const hours = date.getHours();
      const mins = date.getMinutes();
      const seconds = date.getSeconds();
      this.setState({
        hours: padZero(hours),
        mins: padZero(mins),
        seconds: padZero(seconds)
      });

    }, 1000);

    this.setState({
      interval
    });
  }

  private stopClock(): void {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }
}

export { Clock };
