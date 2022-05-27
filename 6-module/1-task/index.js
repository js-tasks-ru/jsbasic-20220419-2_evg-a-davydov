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
    this.elem = function() {
      const table = document.createElement('TABLE');
      const tBody = document.createElement('TBODY');

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

      table.append(tBody);

      return table;
    }();

    const tBody = this.elem.querySelector('tbody');

    this.addTableElements(tBody, rows);
  }

  addTableElements(tBody, rows) {
    tBody.innerHTML += rows.map(item => {
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

    tBody.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.closest('TR').remove();
      }  
    });
  }
}
