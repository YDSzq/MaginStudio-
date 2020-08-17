<template>
  <div>home</div>
</template>

<script>
export default {
  created() {
    this.$axios({
      method: "get",
      url:
        "/api/web/works/subjects/1061/works?&offset=0&limit=20&sort=-audited_at,-id&user_id=371087&work_subject_id=1061",
      headers: {
        "Access-Control-Allow-Headers":
          "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild",
      },
    })
      .then((response) => {
        console.log(response); //请求成功返回的数据
      })
      .catch((error) => {
        console.log(error); //请求失败返回的数据
      });
  },
};
</script>

<style>
</style>