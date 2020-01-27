<template>
    <div class="requirement" v-bind:class="{ ok: condition }">
        <v-icon style="vertical-align: baseline;">{{
            condition ? 'mdi-check-circle-outline' : 'mdi-checkbox-blank-circle-outline'
        }}</v-icon
        ><span>{{ label }}</span>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class Register extends Vue {
    @Prop({ default: false }) private condition!: boolean;
    @Prop({ default: '' }) private label!: string;
}
</script>
<style lang="scss" scoped>
.requirement,
.requirement > .v-icon {
    &.ok,
    &.ok > .v-icon {
        opacity: 1;
        color: var(--v-success-base) !important;
    }

    span {
        margin-left: 0.5rem;
        vertical-align: text-bottom;
    }
}
</style>
