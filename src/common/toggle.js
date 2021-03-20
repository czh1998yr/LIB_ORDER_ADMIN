//创建折叠方法
export default {
  toggle(e) {
    var column = e.target;
    var row = column.parentElement;
    var menux = row.lastChild
    if(menux.style.display === 'block') {
      menux.style.display = 'none'
    } else {
      menux.style.display = 'block'
    }
  }
}