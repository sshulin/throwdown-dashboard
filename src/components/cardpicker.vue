<template>
    <div class="cardpicker">
      <div class="cardpicker__pool">
        <draggable v-model="cards_array_computed" :options="{group: {name: 'cards',  pull:'clone'}, sort: false, handle: '.cardpicker__dragger--available'}">
          <div class="cardpicker__card cardpicker__card--aval" v-for="card in cards_array_computed">
            <div class="cardpicker__dragger" v-bind:class="{ 
              'cardpicker__dragger--available': !checkCard(card), 
              'cardpicker__dragger--disabled': checkCard(card) 
              }">
                <i class="fa fa-ellipsis-v"></i>
            </div>
            {{ cards[card].name }}
            <div class="cardpicker__action">
              <i class="fa fa-plus" v-if="!checkCard(card)" v-on:click="addCard(card)"></i>
              <i class="fa fa-minus" v-if="checkCard(card)" v-on:click="removeCard(card)"></i>
            </div>
          </div>
        </draggable>
      </div>
      <div class="cardpicker__hand">
        <draggable v-model="hand_computed" :options="{group:'cards', handle: '.cardpicker__dragger--available'}" v-if="hand.length > 0">
          <div class="cardpicker__card cardpicker__card--hand" v-for="card in hand">
            <div class="cardpicker__dragger cardpicker__dragger--available">
                <i class="fa fa-ellipsis-v"></i>
            </div>
            {{ cards[card].name }}
            <div class="cardpicker__action">
              <i class="fa fa-minus" v-on:click="removeCard(card)"></i>
            </div>
          </div>
        </draggable>
      </div>
    </div>
</template>

<script>

import TableCards from '@/data/table-cards.js';
import TableCombos from '@/data/table-combos.js';
import TableRaces from '@/data/table-races.js';
import Hand from '@/data/hand.js';

import CardPreview from '@/components/card-preview.vue';
import draggable from 'vuedraggable'

  
export default {
  components: { CardPreview, draggable },
  data: function(){
    return { 
      test: 'test',
      cards: TableCards,
      hand: Hand.value,
      cards_array: [],
      combos: TableCombos,
      selected_base_id: '',
      selected_mod_id: '',
      selected_base_combos: null,
      selected_mod_combos: null,
      races: TableRaces
    }
  },
  computed: {
    hand_computed: {
      get: function() {
        return this.hand;
      },
      set: function(newValue) {
        Hand.value = newValue;
        this.hand = Hand.value;
      }
    },
    cards_array_computed: {
      get: function() {
        return Object.keys(this.cards);
      },
      set: function() {
        return false;
      }
    }
  },
  methods: {
    addCard: function(id) {
      Hand.add(id);
      this.hand = Hand.value;
    },
    removeCard: function(id) {
      Hand.remove(id);
      this.hand = Hand.value;
    },
    checkCard: function(id) {
      if(!this.hand || this.hand.length == '0') {
        return false;
      }
      return Hand.check(id);
    }
  },
  created: function () {
    let vm = this;
    vm.cards_array = Object.keys(this.cards);
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
    height: 30px;
    line-height: 18px;
    margin-bottom: 5px;
    padding: 5px 10px;
    position: relative;
    &--aval {
      display: block;
    }
    &--hand {
      display: inline-block;
    }
  }
  &__pool &__card--hand {    
    &.sortable-ghost {
      display: none;
    }
  }
  &__dragger {
    float: left;
    height: 30px;
    line-height: 30px;
    margin-left: -10px;
    margin-top: -5px;
    text-align: center;
    width: 30px;
    &--available {
      cursor: move;
    }
    &--disabled {
      opacity: 0.25;
    }
  }
  &__action {
    display: inline-block;
  }
}
</style>