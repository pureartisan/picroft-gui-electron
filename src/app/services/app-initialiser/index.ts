import { ipcRenderer } from 'electron';

import { MycroftMessageBus } from '@app/services/mycroft-message-bus';

class AppInitialiser {
  init () {
    MycroftMessageBus.init();


    // TESTING
    // prints "pong"
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));   // tslint:disable-line no-console

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      // prints "pong"
      console.log(arg); // tslint:disable-line no-console
    });
    ipcRenderer.send('asynchronous-message', 'ping');
  }
}

const singleton = new AppInitialiser();

export {
    singleton as AppInitialiser
};