import { ipcMain } from 'electron';

import { LightManager } from '@electron/light-manager';

LightManager.init();
LightManager.showLoading();


// TESTING
// =================================
ipcMain.on('asynchronous-message', (event, arg) => {
  // prints "ping"
  console.log(arg); // tslint:disable-line no-console
  event.reply('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', (event, arg) => {
  // prints "ping"
  console.log(arg); // tslint:disable-line no-console
  event.returnValue = 'pong';
});