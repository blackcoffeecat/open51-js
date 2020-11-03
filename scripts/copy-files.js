const path = require('path');
const fs = require('fs');
const mainPackage = require('../package.json');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, 'dist');

const run = async () => {
  let packageData = fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8');
  packageData = JSON.parse(packageData);
  const { devDependencies, workspaces, scripts, ...publishPackageData } = packageData;
  publishPackageData.repository = {
    ...mainPackage.repository,
    directory: packagePath.replace(__dirname.replace(/scripts[\/\\]+$/, ''), ''),
  };
  publishPackageData.author = mainPackage.author;
  fs.writeFileSync(path.join(buildPath, 'package.json'), JSON.stringify(publishPackageData, null, 2), 'utf8');

  fs.copyFileSync(path.join(__dirname, '../LICENSE'), path.join(buildPath, 'LICENSE'));
};

run();
