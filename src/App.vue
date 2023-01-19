<template>
  <div class="flex flex-col items-center">
    <div class="header">
      <img
        src="logo.png"
        class="h-11 logo"
      >
      <div class="flex space-x-2 text-white">
        <a href="#">Sign in</a>
        <a href="#">Log in</a>
      </div>
    </div>

    <div class="flex flex-col w-9/12 shadow-md">
      <div 
        class="searchbar"
        :class="searchPanelHidden ? 'rounded-md' : 'rounded-t-md'"
      >
        <SearchIcon />
        <input
          @input="searchChanged"
          @focusin="searchPanelHidden = false"
          type="text"
          placeholder="Seach for tags"
        >
      </div>

      <div class="rounded-b-md p-4 border-t border-gray-300 space-y-5" v-if="!searchPanelHidden">
        <div v-if="selectedTags.length > 0">
          <p class="text-sm font-medium">
            I'm searching for
          </p>
          <div class="tags">
            <tag
              v-for="tag in selectedTags"
              :key="tag.name"
              :name="tag.name"
              @click="removeTag(tag)"
            />
          </div>
        </div>

        <div>
          <p class="text-sm font-medium">
            Results
          </p>
          <div>
            <div
              v-for="tag in tags"
              :key="tag.name"
              :name="tag.name"
              @click="selectTag(tag)"
              class="w-full flex justify-between cursor-pointer"
            >
              <p>{{ tag.name }}</p>
              <p class="text-gray-400">{{ tag.count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { getTags, getQuestions } from "./library/stackoverflow";
import SearchIcon from './assets/search.svg?component'
import Tag from './components/tags/Tag.vue';

export type Tag = {
  name: string;
  count: number;
}
export default defineComponent({
  setup() {
    return {
      searchPanelHidden: ref(false),
      tags: ref([] as Array<Tag>),
      selectedTags: ref([] as Array<Tag>),
      questions: ref([] as Array<any>)
    }
  },
  methods: {
    async searchChanged(event: InputEvent) {
      if((event.target as HTMLInputElement).value) {
        this.tags = await getTags((event.target as HTMLInputElement).value, 5)
      }
    },
    selectTag(tag: Tag) {
      if(this.selectedTags.find(item => item.name == tag.name)) {
        return
      } 

      this.selectedTags.push(tag)
    },
    removeTag(tag: Tag) {
      this.selectedTags.splice(this.selectedTags.findIndex(item => {item.name === tag.name}), 1)
    },
    async fetchQuestions() {
      this.questions = await getQuestions(this.selectedTags)
    }
  },
  mounted() {
    // watch(this.selectedTags, ())
  },
  watch: {
    selectedTags(selectedTags) {
      if(selectedTags.length > 0 ) {
        this.fetchQuestions()
      }
    }
  },
  components: {
    SearchIcon,
    Tag
  }
})
</script>


<style scoped lang="scss">
.header {
  @apply bg-primary 
    w-full 
    p-4 
    pb-20 
    flex justify-between;
}
.searchbar {
  svg {
    @apply 
      h-full
      p-5;
  }
  @apply flex
    h-16
    -mt-8
    bg-white;
  input {
    @apply w-full 
      h-full
      bg-transparent;
    &:focus {
      outline: none;
    }
  }
}
.tags {
  @apply flex space-x-2;
}
</style>
