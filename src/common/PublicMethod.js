const publicMethod = {

  getTimestamp(time) { //把时间日期转成时间戳
    return (new Date(time)).getTime() / 1000
  }

}
export {
  publicMethod
}