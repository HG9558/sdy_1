export const handleRealName = (str: string | undefined) => {
  if (null != str && str != undefined && str != '') {
    if (str.length <= 3) {
      return str.substring(0, str.length - 1) + "*";
    } else if (str.length > 3 && str.length <= 6) {
      return str.substring(0, str.length - 2) + "**";
    } else if (str.length > 6) {
      return str.substring(0, 2) + "****" + str.substring(6, str.length);
    }
  } else {
    return "";
  }
}

export const formatMobile = (mobile: string) => {
  let new_mobile = '';
  if (mobile.length > 7) {
    new_mobile = mobile.substring(0, 3) + "****" + mobile.substring(7);
  }
  return new_mobile;
}

export const formatEmail = (email: string) => {
  let new_email = '';
  if (String(email).indexOf("@") > 0) {
    let str = email.split("@"),
      _s = "";
    if (str[0].length > 3) {
      for (var i = 0; i < str[0].length - 3; i++) {
        _s += "*";
      }
    }
    new_email = str[0].substring(0, 3) + _s + "@" + str[1];
  }
  return new_email;
}
