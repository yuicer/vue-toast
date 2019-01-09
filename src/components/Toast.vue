<style lang="scss" scoped>
$lineColor: #e3e5e8;
$color-link: #408fff;
$color-primary: #242629;
$color-dividers: #e3e5e8;
$color-shadow: rgba(0, 0, 0, 0.7);
.toast-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  transition: all 0.2s;
  color: $color-primary;
}
.toast {
  font-size: 16px;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  word-break: break-all;
}
.tip {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  padding: 10px 20px;
  min-width: 104px;
  max-width: 295px;
}
.confirm {
  width: 300px;
  border-radius: 10px;
  background: #fff;
  > .content {
    padding: 36px 20px;
  }
  > .options {
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 1px;
      width: 100%;
      transform: scaleY(0.5);
      background: $color-dividers;
    }
    > div {
      float: left;
      width: 50%;
      &:last-child {
        position: relative;
        color: $color-link;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          height: 100%;
          width: 1px;
          transform: scaleX(0.5);
          background: $color-dividers;
        }
      }
    }
  }
}
.alert {
  width: 300px;
  border-radius: 10px;
  background: #fff;
  > .content {
    padding: 36px 20px;
  }
  > .options {
    font-size: 18px;
    border-top: 1px solid $color-dividers;
    height: 48px;
    line-height: 48px;
    position: relative;
    overflow: hidden;
    color: $color-link;
  }
}
</style>
<template>
  <transition name="fade" mode="out-in">
    <div
      class="toast-box"
      v-if="isDisplay"
      :style="{backgroundColor:!isTipShow?'rgba(0,0,0,0.7)':''}"
    >
      <!-- tip -->
      <div class="tip toast" v-if="isTipShow">{{msg}}</div>

      <!-- confirm -->
      <div class="confirm toast" v-else-if="isConfirmShow">
        <div class="content">{{msg}}</div>
        <div class="options">
          <div @click="closeConfirm(false)">{{words[0]}}</div>
          <div @click="closeConfirm(true)">{{words[1]}}</div>
        </div>
      </div>

      <!-- alert -->
      <div class="alert toast" v-else-if="isAlertShow">
        <div class="content">{{msg}}</div>
        <div class="options">
          <div @click="closeAlert()">{{words.toString()}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'

interface Param {
  type: string
  msg: string
  callback: (res: boolean) => {}
  words?: string[] | string
  durationTime?: number
}

export default Vue.extend({
  name: 'vue-toast',
  data() {
    return {
      isDisplay: false,

      isTipShow: false,
      isConfirmShow: false,
      isAlertShow: false,

      msg: '',
      durationTime: 1500,
      words: [],

      callback: () => {}
    }
  },

  methods: {
    transformer({ type, msg, callback, words, durationTime }: Param) {
      // only one instance runs at a time
      if (this.isDisplay) {
        return
      }
      this.isDisplay = true

      this.msg = msg
      this.callback = callback
      if (words) this.words = words
      if (durationTime) this.durationTime = durationTime

      if (type === 'tip') {
        this.isTipShow = true
        // close after seconds
        this.closeTip()
      } else if (type === 'confirm') {
        this.isConfirmShow = true
      } else if (type === 'alert') {
        this.isAlertShow = true
      }
    },
    closeTip(): void {
      setTimeout(() => {
        this.isTipShow = false
        this.close()
      }, this.durationTime)
    },
    closeConfirm(result: boolean = true): void {
      this.isConfirmShow = false
      this.close(result)
    },
    closeAlert(): void {
      this.isAlertShow = false
      this.close()
    },
    close(result: boolean = true): void {
      this.isDisplay = false
      this.callback(result)
    }
  }
})
</script>
