function highlight(table) {
  // ваш код...
  let trs = table.rows;

  for (tr of trs) {
    let age = tr.cells[1];
    let gender = tr.cells[2];
    let status = tr.cells[3];

    if (status.getAttribute('data-available') == 'true') {
      tr.classList.add('available');
    } else {
      tr.classList.add('unavailable');
    }

    tr.hidden = !(status.hasAttribute('data-available'));

    if (gender.textContent == 'm') {
      tr.classList.add('male');
    } else {
      tr.classList.add('female');
    }

    if (+age.textContent < 18) {
      tr.style.textDecoration = 'line-through';
    }
  } 
}
