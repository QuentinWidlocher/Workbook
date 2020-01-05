<template>
  <v-menu open-on-hover>
    <template v-slot:activator="{ on }">
      <v-btn text small class="action-buttons" v-on="on">
        <v-icon>mdi-{{ icon }}</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="j in 3"
        :key="`heading-${j}`"
        :input-value="active({ level: j })"
        @click="onClick({ level: j })"
      >
        <v-icon>{{ "mdi-format-header-" + j }}</v-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import Action from "./Action";

@Component
export default class HeadingsAction extends Action {
  name: string = "heading";
  icon: string = "format-size";
}
</script>
