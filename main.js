const { app, BrowserWindow, systemPreferences } = require('electron');
const path = require('path');

async function createWindow() {
    if (process.platform === 'darwin') {
        const status = systemPreferences.getMediaAccessStatus('camera');
        console.log('Camera access status:', status);

        if (status !== 'granted') {
            const granted = await systemPreferences.askForMediaAccess('camera');
            console.log('Camera granted:', granted);
        }
    }

    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        backgroundColor: '#000000',
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'resources/icon.icns'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            sandbox: false
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
