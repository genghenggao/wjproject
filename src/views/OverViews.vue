<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-12 14:48:03
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-12 16:53:12
-->
  
  <template>
  <div class="user-list">
    <!-- <el-card shadow="never" style="padding: 0"> -->
    <div class="data-overview">
      <div id="data-view">
        <top-header />

        <div class="main-content">
          <digital-flop />

          <div class="block-left-right-content">
            <ranking-board />

            <div class="block-top-bottom-content">
              <div class="block-top-content">
                <rose-chart />

                <water-level-chart />

                <scroll-board />
              </div>

              <cards />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </el-card> -->
  </div>
</template>

<script>
import topHeader from "@/components/monitor/topHeader";
import digitalFlop from "@/components/monitor/digitalFlop";
import rankingBoard from "@/components/monitor/rankingBoard";
import roseChart from "@/components/monitor/roseChart";
import waterLevelChart from "@/components/monitor/waterLevelChart";
import scrollBoard from "@/components/monitor/scrollBoard";
import cards from "@/components/monitor/cards";
export default {
  name: "OverView",
  components: {
    topHeader,
    digitalFlop,
    rankingBoard,
    roseChart,
    waterLevelChart,
    scrollBoard,
    cards,
  },
};
</script>

<style lang="scss">
//

.main-container .el-main {
  // padding: 0.6em;
  padding: 0.1em;
}
.data-overview {
  background-image: url("../components/monitor/img/bg.png");
  background-size: 100% 100%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
}

#data-view {
  background-image: url("../components/monitor/img/bg.png");
  background-size: 100% 100%;
  //   width: 100%;
  //   height: 100%;
  box-shadow: 0 0 3px blue;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  color: #fff;

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 10px;
  }

  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
  }

  .block-top-content {
    height: 55%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 10px;
  }
}
</style>