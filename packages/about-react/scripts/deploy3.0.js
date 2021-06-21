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

  console.log(`Copey ${source} to ${targetFile}`);
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

const copyToV3 = () => {
  const sourceBase = path.resolve(__dirname, '../_site/assets');
  const targetBase = path.resolve(__dirname, '../../v3.0/assets');

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
  console.log('build complete!! Copy to build result');
  copyToV3();
})();
