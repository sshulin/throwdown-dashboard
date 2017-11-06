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
      <div class="card__image">
        <img v-bind:src="'https://cartoon-battle.narzekasz.pl/deck/cards/' + races[card.race_id].system_name + '_' + card.picture + '.png'">
      </div>
      <div class="card__description">
        {{ card.desc }}
      </div>
      <div class="card__prop card__prop--race">
        <div class="card__prop-label">
          Type:
        </div>
        <div class="card__prop-val">
          {{ races[card.race_id].name }}
        </div>
      </div>
      <div class="card__prop card__prop--attack">
        <div class="card__prop-label">
          Attack:
        </div>
        <div class="card__prop-val">
          {{ card.base_attack }}
        </div>
      </div>
      <div class="card__prop card__prop--health">
        <div class="card__prop-label">
          Health:
        </div>
        <div class="card__prop-val">
          {{ card.base_health }}
        </div>
      </div>
      <div class="card__prop card__prop--trait" v-if="card.trait_id">
        <div class="card__prop-label">
          Trait:          
        </div>
        <div class="card__prop-val">
          {{ traits[card.trait_id].name }}          
        </div>
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
import TableTraits from '@/data/table-traits.js';
import Hand from '@/data/hand.js';

export default {
  name: 'card-preview',
  data: function(){
    return {
      combos: TableCombos,
      combos_number: 0,
      hand_base: Hand.base,
      hand_mods: Hand.mods,
      opened: false,
      races: TableRaces,
      rarities: TableRarities,
      traits: TableTraits,
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
    this.card.picture = this.card.picture.replace(/bb_/g, '').replace(/BB_/g, '').replace(/fg_/g, '').replace(/FG_/g, '').replace(/fr_/g, '');
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
  width: 440px;
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
  &__name {
    font-weight: bold;
  }
  &__body {
    background: rgba(255,255,255,0.95);
    border-bottom: 1px solid rgba(0,0,0,0.5);
    border-left: 1px solid rgba(0,0,0,0.5);
    border-right: 1px solid rgba(0,0,0,0.5);
    box-sizing: border-box;
    height: 330px;
    padding-bottom: 10px;
    padding-left: 240px;
    padding-right: 10px;
    padding-top: 10px;
    position: relative;
  }
  &__description {
    font-style: italic;
    margin-bottom: 10px;
  }
  &__prop {
    height: 1.15em;
    margin-bottom: 5px;
    position: relative;
    &:after {
      clear: both;
      content: ' ';
      display: table;
    }
    &--attack {

    }
    &--health {

    }
  }
  &__prop-label {
    float: left;
  }
  &__prop-val {
    float: right;
    font-weight: bold;
  }
  &__image {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    img {
      height: 100%;
    }
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