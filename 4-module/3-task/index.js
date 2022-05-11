function highlight(table) {
  // ваш код...
  let tr = table.rows;

  for (let i = 1; i < tr.length; i++) {
    let age = tr[i].cells[1];
    let gender = tr[i].cells[2];
    let status = tr[i].cells[3];

    if (status.getAttribute('data-available') == 'true') {
      tr[i].classList.add('available');
    } else {
      tr[i].classList.add('unavailable');
    }

    tr[i].hidden = !(status.hasAttribute('data-available'));

    if (gender.textContent == 'm') {
      tr[i].classList.add('male');
    } else {
      tr[i].classList.add('female');
    }

    if (+age.textContent < 18) {
      tr[i].style.textDecoration = 'line-through';
    }
  } 
}
