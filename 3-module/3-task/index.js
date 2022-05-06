function camelize(str) {
  // ваш код...
  return str.split('-')
            .reduce( (result, item) => 
                        result + "" + item[0].toUpperCase() + item.slice(1) );
}
