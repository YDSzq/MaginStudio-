<template>
  <div style="position:relative">
    <div class="navbar-s"></div>
    <div :class="this.navbarS>=100?'navbarS':''" class="navbar">
      <el-menu
        background-color="#1a1e2f"
        active-text-color="#fff"
        text-color="#bbb"
        :default-active="activeIndex"
        mode="horizontal"
        menu-trigger="click"
        router
      >
        <el-menu-item>
          <div class="codesp-logo" style="width:40px;height:40px;display:inline-block"></div>
        </el-menu-item>
        <el-menu-item index="/">发现</el-menu-item>
        <el-menu-item index="/team">团队</el-menu-item>
        <el-menu-item index="/forum">论坛</el-menu-item>
        <el-menu-item index="/activity">活动</el-menu-item>
        <el-menu-item class="right" v-if="!user.id">
          <span class="navbar-a" @click="sign_box=true;sign_name='in'">登录</span>
          /
          <span class="navbar-a" @click="sign_box=true;sign_name='up'">注册</span>
        </el-menu-item>
        <el-submenu class="right" v-if="user.id">
          <template slot="title">
            <el-avatar :size="30" :src="user.avatar_url" />
          </template>
          <el-menu-item @click="a()">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="sign_box" width="30%">
      <el-tabs v-model="sign_name">
        <el-tab-pane label="登录" name="in">
          <signin />
        </el-tab-pane>
        <el-tab-pane label="注册" name="up">
          <signup />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import signin from "./sign/signin";
import signup from "./sign/signup";
export default {
  data() {
    return {
      activeIndex: this.$route.path,
      navbarS: 0,
      user: this.$store.state.user,
      sign_box: false,
      sign_name: "in",
    };
  },
  components: {
    signin,
    signup,
  },
  mounted() {
    window.addEventListener("scroll", this.s);
  },
  methods: {
    s() {
      this.navbarS = document.documentElement.scrollTop;
    },
    sign_out() {
      this.$store.state.user = {};
      this.$store.commit("signout");
    },
  },
  created() {
    this.$store.commit("getuser");
  },
  watch: {
    "$store.state.user": function () {
      this.user = this.$store.state.user;
      console.log(this.$store.state.user);
    },
  },
};
</script>
<style>
.navbar {
  z-index: 100;
  width: 100%;
  user-select: none;
  top: 0;
  position: absolute;
}
.navbar-s {
  height: 60px;
}
.navbarS {
  animation: navbar_fixed 0.3s ease-out;
  top: 0;
  position: fixed;
  box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
}
@keyframes navbar_nofixed {
  0% {
    position: fixed;
    top: 0px;
    box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
  }
  100% {
    top: -60px;
    box-shadow: none;
  }
}
@keyframes navbar_fixed {
  0% {
    top: -60px;
    opacity: 0;
    box-shadow: none;
  }
  100% {
    top: 0;
    opacity: 1;
    box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
  }
}
.right {
  float: right !important;
}

.nav-divider {
  margin: 0;
  width: 90%;
  margin-left: 5%;
}

.el-menu {
  font-weight: 600 !important;
  border: none !important;
}
.navbar-a {
  transition: 0.3s;
}
.navbar-a:hover {
  color: #fff;
}
</style>
