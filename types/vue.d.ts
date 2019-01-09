/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue'
import Toast from './index'

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }
}
