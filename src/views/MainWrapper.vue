<template>
    <div>
        <MainMenu></MainMenu>
        <div id="view-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import MainMenu from '../components/MainMenu.vue'
export default {
  name: 'MainWrapper',
  components: {
    MainMenu
  }
}
</script>

<style lang="scss" scoped>
    #view-content {
        padding: 10px 0px 10px;
        max-width: 1180px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }
</style>
