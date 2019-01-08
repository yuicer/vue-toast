## vue-toast

### undo

css 单位
情况考虑
打包发布
插件 options

### install

```
  npm i vue-toast
```

### usage

```js
import toast from '@yuicer/toast'
Vue.use(toast)

// within vue components
this.$toast.alert('hello')

// within js
import { toast } from '@yuicer/toast'
toast
  .confirm('hello')
  .then()
  .catch()
```

### options

```
  toast.tip()
  toast.alert()
  toast.confirm()
```
