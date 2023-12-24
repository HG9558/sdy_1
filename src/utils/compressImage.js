/**
 * 压缩图片
 * @param {File} file 需要压缩的图片
 * @param {Function} callback 压缩完成之后的回调
 */

export default function compressImage(file, callback) {
  const limitSize = 5120000
  if (file.size > limitSize) {
    let reader = new FileReader()
    let img = new Image()
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    reader.readAsDataURL(file)
    reader.onloadend = (e) => {
      img.src = e.target.result
    }
    img.onload = () => {
      // 图片宽高比例
      let ratio = img.width / img.height
      
      let targetHeight = Math.sqrt(limitSize / ratio)
      let targetWidth = targetHeight * ratio
          
      // canvas对图片进行缩放
      canvas.width = targetWidth
      canvas.height = targetHeight
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight)
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight)
      // canvas转为blob并上传
      canvas.toBlob(blob => {
        callback(blob)
      }, file.type || 'image/png')
    }
  } else {
    callback(file)
  }
}