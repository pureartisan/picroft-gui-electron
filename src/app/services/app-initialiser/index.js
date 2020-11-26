import { ipcRenderer } from 'electron';

class AppInitialiser {
  init () {
    // TESTING
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg); // prints "pong"
    });
    ipcRenderer.send('asynchronous-message', 'ping');
  }
}

const singleton = new AppInitialiser();

export { singleton as AppInitialiser };
