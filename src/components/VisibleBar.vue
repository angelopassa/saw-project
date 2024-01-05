<template>
    <h1 class="text-indigo-500 font-extrabold text-3xl p-4 mb-2 rounded-xl bg-indigo-200 flex flex-row justify-between"
        @click="changeVisibility()">
        <span>{{ name }}</span>
        <div class="flex items-center">
            <svg v-if="visibleFilmCopy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-indigo-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-indigo-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </div>
    </h1>
</template>

<script lang="ts">
export default {
    props: ['visibleFilm', 'name'],
    emits: ['changeVisParent'],
    data() {
        return {
            visibleFilmCopy: this.visibleFilm
        }
    },
    methods: {
        changeVisibility() {
            this.visibleFilmCopy = !this.visibleFilmCopy;
            this.$emit('changeVisParent');
        }
    }
}
</script>