<template>
    <div class="cardpicker">
      <div class="cardpicker__pool">
        <card-preview v-for="item in cards"  :card="item"></card-preview>         
      </div>
      <div class="cardpicker__hand">
        <div class="cardpicker__card" v-for="card in hand_all">
          {{ cards[card].name }}
        </div>
      </div>
    </div>
</template>

<script>

import TableCards from '@/data/table-cards.js';
import TableCombos from '@/data/table-combos.js';
import TableRaces from '@/data/table-races.js';
import Hand from '@/data/hand.js';

import  CardPreview from '@/components/card-preview.vue';
  
export default {
  components: { CardPreview },
  data: function(){
    return { 
      test: 'test',
      cards: TableCards,
      combos: TableCombos,
      hand_base: Hand.base,
      hand_mods: Hand.mods,
      hand_all: [],
      selected_base_id: '',
      selected_mod_id: '',
      selected_base_combos: null,
      selected_mod_combos: null,
      races: TableRaces
    }
  },
  methods: {
  },
  created: function () {
    this.hand_all = this.hand_base.concat(this.hand_mods);
  },
};
</script>

<style lang="scss">

.cardpicker {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 100px;
  position: relative;
  &__pool {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
  }
  &__hand {
    box-sizing: border-box;
    border-top: 1px solid #f0f0f0;
    bottom: 0;
    height: 100px;
    left: 0;
    overflow-y: auto;
    padding: 10px;
    position: absolute;
    width: 100%;
  }
  &__card {
    border: 1px solid rgba(0,0,0,0.5);
    display: inline-block;
    padding: 3px;
  }
}
</style>