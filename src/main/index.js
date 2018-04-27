'use strict'

import { app, BrowserWindow, ipcMain, shell, nativeImage } from 'electron'

const path = require('path')
const fs = require('fs')
const os = require('os')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080` // `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 1000,
    // useContentSize: true,
    width: 400,
    webPreferences: {webSecurity: false} // turn this off in production!
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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

/* events from renderer */
ipcMain.on('print-to-pdf', (e) => {
  const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  const win = BrowserWindow.fromWebContents(e.sender)

  win.webContents.printToPDF({}, (err, data) => {
    if (err) return console.log(err.message)

    fs.writeFile(pdfPath, data, (err) => {
      if (err) return console.log(err.message)

      shell.openExternal('file://' + pdfPath)
      e.sender.send('wrote-pdf', pdfPath)
    })
  })
})

ipcMain.on('set-overlay', (e) => {
  let image = nativeImage.createFromPath('../build/icons/notify.png')
  mainWindow.setOverlayIcon(image, 'no holds')
  if (image.isEmpty()) {
    e.sender.send('overlay-set', 'overlay image was null')
  } else {
    e.sender.send('overlay-set', 'overlay set')
  }
})

ipcMain.on('remove-overlay', (e) => {
  mainWindow.setOverlayIcon(null, 'holds exist')
  e.sender.send('overlay-removed', 'overlay removed')
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
