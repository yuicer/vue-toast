import Toast from './src/index.js'

let toast = {}

export default {
  install: (Vue, options = {}) => {
    Vue.prototype.$toast = toast = Toast(Vue, options)
  }
}
export { toast }
