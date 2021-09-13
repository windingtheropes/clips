const fs = require('fs')
const path = require('path')
const startup = path.join(process.env.APPDATA, 'Microsoft/Windows/Start Menu/Programs/Startup')

const startupScript = `start /MIN cmd.exe /C ${path.join(__dirname, 'start.bat')}` //runs on startup
const startClips =  `cd 'C:/Program Files/obs-studio' && obs64.exe --startreplaybuffer --multi warning --portable --minimize-to-tray --disable-updates` //what the startup script runs to run it silently
const si = require('systeminformation')

console.log('Writing scripts...')
fs.writeFile('start.bat', startClips, function (err) {
    if (err) return console.log(err);
});
fs.writeFile(`${path.join(startup, 'startOBSClips.bat')}`, startupScript, function (err) {
    if (err) return console.log(err);
});

console.log('Complete')

console.log('Detecting hardware...')
async function detectHardware()
{
    const graphicsData = await si.graphics()
    const cpuData = await si.cpu()

    const gpuVendor = graphicsData.controllers[0].vendor
    const cpuVendor = cpuData.vendor

    switch(gpuVendor)
    {
        case 'NVIDIA':
            break;
        case 'Advanced Micro Devices, Inc.':
            break;
        default:
            break;
    }
}
detectHardware()
;

