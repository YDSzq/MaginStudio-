<template>
  <div>
    <div class="works" v-for="(work,item) in works" :key="item">
        <router-link :to="'/work/'+work.id">
            <div class="work_item">
                <div class="work_img_wrap">
                    <span class="work_img" :style="'background-image:url('+work.preview+');'"></span>
                    <span></span>
                </div>
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
                        <router-link target="_blank"
                            :to="'https://shequ.codemao.cn/user/'+work.user.id">{{work.user.nickname}}</router-link>
                    </p>
                </div>
            </div>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      works:[]
    }
  },
  created() {
    this.$axios({
      method: "POST",
      url:
        "/api/works",
      data:{'works_n':this.works.length+20},
    })
      .then((response) => {
        this.works=response;
      })
      .catch((error) => {
        console.log(error); //请求失败返回的数据
        this.$message.error("未知错误")
      });
  },
};
</script>

<style>
@import url(../assets/work.css);
</style>