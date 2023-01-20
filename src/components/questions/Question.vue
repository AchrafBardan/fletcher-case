<template>
    <div 
        class="question"
    >
        <h3><a :href="question.link">{{ question.title }}</a></h3>
        <div class="flex space-x-2">
            <div 
                class="tag"
                v-for="tag in question.tags"
                :key="tag"
            >
                <p>{{ tag }}</p>
            </div>
        </div>
        <p class="text-gray-300">Posted by 
            <a 
                class="hover:underline" 
                :href="question.owner.link"
            >
                    {{ question.owner.display_name }}
            </a> 
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Question } from '../../library/api/stackoverflow'

export default defineComponent({
    props: {
        question: {
            required: true,
            type: Object as PropType<Question>
        }
    },
})
</script>

<style lang="scss" scoped>
.question {
    @apply shadow-md 
        p-5 
        space-y-3;
    h3 {
        @apply text-lg 
            font-semibold
            hover:underline;
    }
}
.tag {
    @apply 
        px-3 
        py-1 
        rounded-xl 
        whitespace-nowrap 
        shadow-sm 
        border-gray-200 
        border 
        font-semibold;
}
</style>