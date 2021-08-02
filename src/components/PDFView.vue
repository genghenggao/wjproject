<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-29 18:40:31
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-30 16:30:00
-->
<template>
  <div class="overflowAuto" style="">
    <!-- canvas渲染方式 -->
    <pdf :url="pdfUrl" :type="'canvas'" :pdfjsDistPath="'/static'" />
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from "vue";
import pdf from "@/components/pdf/pdf";
export default {
  name: "PDFView",
  components: {
    pdf,
  },
  setup() {
    const state = reactive({ pdfUrl: "" });
    onMounted(() => {
      init();
    });
    const init = () => {
      state.pdfUrl = "/api/wjproject/media/" + "PDF文件提示.pdf";
    };
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.overflowAuto {
  overflow-y: auto;
  position: absolute;
  width: 85%;
  height: 100%;
}
.overflowAuto::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.overflowAuto::-webkit-scrollbar-thumb {
  background: rgb(224, 214, 235);
}
</style>