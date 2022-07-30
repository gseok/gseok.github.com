#!/usr/bin/env node

// 내 토큰 - QccbxWdt85mL3BrFPhrw94tbRKwsHpS1
const fs = require('fs');
const path = require('path');
const tinify = require('tinify');

const prevListPath = path.resolve(__dirname, 'optimizelist');
const { log, error } = console;
const exit = (code = 0, fn) => {
  (fn && fn()) || process.exit(code);
}

const checkTargetArgs = async () => {
  const targetArgs = process.argv.slice(2);
  if (!targetArgs || targetArgs.length === 0) {
    const msg1 = `> Error: There are no target path !!!`;
    const msg2 = `> Error: Plz pass the target path 'node image-optimize.js {:targetPath}'`;
    return Promise.reject(`${msg1}\n${msg2}`);
  }

  log(`> Check targets: ${targetArgs}`);
  tinify.mytarget = [...targetArgs];
  return Promise.resolve(tinify.mytarget);
}

const checkAPIKey = async () => {
  const { TINYPNG_API_TOKEN } = process.env;

  log(`> Check tinypng api key: ${TINYPNG_API_TOKEN}`);
  return new Promise((resolve, reject) => {
    if (!TINYPNG_API_TOKEN) {
      const msg1 = `> Error: There are no TINYPNG_API_TOKEN !!!`;
      const msg2 = `> Error: Plz check 'export TINYPNG_API_TOKEN={:tinypng api token}' in your .bashrc or .zshrc`;
      return reject(`${msg1}\n${msg2}`);
    }

    tinify.key = TINYPNG_API_TOKEN;
    tinify.validate((err) => {
      if (err) {
        return reject(err);
      }
      return resolve(tinify.compressionCount);
    });
  });
}

const createTargetFilePathList = (source, list = []) => {
  if (!fs.existsSync(source)) return list;

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    const q = [...files].reduce((acc, curfile) => {
      const curSource = path.join(source, curfile);
      return createTargetFilePathList(curSource, acc);
    }, []);
    return [...list, ...q];
  }
  return [...list, source];
}

const getPrevOptimizeList = async () => {
  const text = fs.readFileSync(prevListPath, {encoding:'utf8', flag:'r'});
  const list = JSON.parse(text).data || [];
  return Promise.resolve(list);
}

const setPrevOptimizeList = async (list) => {
  log('> Optimize history write...')
  return new Promise((resolve) => {
    const text = JSON.stringify({ data: list }, null , 2);
    fs.writeFile(prevListPath, text, {encoding:'utf8', flag:'w'}, (err) => {
      if (err) {
        return reject(`> Error: Optimize history write !!!`);
      };
      resolve(list);
    });
  });
}

const getTargetPathList = async (targetArgs) => {
  const paths = targetArgs.reduce((list, targetArg) => {
    return createTargetFilePathList(targetArg, list);
  }, []);
  const prevPaths = [...await getPrevOptimizeList()];
  const filteredList = paths.filter((p) => {
    return prevPaths.indexOf(p) === -1;
  });
  return Promise.resolve({ targetPathList: filteredList, prevList: prevPaths });
}

const compressFile = async (source) => {
  // png, jpg 만된다
  const ext = path.parse(source).ext.toLowerCase();
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    const src = tinify.fromFile(source);
    return src.toFile(source).then(() => source);
  }

  // 그외 확장자는 그대로 pass
  return Promise.resolve(source);
}

const compress = async ({ targetPathList, prevList }) => {
  for (const source of targetPathList) {
    log(`> Optimize progress... [${source}]`);
    const complete = await compressFile(source);
    prevList.push(complete);
    log(`> Optimize complete... [${complete}]`);
  }
  return Promise.resolve(prevList);
}

// run
(async () => {
  log('!! Image Optimize Run !!');
  checkAPIKey()
    .then(checkTargetArgs)
    .then(getTargetPathList)
    .then(compress)
    .then(setPrevOptimizeList)
    .then(() => log('!! Image Optimize Done !!'))
    .catch((msg) => {
      return exit(-1, () => {
        error(msg);
        error(`!! Image Optimize Failure  !!`);
      });
    });
})();
