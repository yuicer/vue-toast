import Toast from './src/index'

let toast = {}

export default {
  install: (Vue: any, options?: object) => {
    options = options || {}
    Vue.prototype.$toast = toast = Toast(Vue, options)
  }
}
export { toast }
