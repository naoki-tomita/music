const { app, BrowserWindow } = require('electron')
const { listen } = require("graphql");

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady()
  .then(() => listen(8080))
  .then(createWindow)
