#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const copyFileSync = (source, target) => {

  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
          targetFile = path.join( target, path.basename( source ) );
      }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}
const copyFolderRecursiveSync = (source, target) => {
  var files = [];

  // Check if folder needs to be created or integrated
  if ( !fs.existsSync( target ) ) {
      fs.mkdirSync( target, { recursive: true } );
  }

  // Copy
  if ( fs.lstatSync( source ).isDirectory() ) {
      files = fs.readdirSync( source );
      files.forEach( function ( file ) {
          var curSource = path.join( source, file );
          if ( fs.lstatSync( curSource ).isDirectory() ) {
              copyFolderRecursiveSync( curSource, target );
          } else {
              copyFileSync( curSource, target );
          }
      } );
  } else {
    copyFileSync(source, target);
  }
}

const runCommand = (command, options) => {
  return new Promise((resolve, reject) => {
    const cProcess = spawn(command, options);
    let hasError = false;

    cProcess.stdout.setEncoding('utf8');
    cProcess.stderr.setEncoding('utf8');
    cProcess.stdout.on('data', console.log);
    cProcess.stderr.on('data', (data) => {
      console.error(data);
      hasError = true;
    });
    cProcess.on('close', (data) => {
      if (hasError) return reject();
      return resolve(data);
    });
    cProcess.on('error', reject);
  });
};

const buildReal = () => runCommand('yarn', ['build:real']);
const copyToV3 = () => {
  const sourceBase = path.resolve(__dirname, '../_site/assets');
  const targetBase = path.resolve(__dirname, '../../v3.0/assets/test');

  [
    {
      from: path.resolve(sourceBase, 'about-images'),
      to: path.resolve(targetBase, 'about-images'),
    },
    {
      from: path.resolve(sourceBase, 'css'),
      to: path.resolve(targetBase, 'css'),
    },
    {
      from: path.resolve(sourceBase, 'js/about-react'),
      to: path.resolve(targetBase, 'js/about-react'),
    },
  ].forEach(({ from, to }) => {
    copyFolderRecursiveSync(from, to);
  });

  // main.css 와 main.css.gz는 제거 필요함
  const mainCss = path.resolve(targetBase, 'css/main.css');
  const mainCssGz = path.resolve(targetBase, 'css/main.css.gz');
  if (fs.existsSync(mainCss)) fs.unlinkSync(mainCss);
  if (fs.existsSync(mainCssGz)) fs.unlinkSync(mainCssGz);
}

(() => {
  console.log('hiw..', __dirname);
  copyToV3();
  // return buildReal().catch((e) => {
  //   console.error(e);
  // });
})();
