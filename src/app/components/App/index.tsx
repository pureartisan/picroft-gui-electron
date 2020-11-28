import React from 'react';

import { StandByScreen } from '@app/components/StandByScreen';

interface AppState {
  standBy?: boolean;
  // TESTING
  listening?: boolean;
}

class App extends React.Component<{}, AppState> {

  state: AppState = {
    standBy: true
  };

  render() {
    return (
      <div className="App">
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
