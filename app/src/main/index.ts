import { app, BrowserWindow } from 'electron';
import { listen } from "music-graphql-server";

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools();
}

app.whenReady()
  .then(() => listen(8080))
  .then(createWindow)
