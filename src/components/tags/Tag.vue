<template>
    <div 
        class="tag"
        :class="selected ? 'bg-gray-200' : 'bg-white'"
    >
        <CrossIcon class="w-4"/>
        <p>{{ name }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CrossIcon from '../../assets/cross.svg?component'

export default defineComponent({
    setup() {
        
    },
    props: {
        name: {
            required: true,
            type: String
        },
        selected: {
            default: false,
            type: Boolean
        }
    },
    components: {
        CrossIcon
    }
})
</script>

<style lang="scss" scoped>
.tag {
    @apply px-3 py-1 rounded-xl whitespace-nowrap shadow-sm border-gray-200 border flex items-center cursor-pointer font-semibold;
}
</style>