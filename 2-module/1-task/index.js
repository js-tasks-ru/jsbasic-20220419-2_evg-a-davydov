function sumSalary(salaries) {
  let result = 0;

  for (let key in salaries) {
    if ( isNaN(salaries[key]) || !(isFinite(salaries[key])) ) break;
    result += salaries[key];
  }

  return result;
}
