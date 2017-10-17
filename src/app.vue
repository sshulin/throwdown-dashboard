<template>
    <div id="app">
        <div class="layout">
            <div class="layout__sidebar">
              <sidebar></sidebar>
            </div>
            <div class="layout__content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

import  Sidebar from '@/components/sidebar.vue';
  
export default {
  components: { Sidebar },
};

</script>

<style lang="scss">

@import "./styles/normalize.scss";
@import "./styles/fonts.scss";
@import "./styles/font-awesome/font-awesome.scss";

body {
  font-family: 'Noto Sans', sans-serif;
}
.layout {
  display: flex;
  height: 100vh;
  &__sidebar {
    background: #f0f0f0;
    flex-shrink: 0;
    padding: 10px;
    width: 150px;
  }
  &__content {
    padding: 10px;
    flex-grow: 1;
  }
}
</style>