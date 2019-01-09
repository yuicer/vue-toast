import ToastComponent from './components/Toast.vue'

interface Param {
  msg: string
  durationTime?: number
  words?: string[] | string
}

class Toast {
  instance: any

  constructor(Vue: any, options = {}) {
    this.initInstance(Vue)
  }
  initInstance(Vue: any) {
    const ToastConstructor = Vue.extend(ToastComponent)
    const node = document.createElement('div')
    document.body.appendChild(node)
    this.instance = new ToastConstructor().$mount(node)
  }
  tip(msg: string, { durationTime = 1500 } = {}) {
    return open.call(this, 'tip', { msg, durationTime })
  }
  alert(msg: string, { words = '确定' } = {}) {
    return open.call(this, 'alert', { msg, words })
  }
  confirm(msg: string, { words = ['取消', '确定'] } = {}) {
    return open.call(this, 'confirm', { msg, words })
  }
}

const open = function(
  type: string,
  { msg, durationTime, words }: Param
): Promise<boolean> {
  return new Promise<boolean>((reslove, reject) => {
    const param = {
      type,
      msg,
      callback: (res: boolean) => {
        res ? reslove(res) : reject(res)
      }
    }

    if (durationTime) Object.assign(param, { durationTime })

    if (words) Object.assign(param, { words })

    this.instance.transformer(param)
  })
}

export default (Vue: any, options: object) => new Toast(Vue, options)
