<template>
  <footer>
    <div class="footer">
      <div class="footer-item" v-for="(f,index) in footers" :key="index">
        <div class="footer-item-h">{{f.title}}</div>
        <div class="footer-item-p" v-for="(p,p_item) in f.items" :key="p_item">{{p.content}}</div>
      </div>
    </div>
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
            },
            {
              content: "编程猫",
            },
            {
              content: "编程猫",
            },
          ],
        },
      ],
    };
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
  padding-bottom: 90px;
}
.footer-item-h {
  color: #fff;
  margin-bottom: 15px;
  font-size: 17px;
}
.footer-item-p {
  color: #54565a;
  transition: 0.2s;
}
.footer-item-p:hover {
  color: #1280ff;
}
</style>