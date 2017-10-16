<template>
    <div class="cardpicker">
      {{ test }}
    </div>
</template>

<script>

import TableCards from '@/data/table-cards.js';
import TableCombos from '@/data/table-combos.js';
import TableRaces from '@/data/table-races.js';
import TableHandBase from '@/data/table-hand-base.js';
import TableHandMods from '@/data/table-hand-mods.js';
  
export default {
  data: function(){
    return { 
      test: 'test',
      cards: TableCards,
      combos: TableCombos,
      hand_base: TableHandBase,
      hand_mods: TableHandMods,
      selected_base_id: '',
      selected_mod_id: '',
      selected_base_combos: null,
      selected_mod_combos: null,
      races: TableRaces
    }
  },
  methods: {
  }
};
</script>

<style lang="scss">

.cardpicker {
  padding: 10px;
}
</style>