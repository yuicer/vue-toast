import Toast from './src/index'

let toast = {}

export default {
  install: (Vue: any, options?: object) => {
    options = options || {}
    Vue.prototype.$toast = toast = new Toast(Vue, options)
  }
}
export { toast }
