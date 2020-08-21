<template>
  <div>
    <div class="all-work-boxs" v-loading="loading">
      <el-row>
        <el-col :span="6" v-for="(work,item) in works.items" :key="item">
          <div class="works">
            <div class="work_item">
              <a target="_blank" :href="'https://shequ.codemao.cn/work/'+work.id">
                <div class="work_img_wrap">
                  <span class="work_img" :style="'background-image:url('+work.preview+');'"></span>
                  <span></span>
                </div>
              </a>
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
            @current-change="topost"
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
      loading:true,
    };
  },
  methods: {
    getwork(p) {
      this.$axios({
        method: "POST",
        url: "/api/works",
        data: { works_n: (p - 1) * 20 + 20 },
      })
        .then((response) => {
          this.works = response.data;
          this.loading=false;
        })
        .catch((error) => {
          console.log(error); //请求失败返回的数据
          this.loading=false;
          this.$message.error("未知错误");
        });
    },
    topost(currentPage) {
      this.getwork(currentPage);
    },
  },
  created() {
    this.loading=true;
    this.getwork(1);
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