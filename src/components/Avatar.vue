<template>
    <div class="relative rounded-full aspect-w-1 aspect-h-1 p-4 items-center" :class="'bg-' + color + '-500'">
        <span class="absolute inset-0 flex items-center justify-center text-sm font-semibold"
            :class="'text-' + color + '-300'">
            {{ initials }}
        </span>
    </div>
</template>

<script lang="ts">
export default {
    props: ['username', 'color'],
    computed: {
        initials(): string {
            return this.username ? this.username.trim().split(' ').reduce((acc: string, init: string) => acc + init[0].toLocaleUpperCase(), '').substr(0, 3) : "";
        }
    }
}
</script>