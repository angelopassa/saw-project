<template>
    <div :style="!expand ? 'display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;' : ''"
        @click.prevent="expand = !expand">
        {{ text }}
    </div>
</template>

<script lang="ts">
export default {
    props: ['text'],
    data() {
        return {
            expand: false as boolean
        }
    }
}
</script>