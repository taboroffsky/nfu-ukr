const fs = require('fs');

const tokens = JSON.parse(fs.readFileSync("../nfu-ukr-common/resources/storage.json").toString());
const uaDescriptions = {};
const enDescriptions = {};
tokens.map((val) => {
    uaDescriptions[val.name] = val.descriptionUa;
    enDescriptions[val.name] = val.description;
});

fs.writeFileSync("./locales/en/tokensDescription.json", JSON.stringify(enDescriptions, null, 2));
fs.writeFileSync("./locales/ua/tokensDescription.json", JSON.stringify(uaDescriptions, null, 2));