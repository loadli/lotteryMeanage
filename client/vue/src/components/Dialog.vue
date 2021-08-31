<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-30 23:10:29
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-30 23:35:44
 * @Description  : 模块
 * @FilePath     : \lottery\src\components\module.vue
-->
<template>
  <div>
    <template v-if="visible">
      <div class="modal__mask"></div>
      <div class="modal__wrapper">
        <div class="modal__content">
          <div class="modal__header">
            <span class="modal__title">恭喜中奖！</span>
            <span class="modal__headerbtn" @click="closeDialog('close')"
              >X</span
            >
          </div>
          <div class="modal__body">
            <div class="wrapper">
              <img src="" alt="奖品图片" />
              <div class="title">恭喜获得XXX</div>
              <div class="desc">
                <p>本次抽中的矿石已累加到你的当前矿石数中</p>
              </div>
              <div class="submit__btn" @click="closeDialog('again')">
                再抽一次
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    visible: Boolean,
    prizeInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    closeDialog(cb) {
      this.$emit("update:visible", false);
      this.$emit("closeDialog", cb);
    },
  },
};
</script>

<style lang="scss">
.modal__mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.modal__wrapper {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  z-index: 11;
  .modal__content {
    width: 400px;
    padding: 0;
    top: 50%;
    transform: translateY(-50%);

    position: relative;
    margin: 0 auto 50px;
    // padding: 16px;
    background: #fff;
    border-radius: 2px;
    // -webkit-box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
    // box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
    // top: 100px;
    color: #282f38;

    .modal__header {
      font-size: 16px;
      font-weight: 600;
      padding: 0 20px;
      line-height: 56px;
      border-bottom: solid 1px #e5e6eb;

      .modal__title {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
      }

      .modal__headerbtn {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        position: absolute;
        top: 0;
        right: 0;
        color: #939aa3;
        border: none;
        outline: 0;
        cursor: pointer;
      }
    }

    .modal__body {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: justify;
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          padding-top: 20px;
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;
          text-align: center;
          color: #d25f00;
          opacity: 0.8;
        }
        .desc {
          text-align: center;
          p {
            margin: 0;
            padding-top: 8px;
            font-size: 14px;
            line-height: 22px;
            color: #1d2129;
          }
        }
        .submit__btn {
          margin-top: 32px;
          margin-bottom: 40px;
          padding: 0;
          width: 200px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background-color: #1d7dfa;
          border-radius: 50px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
