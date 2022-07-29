const { sheetToData } = require('@newswire/sheet-to-data');
const { google } = require('googleapis');
const os = require('os');
const fs = require('fs');
const path = require('path');
const keyFile = 'key.json';
const spreadsheetId = [
  '1ovvSRIWi8ohQBZxDC-1770sF0aKfZ5M3R9yuhcjs04o',
];
// const ranges = ['Assignments!B2:C'];
const ranges = ['Articles data!A1:AB']
const outFileNames = ['data.json'];

// https://github.com/rdmurphy/sheet-to-data/blob/master/index.js
function zipObject(keys, values) {
  const result = {};

  keys.forEach((key, i) => {
    if (values) {
      result[key] = values[i];
    } else {
      result[key[0]] = key[1];
    }
  });

  return result;
}

function selectData(json) {
  const reqKeys = ['Enter name Wikipedia article - DO NOT REORDER', 'Claimed by', 'Link to edit', 'needs article?', 'needs edit?', 'Needs more independent citations (mark TRUE)', 'Needs headshot (mark TRUE)', 'ORES rating', 'link'];

  const renamedKeys = ['Name of journalist', 'Claimed by', 'Link to edit', 'Needs article', 'Needs edit', 'Needs citation', 'Needs photo', 'rating', 'link'];

  const selectedJson = [];

  json.forEach(r => {
    let obj = {}

    reqKeys.forEach((k, i) => {
      obj[renamedKeys[i]] = r[k];
    });

    selectedJson.push(obj);
  });

  return selectedJson;
}

function reshapeData(rows) {
  rows.forEach(d => {
    d.Name = d['Name of journalist'];
    d.link = d['Link to edit'];

    if(d['Needs citation'] == 'TRUE') {
      d.Status = 'Needs citations'
    } else if (d['Needs article'] == 'TRUE') {
      d.Status = 'Needs biography';
    } else if (d['Needs edit'] == 'TRUE') {
      d.Status = 'Needs edit';
    } else if (d['Needs photo'] == 'TRUE') {
      d.Status = 'Needs image';
    } else {
      d.Status = 'Complete!';
    }
  });

  const keysToKeep = ['Name', 'link', 'Status'];

  const r = rows.map(o => keysToKeep.reduce((acc, curr) => {
    acc[curr] = o[curr];
    return acc;
  }, {}));

  // console.log(r);

  return r;
}

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  // create your own Google Sheets API client
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  for (let i = 0; i < spreadsheetId.length; i++) {
    console.log(spreadsheetId[i]);

    const results = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId[i],
      range: ranges[i],
    });

    // console.log(results)

    const rows = results.data.values;
    const headers = rows[0];

    let data = selectData(rows.slice(1)
      .map(values => zipObject(headers, values)));

    data = reshapeData(data)

    const fp = 'src/assets/' + outFileNames[i];
    // console.log(rows[0])
    fs.writeFileSync(fp, JSON.stringify({ data }));
  }
}

main().catch(console.error);
