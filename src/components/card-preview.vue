<template>
  <div class="card " v-bind:style="{background: rarities[card.rarity_id].color }" v-bind:class="{ 'card--blured': blured }">
    <div class="card__header">
      <span class="card__name">
        {{ card.id }} {{ card.name }}
      </span>
      <div class="card__actions">
        <span class="card__combos" v-on:click="select_id()">
          {{ combos_number }}
        </span>
        <span class="card__toggler" v-on:click="opened = !opened">
          <span class="fa fa-chevron-down" v-if="!opened"></span>
          <span class="fa fa-chevron-up" v-if="opened"></span>
        </span>
      </div>
    </div>
    <div class="card__body" v-if="opened">
      <div class="card__race">
        {{ races[card.race_id].name }}
      </div>
      <div class="card__section"><!--
        <div class="card__prop">
          <div class="card__label">
            Some value
          </div>
          <div class="card__val">
            1
          </div>
        --></div>
      </div>
    </div>
  </div>
</template>

<script>

import TableCards from '@/data/table-cards.js';
import TableCombos from '@/data/table-combos.js';
import TableRaces from '@/data/table-races.js';
import TableRarities from '@/data/table-rarities.js';
import TableHandBase from '@/data/table-hand-base.js';
import TableHandMods from '@/data/table-hand-mods.js';

export default {
  name: 'card-preview',
  data: function(){
    return {
      combos: TableCombos,
      combos_number: 0,
      hand_base: TableHandBase,
      hand_mods: TableHandMods,
      opened: false,
      races: TableRaces,
      rarities: TableRarities,
    }
  },
  methods: {
    select_id: function () {
      this.$emit('selection')
    },
    count_combos: function() {
      var vm = this;
      if(vm.card.type == "base"){
        return vm.combos.filter(function(combo){
          return (
            combo.base_id == vm.card.id
            && 
            vm.hand_mods.findIndex(function(item){
              return combo.mod_id == item
            }) != -1)
        }).length
      }else if(vm.card.type == 'mod'){
        return vm.combos.filter(function(combo){
          return (
            combo.mod_id == vm.card.id 
            && 
            (vm.hand_base.findIndex(function(item){
              return combo.base_id == item
            })) != -1)
        }).length      
      }
    }
  },
  created: function () {
    this.combos_number = this.count_combos();
  },
  props: ['card', 'blured']
}
</script>

<style lang="scss">
.card {
  background: rgba(0,0,0,0.05125);
  box-sizing: border-box;
  display: block;
  margin-bottom: 5px;

  &--blured {
    opacity: 0.25;
  }
  &--regular {
    background: #666666;
  }
  &--epic {
    background: #0082d6;
  }
  &__header {
    align-items: center;
    background: rgba(255,255,255,0.5);
    border: 1px solid rgba(0,0,0,0.5);
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  }
  &__body {
    background: rgba(255,255,255,0.75);
    border-bottom: 1px solid rgba(0,0,0,0.5);
    border-left: 1px solid rgba(0,0,0,0.5);
    border-right: 1px solid rgba(0,0,0,0.5);
    padding: 5px 10px;
  }
  &__name {
    font-weight: bold;
  }
  &__actions {
    color: rgba(0,0,0,0.75);
    cursor: pointer;
    display: flex;
    font-size: 18px;
    -webkit-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
  }
  &__combos {
    border: 1px solid rgba(0,0,0,0.75);
    border-radius: 50%;
    font-size: 14px;
    font-weight: bold;
    height: 18px;
    line-height: 18px;
    margin: 0 5px;
    text-align: center;
    width: 18px;  
  }
  &__toggler {
  }
}
</style>