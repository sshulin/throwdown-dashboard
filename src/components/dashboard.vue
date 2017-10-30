<template>
    <div class="dashboard">
      <empty-hand v-if="hand.length == 0"></empty-hand>
      <div class="dashboard__bank">
        <div class="dashboard__col">
          <card-preview v-for="item in hand_base"  v-on:selection="select_base_id(item)" :card="cards[item]" :blured="(selected_base_combos &&
          selected_base_combos.indexOf(item) == -1)"></card-preview>      
        </div>
        <div class="dashboard__col">
          <card-preview v-for="item in hand_mods"  v-on:selection="select_mod_id(item)" :card="cards[item]" :blured="(selected_mod_combos &&
          selected_mod_combos.indexOf(item) == -1)"></card-preview>        
        </div>
      </div>
    </div>
</template>

<script>

import TableCards from '@/data/table-cards.js';
import TableCombos from '@/data/table-combos.js';
import TableRaces from '@/data/table-races.js';
import Hand from '@/data/hand.js';

import  EmptyHand from '@/components/empty-hand.vue';
import  CardPreview from '@/components/card-preview.vue';
  
export default {
  components: { CardPreview, EmptyHand },
  data: function(){
    return { 
      cards: TableCards,
      combos: TableCombos,
      hand: Hand.value,
      hand_base: Hand.base,
      hand_mods: Hand.mods,
      selected_base_id: '',
      selected_mod_id: '',
      selected_base_combos: null,
      selected_mod_combos: null,
      races: TableRaces
    }
  },
  methods: {
    select_base_id: function(id) {
      var vm = this;
      vm.selected_mod_id = '';
      vm.selected_base_id = id;
      vm.selected_base_combos = null;
      vm.selected_mod_combos = vm.combos.filter(function(combo){
        return (
          combo.base_id == id 
          && 
          (vm.hand_mods.findIndex(function(item){
            return combo.mod_id == item
          })) != -1)
        }).map(function(combo){
          return combo.mod_id
        })
    },
    select_mod_id: function(id) {
      var vm = this;
      vm.selected_base_id = '';
      vm.selected_mod_id = id;
      vm.selected_mod_combos = null;
      vm.selected_base_combos = vm.combos.filter(function(combo){
        return (
          combo.mod_id == id 
          && 
          (vm.hand_base.findIndex(function(item){
            return combo.base_id == item
          })) != -1)
        }).map(function(combo){
          return combo.base_id
        })
    }
  }
};
</script>

<style lang="scss">

.dashboard {
  box-sizing: border-box;
  padding: 10px;
  &__bank {
    display: flex;
    margin-left: -5px;
    margin-right: -5px;
  }
  &__col {
    box-sizing: border-box;
    padding-left: 5px;
    padding-right: 5px;
    width: 50%;    
  }
}
</style>