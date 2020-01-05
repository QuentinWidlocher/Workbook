<template>
  <div id="link-action">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          small
          class="action-buttons"
          :input-value="active()"
          @click="onClick()"
          v-on="on"
        >
          <v-icon>mdi-{{ icon }}</v-icon>
        </v-btn>
      </template>

      <span>{{ $t(`edition.editor.actions.${name}.name`) }}</span>
    </v-tooltip>

    <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title>{{
          $t(`edition.editor.actions.${name}.name`)
        }}</v-card-title>
        <v-card-text>
          <v-text-field
            :label="$t(`edition.editor.actions.${name}.fieldName`)"
            color="primary"
            prepend-icon="mdi-link-variant"
            clearable
            hide-details
            v-model="link"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn 
            color="error" 
            outlined 
            depressed 
            @click="closeDialog"
            class="ml-auto"
        >
            {{ $t(`edition.editor.actions.${name}.cancel`) }}
          </v-btn>
          <v-btn
            color="primary"
            depressed
            :disabled="!validateLink(link)"
            @click="addLink"
          >
            {{ link ? $t(`edition.editor.actions.${name}.validate`) : $t(`edition.editor.actions.${name}.clear`) }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import Action from "./Action";
import { log } from 'util';

@Component
export default class LinkAction extends Action {
  name: string = "link";
  icon: string = "link-variant";

  showDialog: boolean = false;

  link: string = "";

  onClick() {
    this.link = this.getMarkAttrs(this.name).href || "";
    this.showDialog = true;
  }

  addLink() {
    if (!this.link || this.validateLink(this.link)) {
      this.commands.link({
        href: this.link
      });
      this.closeDialog();
    }
  }

  closeDialog() {
    this.link = "";
    this.showDialog = false;
  }

  validateLink(link: string): boolean {
    return !link || !!link.match(/(https?|ftp):\/\/(-.)?([^\s/?.#-]+.?)+(\/[^\s]*)?$/i);
  }
}
</script>
