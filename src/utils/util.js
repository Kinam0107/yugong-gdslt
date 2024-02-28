/**
 * @description 获取图片的宽高
 * @param {String} src 图片路径
 * @param {Number} maxWaitLoad 超时时间
 * @returns {Object} 图片的宽高
 */
export function getImgWidthHeight(src, maxWaitLoad = 2500) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = src
    if (img.complete) {
      const { width, height } = img
      resolve({ width, height })
    } else {
      let timeOut = setTimeout(() => {
        reject('图片加载失败！')
      }, maxWaitLoad)
      img.onload = function () {
        const { width, height } = img
        window.clearTimeout(timeOut)
        resolve({ width, height })
      }
    }
  })
}
