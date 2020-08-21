<template>
  <footer>
    <div class="footer">
      <div style="padding:5vw 20vh">
        <div class="footer-item" v-for="(f,index) in footers" :key="index">
          <div class="footer-item-h">{{f.title}}</div>
          <div
            class="footer-item-p"
            v-for="(p,p_item) in f.items"
            :key="p_item"
            @click="footer_s(p.id)"
          >{{p.content}}</div>
        </div>
      </div>
    </div>
    <el-dialog title="加入我们" :visible.sync="join_box" width="30%">
      <el-form :model="join_form">
        <el-form-item label="qq">
          <el-input v-model="join_form.qq" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="join_box = false">取 消</el-button>
        <el-button type="primary" @click="join()">确 定</el-button>
      </div>
    </el-dialog>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footers: [
        {
          title: "关于我们",
          items: [
            {
              content: "编程猫",
              id: 0,
            },
            {
              content: "加入我们",
              id: 1,
            },
          ],
        },
        {
          title: "友情链接",
          items: [
            {
              content: "源码星球",
              id: 2,
            },
          ],
        },
        {
          title: "支持",
          items: [
            {
              content: "lai追求",
              id: 3,
            },
          ],
        },
      ],
      join_box: false,
      join_form: {
        qq: "",
      },
    };
  },
  methods: {
    join() {
      this.join_box = false;
      this.$store.commit("join", this.join_form.qq);
    },
    footer_s(id) {
      if (id == 0) {
        window.open("https://shequ.codemao.cn");
      } else if (id == 1) {
        var _this = this;
        this.$axios({ methods: "GET", url: "/api/isjoin" })
          .then(function () {
            this.join_box = true;
          })
          .catch(function (error) {
            if (error.response.status == 422) {
              this.$message({
                showClose: true,
                message: "您已经申请过了~",
                type: "warning",
              });
            } else if (error.response.status == 401) {
              _this.$message({
                showClose: true,
                message: "请先登录~",
                type: "warning",
              });
            } else {
              _this.$message({ type: "error", message: "未知错误" });
            }
          });
      }
    },
  },
};
</script>

<style>
.footer {
  width: 100vw;
  background: #1a1e2f;
  text-align: center;
}
.footer-item {
  display: inline-block;
  vertical-align: top;
  padding: 50px 40px;
}
.footer-item-h {
  color: #fff;
  margin-bottom: 15px;
  font-size: 17px;
}
.footer-item-p {
  color: #54565a;
  transition: 0.2s;
  cursor: pointer;
}
.footer-item-p:hover {
  color: #1280ff;
}
</style>