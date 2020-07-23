const { app, BrowserWindow, Menu } = require('electron');

const ipc = require("electron").ipcMain;
const path = require('path');
const url = require('url');

const isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow;

const isMac = process.platform === 'darwin'
const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  { role: 'editMenu'},
  {
    label: "Sessions",
    submenu: [
      {
        label: "Start / Resume",
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          mainWindow.webContents.send('startSession');
        }
      },
      {
        label: "View Archive",
        click: () => {
          mainWindow.webContents.send('viewSessionArchive')
        }
      }
    ]
  }
  // { role: 'fileMenu' }
  // {
  //   label: 'File',
  //   submenu: [
  //     isMac ? { role: 'close' } : { role: 'quit' }
  //   ]
  // }
];

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    // frame: false,
    // transparent: true
    titleBarStyle: 'hidden'
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  // add inspect element on right click menu
  mainWindow.webContents.on('context-menu', (e, props) => {
    Menu.buildFromTemplate([
      {role : 'copy'},
      {role : 'cut'},
      {role : 'paste'},
      ...(isDevelopment ? [
        { type: 'separator' },
        {
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(props.x, props.y);
          },
        }
      ] : []),
    ]).popup(mainWindow);
  });

  if(isDevelopment) {
    menuTemplate.push({ role: 'viewMenu'});
  }

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);


}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


ipc.on('saveProject', (event) => {
  event.sender.send('getProjectState');
})

ipc.on('saveProjectState', (event, data) => {
  const {dialog} = require('electron');
  const fs = require('fs');

  dialog.showSaveDialog(mainWindow, {filters: [{extensions: [".write"]}]}).then(result => {
    if(result.canceled) return;

    if(result.filePath === undefined){
      console.log("No path selected")
    } else {
      const jsonContents = JSON.stringify(data);

      let path = result.filePath;
      if(path.match(/\.write$/)=== null){
        path = `${result.filePath}.write`
      }

      saveFile(path, jsonContents);
    }
  });

  const saveFile = (filepath, data) => {
    fs.writeFile(filepath, data, (err) => {
      if(err){
        alert("An error occurred reading the file :" + err.message)
        return
      }

      event.sender.send('fileSaved', filepath)
    })
  };
})

ipc.on('openProject', (event, path) => {
  const {dialog} = require('electron');
  const fs = require('fs');
  const openDialogOptions = {
    properties: ['openFile'],
    filters: [{extensions: [".write"]}]
  };

  dialog.showOpenDialog(mainWindow, openDialogOptions).then( result => {
    if(result.canceled) return;

    console.log("loading file: " + result.filePaths);

    // fileNames is an array that contains all the selected
    if(result.filePaths === undefined) {
      console.log("No file selected");

    } else {
      readFile(result.filePaths[0]);
    }

  });

  function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', (err, data) => {

      if(err){
        alert("An error occurred reading the file :" + err.message)
        return
      }

      // handle the file content
      event.sender.send('projectData', data)
    })
  }
});
