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
  font-size: 0.16rem;
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
  border-radius: 0.06rem;
  padding: 0.1rem 0.2rem;
  min-width: 1.04rem;
  max-width: 2.95rem;
}
.confirm {
  width: 3rem;
  border-radius: 0.1rem;
  background: #fff;
  > .content {
    padding: 0.36rem 0.2rem;
  }
  > .options {
    height: 0.48rem;
    line-height: 0.48rem;
    font-size: 0.18rem;
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
  width: 3rem;
  border-radius: 0.1rem;
  background: #fff;
  > .content {
    padding: 0.36rem 0.2rem;
  }
  > .options {
    font-size: 0.18rem;
    border-top: 1px solid $color-dividers;
    height: 0.48rem;
    line-height: 0.48rem;
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
          <div @click="closeConfirm(false)">{{words[0] || '取消'}}</div>
          <div @click="closeConfirm(true)">{{words[1] || '确认'}}</div>
        </div>
      </div>

      <!-- alert -->
      <div class="alert toast" v-else-if="isAlertShow">
        <div class="content">{{msg}}</div>
        <div class="options">
          <div @click="closeAlert()">{{words.toString() || '确定'}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
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
    transformer({ type, msg, words, durationTime, callback = () => {} }) {
      // only one toast runs the time
      if (this.isDisplay) {
        return
      }
      this.isDisplay = true

      msg && (this.msg = msg)
      words && (this.words = words)
      durationTime && (this.durationTime = durationTime)
      this.callback = callback

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
    closeTip() {
      setTimeout(() => {
        this.isTipShow = false
        this.close()
      }, this.durationTime)
    },
    closeConfirm(result = true) {
      this.isConfirmShow = false
      this.close(result)
    },
    closeAlert() {
      this.isAlertShow = false
      this.close()
    },
    close(result = true) {
      this.isDisplay = false
      this.callback(result)
    }
  }
}
</script>
