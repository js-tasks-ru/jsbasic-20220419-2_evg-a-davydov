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
    this._table = document.createElement('TABLE');
    
    this._table.innerHTML = `
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

    this.addTableElements(this._table, rows);
  }

  get elem() {
    return this._table;
  }

  addTableElements(table, rows) {
    table.innerHTML += rows.map(item => {
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
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
