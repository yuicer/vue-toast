import ToastComponent from './components/Toast.vue'

class Toast {
  /* eslint-disable-next-line */
  constructor(Vue, options = {}) {
    this.initInstance(Vue)
  }
  initInstance(Vue) {
    const ToastConstructor = Vue.extend(ToastComponent)
    const node = document.createElement('div')
    document.body.appendChild(node)
    this.instance = new ToastConstructor().$mount(node)
  }
  tip(msg, { durationTime } = {}) {
    return open.call(this, 'tip', { msg, durationTime })
  }
  alert(msg, { words = '' } = {}) {
    return open.call(this, 'alert', { msg, words })
  }
  confirm(msg, { words = '' } = {}) {
    return open.call(this, 'confirm', { msg, words })
  }
}

const open = function(type, { msg, durationTime, words }) {
  return new Promise((reslove, reject) => {
    const param = {
      type,
      msg,
      callback: res => {
        res ? reslove(res) : reject(res)
      }
    }
    durationTime && Object.assign(param, { durationTime })
    words && Object.assign(param, { words })
    this.instance.transformer(param)
  })
}

export default (Vue, options) => new Toast(Vue, options)
