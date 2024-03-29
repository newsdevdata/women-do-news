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

const renderLink = (_, row) => {
  const link = row.cells[1].data;
  return html(`
    <a class="journo-name" href="${link}" target="_parent" rel="noopener noreferrer">${row.cells[0].data}</a>`
  )
}

const renderTag = (cell) => {
  const c = cell.toLowerCase()
    .replace(' ', '-')
    .replace('!', '');

  return html(`<span class='need-tag ${c}'>${cell}</span>`);
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

    const grid = new Grid({
      columns: [
        {
          name: 'Name',
          formatter: renderLink,
        },
        {
          name: 'link',
          hidden: true
        },
        {
          name: 'Status',
          formatter: (cell) => renderTag(cell),
        },
        // 'Status'
      ],
      data: obj.data,
      pagination: true,
      search: true,
      sort: true,
      style: {
        container: {
          'font-family': "'Montserrat', Helvetica, sans-serif !important",
          'border': '1px solid rgba(226, 226, 223, 1)',
          'padding': '1em',
          'border-radius': '5px',
        }
      }
      // className: {
      //   td: 'my-custom-td-class',
      //   table: 'custom-table-classname'
      // }
    })

    grid.render(table);
    pymChild.sendHeight();

    const search = select('.gridjs-search-input');
    search.placeholder = 'Search for a name...';

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

        pymChild.sendHeight();
      }
    });
  }
}

getJSON('assets/data.json', displayTable);
