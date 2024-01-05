<template>
    <span class="text-indigo-600 flex text-center justify-center mb-3 uppercase text-xs font-semibold">Ordina per</span>
    <div class="flex flex-row gap-4 justify-center mb-5">
        <button v-for="(e, index) in el" @click="changeButtons(index)"
            class="rounded-full px-4 py-1 flex justify-center items-center transition duration-300"
            :class="active[0] == index ? 'bg-indigo-600 text-indigo-100 font-semibold' : 'bg-indigo-50 text-indigo-500 font-medium'">
            {{ e }}
            <svg v-show="active[1][index] == -1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="w-5 h-5">
                <path fill-rule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clip-rule="evenodd" />
            </svg>
            <svg v-show="active[1][index] == 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="w-5 h-5">
                <path fill-rule="evenodd"
                    d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                    clip-rule="evenodd" />
            </svg>
            <svg v-show="active[1][index] == 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="w-5 h-5">
                <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
export default {
    emits: ['orderBy'],
    data() {
        return {
            el: ['Data', 'Titolo', 'Voto'] as String[],
            active: [-1, [-1, -1, -1]] as [number, number[]],
        }
    },
    methods: {
        changeButtons(index: number) {
            if (this.active[1][index] == -1) this.active[1][index] += 1;
            else if (this.active[0] == index) this.active[1][index] = (this.active[1][index] + 1) % (this.active[1].length - 1);
            this.active[0] = index;
            this.$emit('orderBy', this.el[index], this.active[1][index]);
        }
    }
}
</script>