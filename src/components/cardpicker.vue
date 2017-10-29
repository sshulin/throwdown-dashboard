<template>
    <div class="cardpicker">
      <div class="cardpicker__pool">
        <div class="cardpicker__card cardpicker__card--aval" v-for="card in cards">
          {{ card.name }}
          <i class="fa fa-plus" v-if="!checkCard(card.id)" v-on:click="addCard(card.id)"></i>
          <i class="fa fa-minus" v-if="checkCard(card.id)" v-on:click="removeCard(card.id)"></i>
        </div>
      </div>
      <div class="cardpicker__hand">
        <div class="cardpicker__card cardpicker__card--hand" v-for="card in hand_all">
          {{ cards[card].name }}
          <i class="fa fa-minus" v-on:click="removeCard(card)"></i>
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
      hand_all: Hand.value,
      selected_base_id: '',
      selected_mod_id: '',
      selected_base_combos: null,
      selected_mod_combos: null,
      races: TableRaces
    }
  },
  methods: {
    addCard: function(id) {
      Hand.add(id);
      this.hand_all = Hand.value;
    },
    removeCard: function(id) {
      Hand.remove(id);
      this.hand_all = Hand.value;
    },
    checkCard: function(id) {
      if(!this.hand_all || this.hand_all.length == '0') {
        return false;
      }
      return Hand.check(id);
    }
  },
  created: function () {
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
    background: rgba(0,0,0,0.05125);
    box-sizing: border-box;
    margin-bottom: 5px;
    &--aval {
      display: block;
      padding: 5px 10px;
    }
    &--hand {
      display: inline-block;
      padding: 3px;
    }
  }
}
</style>