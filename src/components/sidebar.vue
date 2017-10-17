<template>
    <div class="sidebar">
      <router-link exact-active-class="sidebar__link--active" to="/" class="sidebar__link">Dashboard</router-link>
      <router-link active-class="sidebar__link--active" to="/cardpicker" class="sidebar__link">Cardpicker</router-link>
    </div>
</template>

<script>
  
export default {
  name: 'sidebar',
  data: function(){
    return { 
      test: 'test',
    }
  },
  methods: {
  }
};
</script>

<style lang="scss">

.sidebar {  
  &__link {
    color: black;
    display: block;
    font-weight: bold;
    text-decoration: none;
    margin-bottom: 5px;
    &--active {
      color: rgb(0, 130, 214);
    }
    &:not(&--active) {
      color: rgb(122, 122, 122);
    }
  }
}
</style>