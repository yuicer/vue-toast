## vue-toast

### instroction

vue-ui-plugin for mobile,

### install

```
  npm i @yuicer/vue-toast
```

### usage

```js
import toast from '@yuicer/toast'
Vue.use(toast)

// within vue components
this.$toast.alert('hello').then()

// within js , must be used after installed 【Vue.use(toast)】
import { toast } from '@yuicer/toast'
toast
  .confirm('hello')
  .then()
  .catch()
```

### options

toast has three functions【tip, alert confirm】, all of them return a promise with properly value

```js
  toast.tip( msg: String, { durationTime?: Number = 1500 } )
  toast.alert( msg: String, { words? :String = '确定' } )
  toast.confirm( msg: String, { words? :String[2] = ['取消', '确认'] } )
```

### undo
