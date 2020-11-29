import React from 'react';

import './style.scss';

// TODO move to util
const padZero = (num: number): string => {
  return num <= 9 ? `0${num}` : `${num}`;
};

type ClockColorMode = 'dark' | 'light';

interface MainClockProps {
  mode?: ClockColorMode
}

interface MainClockState {
  interval?: number
  hours?: string
  mins?: string
  seconds?: string
}

class MainClock extends React.Component<MainClockProps, MainClockState> {

  static defaultProps: MainClockProps = {
    mode: 'light'
  };

  state: MainClockState = {};

  componentDidMount() {
    this.startClock();
  }

  componentWillMount() {
    this.stopClock();
  }

  render() {
    return (
      <div className={`MainClock mode-${this.props.mode}`}>
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

export { MainClock };
