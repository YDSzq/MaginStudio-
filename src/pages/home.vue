<template>
  <div>
    <div class="all-work-boxs">
      <el-row>
        <el-col :span="6" v-for="(work,item) in works.items" :key="item">
          <div class="works">
            <div class="work_item">
              <router-link :to="'/work/'+work.id">
                <div class="work_img_wrap">
                  <span class="work_img" :style="'background-image:url('+work.preview+');'"></span>
                  <span></span>
                </div>
              </router-link>
              <div class="work_detail">
                <h5 class="work_name">{{work.name}}</h5>
                <ul class="datas">
                  <li>
                    <span class="icon icon_view"></span>
                    <span class="num">{{work.view_times}}</span>
                  </li>
                  <li>
                    <span class="icon icon_prise"></span>
                    <span class="num">{{work.praise_times}}</span>
                  </li>
                </ul>
                <div class="line"></div>
                <p class="author">
                  <img :src="work.user.avatar_url" class="author_head" />
                  <a
                    target="_blank"
                    :href="'https://shequ.codemao.cn/user/'+work.user.id"
                  >{{work.user.nickname}}</a>
                </p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-pagination
            :page-size="20"
            style="text-align: center;"
            background
            layout="prev, pager, next"
            :total="works.total"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      works: [],
    };
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.$axios({
      method: "POST",
      url: "/api/works",
      data: { works_n: this.works.length + 20 },
    })
      .then((response) => {
        loading.close();
        this.works = response.data;
      })
      .catch((error) => {
        console.log(error); //请求失败返回的数据
        this.$message.error("未知错误");
      });
  },
};
</script>

<style>
@import url(../assets/work.css);
.all-work-boxs {
  width: 960px;
  position: relative;
  margin: auto;
  padding: 20px 0;
}
</style>