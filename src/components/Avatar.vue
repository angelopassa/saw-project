<template>
    <div class="relative rounded-full aspect-w-1 aspect-h-1 p-4 items-center" :class="'bg-' + colore + '-500'">
        <span class="absolute inset-0 flex items-center justify-center text-sm font-semibold"
            :class="'text-' + colore + '-300'">
            {{ initials }}
        </span>
    </div>
</template>

<script lang="ts">
export default {
    props: ['username', 'color'],
    data() {
        return {
            colore: "",
            colorList: [
                'red',
                'blue',
                'green',
                'gray',
                'emerald',
                'purple',
                'slate',
                'yellow',
                'orange',
                'zinc',
                'neutral',
                'stone',
                'amber',
                'lime',
                'teal',
                'cyan',
                'sky',
                'indigo',
                'violet',
                'fuchsia',
                'pink',
                'rose'
            ]
        }
    },
    beforeMount() {
        this.generateColor();
    },
    computed: {
        initials(): string {
            return this.username ? this.username.trim().split(' ').reduce((acc: string, init: string) => acc + init[0].toLocaleUpperCase(), '').substr(0, 3) : "";
        }
    },
    methods: {
        generateColor() {
            this.colore = this.colorList[Math.floor(Math.random() * this.colorList.length)];
        }
    }
}
</script>