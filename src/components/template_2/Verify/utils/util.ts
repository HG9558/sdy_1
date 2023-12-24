/* eslint-disable */
export const resetSize = (barSize: { width: string; height: string }, imgSize: { width: string; height: string }) => {
  const img_width = imgSize.width;
  const img_height = imgSize.height;
  const bar_width = barSize.width;
  const bar_height = barSize.height;	// 图片的宽度、高度，移动条的宽度、高度

  return { imgWidth: img_width, imgHeight: img_height, barWidth: bar_width, barHeight: bar_height }
}

export const _code_chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export const _code_color1 = ['$c-fff0', '#f0ffff', '#f0fff0', '$c-f0f0']
export const _code_color2 = ['#FF0033', '#006699', '#993366', '#FF9900', '#66CC66', '#FF33CC']
