<template>
    <div>
        <el-menu
        :default-active="activeIndex"
        class="main-menu"
        mode="horizontal"
        @select="handleSelect">
            <el-menu-item index="1">
              <router-link class="flower-list" to="/flower-list?page=1">
                Flowers List
              </router-link>
            </el-menu-item>
            <el-menu-item @click="logout"  class="logout"  index="2" >
                logout
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'MainMenu',
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpirationTime')
      localStorage.removeItem('role')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
    .logout {
        margin-left: auto !important;
    }

    a:link {
      text-decoration: none
    }
</style>
