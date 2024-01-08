<template>
    <nav class="mb-5">
        <!-- Desktop Menu -->
        <div class="bg-indigo-600 z-10 relative">
            <div class="max-w-7xl mx-auto">
                <div class="flex justify-between">
                    <div class="flex items-center py-4 px-2">
                        <RouterLink to="/" class="flex items-center py-5 px-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-8 h-8 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                            </svg><span class="text-2xl font-extrabold text-white">Your Movie Lib</span>
                        </RouterLink>
                        <div class="hidden md:flex items-center space-x-1">
                            <div class="transition duration-500 hover:bg-indigo-700 p-2 rounded mx-2">
                                <RouterLink to="/" class="py-5 px-2 text-indigo-200 hover:text-indigo-100">Home
                                </RouterLink>
                            </div>
                            <div class="transition duration-500 hover:bg-indigo-700 p-2 rounded mx-2">
                                <RouterLink to="/search" class="py-5 px-2 text-indigo-200 hover:text-indigo-100">Cerca
                                </RouterLink>
                            </div>
                            <div class="transition duration-500 hover:bg-indigo-700 p-2 rounded mx-2" v-if="store.user">
                                <RouterLink to="/favourite" class="py-5 px-2 text-indigo-200 hover:text-indigo-100">
                                    Preferiti
                                </RouterLink>
                            </div>
                            <div class="transition duration-500 hover:bg-indigo-700 p-2 rounded mx-2" v-if="store.user">
                                <RouterLink to="/diary" class="py-5 px-2 text-indigo-200 hover:text-indigo-100">
                                    Diario
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                    <div class="hidden md:flex items-center space-x-1">
                        <RouterLink to="/signup" class="py-5 px-2 text-indigo-200 hover:text-indigo-100" v-if="!store.user">
                            Login
                        </RouterLink>

                        <Avatar :username="store.user.displayName" :color="store.user.photoURL" v-if="store.user">
                        </Avatar>
                        <RouterLink to="/profile" class="py-5 px-2 text-indigo-200 hover:text-indigo-100" v-if="store.user">
                            {{ store.user.displayName }}
                        </RouterLink>
                        <button @click="store.logout(); router.push('/')"
                            class="py-5 px-2 text-indigo-200 hover:text-indigo-100" v-if="store.user">Logout</button>
                    </div>

                    <div class="md:hidden flex items-center">
                        <button class="py-5 px-2" @click="showMobileMenu = !showMobileMenu">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-8 h-8 text-indigo-200">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <!-- Mobile Menu -->
        <Transition name="mobilemenu">
            <div class="md:hidden bg-indigo-600 flex flex-col py-2 z-0 relative" v-show="showMobileMenu">
                <RouterLink to="/"
                    class="transition duration-500 block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-200 text-indigo-100 p-2 rounded mx-2">
                    Home</RouterLink>
                <RouterLink to="/search"
                    class="transition duration-500 block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-200 text-indigo-100 p-2 rounded mx-2">
                    Cerca</RouterLink>
                <RouterLink to="/favourite" v-if="store.user"
                    class="transition duration-500 block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-200 text-indigo-100 p-2 rounded mx-2">
                    Preferiti</RouterLink>
                <RouterLink to="/diary" v-if="store.user"
                    class="transition duration-500 block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-200 text-indigo-100 p-2 rounded mx-2">
                    Diario</RouterLink>
                <RouterLink to="/signup" v-if="!store.user"
                    class="transition duration-500 block py-2 px-4 hover:bg-indigo-700 hover:text-indigo-200 text-indigo-100 p-2 rounded mx-2">
                    Login</RouterLink>
                <RouterLink to="/profile" v-if="store.user"
                    class="transition duration-500 py-2 px-4 hover:bg-indigo-700 hover:text-indigo-200 text-indigo-100 p-2 rounded mx-2 flex gap-3 items-center">
                    <Avatar :username="store.user.displayName" :color="store.user.photoURL"></Avatar>
                    {{ store.user.displayName }}
                </RouterLink>
                <button @click="store.logout(); router.push('/')" v-if="store.user"
                    class="transition duration-500 block py-2 px-4 text-left hover:bg-indigo-700 hover:text-indigo-200 text-indigo-100 p-2 rounded mx-2">Logout</button>
            </div>
        </Transition>
    </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import Avatar from './Avatar.vue';
import router from "@/router";
const showMobileMenu = ref(false);
const store = useUserStore();
</script>

<style>
.mobilemenu-enter-active {
    animation: entranceNav 300ms linear 0s 1 normal both;
}

@keyframes entranceNav {
    0% {
        transform: translateY(-300px);
    }

    100% {
        transform: translateY(0);
    }
}

.mobilemenu-leave-to {
    animation: exitNav 300ms linear 0s 1 normal both;
}

@keyframes exitNav {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-300px);
    }
}
</style>