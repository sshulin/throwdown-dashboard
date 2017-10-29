<template>
    <div class="emptyhand">
      Your hand is empty. You can configure your hand with <router-link to="/cardpicker">cardpicker</router-link>.
    </div>
</template>

<script>

export default {
  name: 'empty-hand',
  data: function(){
    return { 
      hand_all: Hand.value,
    }
  },
  methods: {
  },
  created: function () {
  },
};
</script>

<style lang="scss">

.emptyhand {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  position: relative;
  &__link {
    
  }
}
</style>