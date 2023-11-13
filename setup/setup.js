const fs = require("fs");

const pathToDanfoPackage = "node_modules/danfojs/package.json";

const danfoPackage = fs.readFileSync(pathToDanfoPackage, "utf-8");

const danfoPackageObject = JSON.parse(danfoPackage);

danfoPackageObject["module"] = danfoPackageObject["main"];

fs.writeFileSync(pathToDanfoPackage, JSON.stringify(danfoPackageObject));

