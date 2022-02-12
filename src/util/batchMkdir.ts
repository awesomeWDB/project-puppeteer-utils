import * as fs from 'fs';

const dirCache = {};

export const batchMkdir = (path: string) => {
  const all = path
    .replace(/\\/g, '/')
    .split('/')
    .map(item => item.trim())
    .filter(item => item);
  let curr = all[0];
  console.log(all, curr, path);
  for (let i = 1; i <= all.length; i++) {
    console.log(dirCache[curr], fs.existsSync(curr), curr);
    if (!dirCache[curr] && !fs.existsSync(curr)) {
      fs.mkdirSync(curr);
    }
    dirCache[curr] = true;
    curr += `/${all[i]}`;
  }
};
