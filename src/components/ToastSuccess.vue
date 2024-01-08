<template>
    <Transition name="toast" @after-leave="$emit('finish')">
        <div v-show="added" class="flex w-full fixed bottom-0 bg-green-500 text-white justify-center align-middle p-2">
            <span class="font-semibold text-sm align-middle text-center">
                <slot></slot>
            </span>
        </div>
    </Transition>
</template>

<script lang="ts">
export default {
    emits: ['finish'],
    data() {
        return {
            added: false as boolean
        }
    },
    mounted() {
        this.added = true;
        setTimeout(() => {
            this.added = false;
        }, 1000);
    }
}
</script>

<style scoped>
.toast-enter-active {
    animation: entrance 300ms linear 0s 1 normal both;
}

@keyframes entrance {
    0% {
        transform: translateY(100px);
    }

    100% {
        transform: translateY(0);
    }
}

.toast-leave-active {
    animation: exit 500ms linear 0s 1 normal both;
}

@keyframes exit {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(100px);
    }
}
</style>