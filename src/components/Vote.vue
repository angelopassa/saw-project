<template>
    <svg class="w-12 h-12" viewBox="0 0 100 100">
        <circle class="text-gray-200 stroke-current" stroke-width="10" cx="50" cy="50" r="40" fill="rgb(30, 41, 59)">
        </circle>

        <circle class="progress-ring__circle stroke-current"
            :class="vote < 6 ? 'text-red-500' : (vote < 8 ? 'text-yellow-300' : 'text-green-400')" stroke-width="10"
            stroke-linecap="round" cx="50" cy="50" r="40" fill="transparent"
            :stroke-dashoffset="240 - (vote * 240 / 10) + 160"></circle>

        <text x="50" y="50" text-anchor="middle" fill="white" alignment-baseline="middle" font-size="26">{{
            vote.toFixed(1) }}</text>
    </svg>
</template>

<script lang="ts">
export default {
    props: ['vote']
}
</script>