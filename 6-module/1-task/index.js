/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    const table = document.createElement('TABLE');
    
    table.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    `;

    this.addTableElements(table, rows);

    this.table = table;
  }

  get elem() {
    return this.table;
  }

  addTableElements(table, rows) {
    table.innerHTML += rows.map(row => {
      return `
        <tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button>X</button></td>
        </tr>
      `;
    }).join('');

    table.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.closest('TR').remove();
      }  
    });
  }
}
