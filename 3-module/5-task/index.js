function getMinMax(str) {
  // ваш код...
  let sortedNum = str.split(' ')
               .filter( item => isFinite(item) )
               .sort( (a, b) => a - b );

  return {
    min: +sortedNum[0],
    max: +sortedNum[sortedNum.length - 1],
  }
  
}
