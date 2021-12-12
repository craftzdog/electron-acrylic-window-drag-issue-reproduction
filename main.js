const { app } = require('electron')
const path = require('path')
const { BrowserWindow } = require('electron-acrylic-window')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 460,
    show: false,
    frame: false,
    transparent: true,
    vibrancy: {
      theme: 'dark'
    },
    backgroundColor:'#00000000',
    webPreferences: {
      contextIsolation: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, 'preload.js'),
      transparent: true
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.show();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //createOther();
  createWindow();
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
