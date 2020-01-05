<template>
  <div>

    <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn 
            text 
            small 
            class="action-buttons" 
            v-on="on"
            :input-value="active()"
            @click="active() ? deleteDialog = true : createTable()"
          >
            <v-icon>mdi-table</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('edition.editor.actions.table.' + (active() ? 'remove' : 'add') + '.table') }}</span>
      </v-tooltip>

    <template v-if="active()">

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text small class="action-buttons" v-on="on">
            <v-icon>mdi-table-plus</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="commands.addRowBefore()">
            <v-icon left>mdi-table-row-plus-before</v-icon>
            {{ $t(`edition.editor.actions.table.add.rowBefore`) }}
          </v-list-item>
          <v-list-item @click="commands.addRowAfter()">
            <v-icon left>mdi-table-row-plus-after</v-icon>
            {{ $t(`edition.editor.actions.table.add.rowAfter`) }}
          </v-list-item>
          <v-list-item @click="commands.addColumnBefore()">
            <v-icon left>mdi-table-column-plus-before</v-icon>
            {{ $t(`edition.editor.actions.table.add.columnBefore`) }}
          </v-list-item>
          <v-list-item @click="commands.addColumnAfter()">
            <v-icon left>mdi-table-column-plus-after</v-icon>
            {{ $t(`edition.editor.actions.table.add.columnAfter`) }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text small class="action-buttons" v-on="on">
            <v-icon>mdi-table-remove</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="commands.deleteRow()">
            <v-icon left>mdi-table-row-remove</v-icon>
            {{ $t(`edition.editor.actions.table.remove.row`) }}
          </v-list-item>
          <v-list-item @click="commands.deleteColumn()">
            <v-icon left>mdi-table-column-remove</v-icon>
            {{ $t(`edition.editor.actions.table.remove.column`) }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn 
            text 
            small 
            class="action-buttons" 
            v-on="on"
            @click="commands.toggleCellMerge()"
          >
            <v-icon>mdi-table-merge-cells</v-icon>
          </v-btn>
        </template>
        <span>{{ $t(`edition.editor.actions.table.merge`) }}</span>
      </v-tooltip>
    </template>

    <DeleteDialog
      v-model="deleteDialog"
      :title="$t('edition.editor.actions.table.delete.title')"
      :content="$t('edition.editor.actions.table.delete.content')"
      :deleteButtonLabel="$t('edition.editor.actions.table.delete.delete')"
      :cancelButtonLabel="$t('edition.editor.actions.table.delete.cancel')"
      @confirm="deleteTable()"
    />    

  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import Action from "./Action";
import DeleteDialog from "@/components/DeleteDialog/DeleteDialog.vue";

const STANDARD_TABLE = {rowsCount: 3, colsCount: 3, withHeaderRow: false };

@Component({
  components: {
    DeleteDialog
  }
})
export default class TableAction extends Action {
  name: string = "table";
  icon: string = "table";

  deleteDialog: boolean = false;

  createTable() {
    this.commands.createTable(STANDARD_TABLE);
  }

  deleteTable() {
    this.commands.deleteTable();
    this.deleteDialog = false;
  }
}
</script>
