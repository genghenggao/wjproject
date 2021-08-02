<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-12 19:53:39
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-13 18:58:09
-->
<template>
  <div class="user-password">
    <el-card shadow="never">
      <template #header>
        <span style="font-size: 40px; text-align: center"
          >山西阳城阳泰集团晶鑫煤业股份有限公司武甲分公司</span
        >
      </template>
      <div class="content">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="(img, index) in imglist" :key="index">
            <img v-bind:src="img.url" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="padding-top: 15px">
        <span style="font-size: 16px; font-weight: 700">最新动态</span>
        <el-row :gutter="12">
          <el-col :span="6">
            <el-card shadow="hover">
              一、严格落实企业安全生产主体责任，认真贯彻执行各项安全生产方针政策，依法依规组织生产，不得超能力、超强度、超定员组织生产。
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              二、加强全员培训，提升作业人员的业务素质，提高矿井精细化管理能力，强化现场安全管理，提高安全生产水平和安全保障能力，构建安全生产长效机制。
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              三、抓紧办理煤矿安全生产许可证等相关证照和手续，加快完成煤矿生产能力登记公告和生产要素信息建档管理工作。未取得有效的相关证照及审批手续前，不得组织生产。
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              四、抓紧办理煤矿安全生产许可证等相关证照和手续，加快完成煤矿生产能力登记公告和生产要素信息建档管理工作。未取得有效的相关证照及审批手续前，不得组织生产。
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div style="padding-top: 15px">
        <el-descriptions title="公司相关信息">
          <el-descriptions-item label="公司名称："
            >山西阳城阳泰集团晶鑫煤业股份有限公司武甲分公司</el-descriptions-item
          >
          <el-descriptions-item label="联系人：">张先生</el-descriptions-item>
          <el-descriptions-item label="联系电话："
            >010-88888888</el-descriptions-item
          >
          <el-descriptions-item label="备注：">
            <el-tag size="small">山西阳城阳泰集团晶鑫煤业股份</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址："
            >山西阳城阳泰集团晶鑫煤业股份有限公司武甲分公司 1188
            号</el-descriptions-item
          >
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "companyintro",
  data() {
    return {
      imglist: [
        { url: require("../assets/image/carousel/image1.png") },
        { url: require("../assets/image/carousel/image2.png") },
        { url: require("../assets/image/carousel/image3.png") },
        { url: require("../assets/image/carousel/image4.png") },
        { url: require("../assets/image/carousel/image5.png") },
      ],
      // 图片父容器高度
      bannerHeight: 1000,
      // 浏览器宽度
      screenWidth: 0,
    };
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (400 / 1920) * this.screenWidth;
    },
  },
  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth;
    this.setSize();
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    };
  },
};
</script>

<style lang="scss" scoped>
// 标题居中
:deep .el-card__header {
  text-align: center !important;
}
// 最新动态框大小
.el-card.is-hover-shadow {
  height: 150px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
</style>