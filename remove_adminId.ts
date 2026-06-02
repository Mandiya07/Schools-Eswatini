import * as fs from 'fs';

function processFile(path: string) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/\s*adminId:\s*'[^']*',/g, '');
  fs.writeFileSync(path, content);
}

processFile('mockData.ts');
processFile('newSchools.ts');
console.log('done');
