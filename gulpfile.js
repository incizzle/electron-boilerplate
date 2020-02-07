const gulp = require('gulp');
const javascriptObfuscator = require('gulp-javascript-obfuscator');

gulp.task('obfuscate', async function () {
    gulp.src('./app/main/.parcel/main.js')
        .pipe(javascriptObfuscator({
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayEncoding: 'base64',
            stringArrayThreshold: 0.75,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        }))
        .pipe(gulp.dest('./app/main/.parcel/'));
});