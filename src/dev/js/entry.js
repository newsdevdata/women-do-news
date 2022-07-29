/* eslint-disable */
import getJSON from './utils/getJSON';
import { select } from './utils/dom';
import { Grid, html } from 'gridjs';

window.onResize = (width) => {
  console.log(width);
};

window.enterView = (msg) => {
  console.log('enter-view', msg);
};

// const renderLink = link => `<a href=${link} target='_blank' rel='noopener noreferrer'>Click here to edit on Wikipedia</a>`;

const renderLink = (_, row) => {
  console.log(row);
}

function displayTable(err, res) {
  if (err) {
    throw err;
  } else {
    const { data } = res;

    const table = select('#my-table');
    const filter = select('.table-filter');

    const tableKeys = ['Name', 'link', 'Status'];
    const tableHeaders = ['Journalist', 'Next step'];

    const obj = {
      headings: tableKeys,
      data: [],
    };

    data.forEach((row) => {
      const outRow = tableKeys.map(k => row[k]);
      obj.data.push(outRow);
    });

    // console.log(obj.data[1]);

    const grid = new Grid({
      columns: [
        {
          name: 'Name',
          formatter: (_, row) => html(`<a href=${row.cells[1].data} target='_blank' rel='noopener noreferrer'>${row.cells[0].data}</a>`)
        },
        {
          name: 'link',
          hidden: true
        },
        'Status'
      ],
      data: obj.data,
      pagination: true,
      search: true,
      className: {
        td: 'my-custom-td-class',
        table: 'custom-table-classname'
      }
    })

    grid.render(table);

    // new simpleDatatables.DataTable(table, { // eslint-disable-line no-new
    //   data: obj,
    //   columns: [
    //     { select: 2, render: renderLink },
    //   ]
    // });

    const lookup = {
      'citation': 'Needs citations',
      'article': 'Needs biography',
      'edit': 'Needs edit',
      'image': 'Needs image',
      'complete': 'Complete!',
    }

    filter.addEventListener('change', e => {
      const chosen = filter.options[filter.selectedIndex].value;

      if (chosen !== 'all') {
        let refresh = obj.data.filter(d => d[2] === lookup[chosen]);

        grid.updateConfig({
          data: refresh,
        })
        .forceRender();

      } else {
        grid.updateConfig({
          data: obj.data,
        })
        .forceRender();
      }
    });
  }
}

getJSON('assets/data.json', displayTable);
