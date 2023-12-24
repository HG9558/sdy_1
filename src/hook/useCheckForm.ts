
export default () => {
  //- 手机校验
  const checkPhone = (phone: string, area = 1) => {
    if (area === 2) {
      const account = /^09[0-9]\d{7}$/
      return account.test(phone)
    } else {
      const account = /^1[1-9]\d{9}$/
      return account.test(phone)
    }
  }

  // 邮箱校验
  const getEail = (email: string) => {
    const REXEail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return REXEail.test(email)
  }

  return {
    checkPhone,
    getEail,
  }
}