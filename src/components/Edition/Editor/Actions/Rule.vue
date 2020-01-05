<template>
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

    <span>{{ $t(`edition.editor.actions.${name}`) }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import Action from "./Action";

@Component
export default class RuleAction extends Action {
  name: string = "horizontal_rule";
  icon: string = "minus";
}
</script>
