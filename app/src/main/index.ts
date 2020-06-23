import { app, BrowserWindow } from 'electron';
import { listen } from "music-graphql-server";

function createWindow () {
  let win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  // win.webContents.openDevTools();
}

app.whenReady()
  .then(() => listen(8080))
  .then(createWindow)
