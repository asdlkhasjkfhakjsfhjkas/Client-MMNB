const builder = require('electron-builder')
const { preductname } = require('./package.json')

builder.build({
    config: {
        generateUpdatesFilesForAllChannels: false,
        appId: preductname,
        productName: preductname,
        artifactName: "${productName}-${os}-${arch}.${ext}",
        files: ["src/**/*", "package.json", "LICENSE.md"],
        directories: { "output": "dist" },
        compression: 'maximum',
        asar: true,
        publish: [{
            provider: "github",
            releaseType: 'release',
        }],
        win: {
            icon: "./src/assets/images/manti-beta.ico",
            target: [{
                target: "nsis",
                arch: ["x64"]
            }],
        },
        nsis: {
            oneClick: true,
            allowToChangeInstallationDirectory: false,
            createDesktopShortcut: true,
            runAfterFinish: true
        },
        mac: {
            icon: "./src/assets/images/manti.icns",
            category: "public.app-category.games",
            target: [{
                target: "dmg",
                arch: ["x64", "arm64"]
            }]
        },
        linux: {
            icon: "./src/assets/images/manti.png",
            target: [{
                target: "AppImage",
                arch: ["x64"]
            }, {
                target: "tar.gz",
                arch: ["x64"]
            }]
        }
    }
}).then(() => {
    console.log('Build terminada')
}).catch(err => {
    console.error('Error critico', err)
})