import React from 'react';
import classnames from 'classnames';

import './style.scss';

type ClockColorMode = 'dark' | 'light';

interface DateProps {
  mode?: ClockColorMode
}

interface DateState {
  interval?: number
  day?: string
  month?: string
  date?: string
}

interface NameMap {
  [index: string]: string
}

class DateComponent extends React.Component<DateProps, DateState> {

  static defaultProps: DateProps = {
    mode: 'light'
  };

  private static DAY_NAMES: NameMap = {
    '0': 'Sun',
    '1': 'Mon',
    '2': 'Tue',
    '3': 'Wed',
    '4': 'Thu',
    '5': 'Fri',
    '6': 'Sat'
  };

  private static MONTH_NAMES: NameMap = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
  };

  state: DateState = {};

  componentDidMount() {
    this.startClock();
  }

  componentWillMount() {
    this.stopClock();
  }

  render() {
    return (
      <div
        className={classnames(`Date mode-${this.props.mode}`, {
          'not-ready': !this.state.date
        })}
      >
        <span className="day">{this.state.day}</span>
        <span className="date">{this.state.date}</span>
        <span className="month">{this.state.month}</span>
      </div>
    );
  }

  private startClock(): void {
    const interval = window.setInterval(() => {

      const today = new Date();
      const day = DateComponent.DAY_NAMES[today.getDay()];
      const date = `${today.getDate()}`;
      const month = DateComponent.MONTH_NAMES[today.getMonth()];
      this.setState({
        day,
        date,
        month
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

export { DateComponent as Date };
