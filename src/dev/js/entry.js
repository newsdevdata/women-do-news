/* eslint-disable */
import getJSON from './utils/getJSON';
import { select } from './utils/dom';

window.onResize = (width) => {
  console.log(width);
};

window.enterView = (msg) => {
  console.log('enter-view', msg);
};

const renderLink = link => `<a href=${link} target='_blank' rel='noopener noreferrer'>Click here to edit on Wikipedia</a>`;

function displayTable(err, res) {
  if (err) {
    throw err;
  } else {
    const { data } = res;

    const filteredData = data.filter(d => d['Needs article'] === 'TRUE');
    const table = select('#my-table');

    const tableHeaders = ['Name of journalist', 'Claimed by', 'Link to edit'];

    const obj = {
      headings: tableHeaders,
      data: [],
    };

    filteredData.forEach((row) => {
      const outRow = tableHeaders.map(k => row[k]);
      obj.data.push(outRow);
    });

    console.log(obj)


    new simpleDatatables.DataTable(table, { // eslint-disable-line no-new
      data: obj,
      columns: [
        { select: 2, render: renderLink },
      ]
    });
  }
}

getJSON('assets/data.json', displayTable);
