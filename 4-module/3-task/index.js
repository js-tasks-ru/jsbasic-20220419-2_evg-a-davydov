function highlight(table) {
  // ваш код...
  let trs = table.querySelector('tbody').rows;

  for (tr of trs) {
    let age = tr.cells[1];
    let gender = tr.cells[2];
    let status = tr.cells[3];

    if (status.dataset.available == 'true') {
      tr.classList.add('available');
    } else {
      tr.classList.add('unavailable');
    }

    tr.hidden = !(status.dataset.available);

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
