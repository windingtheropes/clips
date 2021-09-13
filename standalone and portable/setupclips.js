const fs = require('fs')
const path = require('path')

const startup = path.join(process.env.APPDATA, 'Microsoft/Windows/Start Menu/Programs/Startup')
const unzipper = require('unzipper')
const si = require('systeminformation');
const https = require('https');
const { exec } = require('child_process');
console.log('Downloading files...')
const file = fs.createWriteStream("obs.zip");
    const request = https.get("https://cdn-fastly.obsproject.com/downloads/OBS-Studio-27.0.1-Full-x64.zip", function(response) {
        console.log('Complete')
        response.pipe(file);
        console.log('Extracting files...')
        response.pipe(unzipper.Extract({ path: 'obs/' }))
        console.log('Complete')

const startupScript = `start /MIN cmd.exe /C ${path.join(__dirname, 'start.bat')}` //runs on startup
const startClips =  `cd ${path.join(__dirname, 'obs/bin/64bit')} && obs64.exe --startreplaybuffer --multi warning --portable --minimize-to-tray --disable-updates` //what the startup script runs to run it silently

console.log('Writing scripts...')
fs.writeFile('start.bat', startClips, function (err) {
    if (err) return console.log(err);
});
fs.writeFile(`${path.join(startup, 'startOBSClips.bat')}`, startupScript, function (err) {
    if (err) return console.log(err);
});
console.log('Complete')

console.log('Copying settings...')
fs.createReadStream(path.join(__dirname, 'config.zip'))
  .pipe(unzipper.Extract({ path: 'obs/config' }));
console.log('Complete.')
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
});

