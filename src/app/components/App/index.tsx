import React from 'react';

import { ActiveSkill } from '@app/components/ActiveSkill';
import { StandByScreen } from '@app/components/StandByScreen';

interface AppState {
  standBy?: boolean;
  // TESTING
  listening?: boolean;
}

class App extends React.Component<{}, AppState> {

  state: AppState = {
    standBy: false
  };

  render() {
    return (
      <div className="App">
        <ActiveSkill />
        {this.state.standBy && (
          <StandByScreen
            onClick={this.handleStandByScreenClick}
            listening={this.state.listening}
          />
        )}
      </div>
    );
  }

  handleStandByScreenClick = () => {
    this.setState({
      listening: !this.state.listening
    });
  };

}

export { App };
