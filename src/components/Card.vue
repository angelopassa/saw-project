<template>
    <div v-if="type === 'upcoming'"
        class="flex rounded-lg bg-indigo-400 text-indigo-600 p-2 justify-center w-full text-xs text-center mt-2">
        In uscita il {{ new Date(data).toLocaleString("it-IT", {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }) }}
    </div>
    <div class="flex justify-center relative" :class="type === 'upcoming' ? 'pb-5 pt-2' : 'py-5'">
        <RouterLink :to="(type === 'serie tv' ? '/tv/' : '/movie/') + item.id">
            <img v-if="item.poster_path" :src="'https://image.tmdb.org/t/p/w200' + item.poster_path" :alt="nome"
                class="rounded-lg">
            <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center">
                <img src="https://image.tmdb.org/t/p/w200/k1Q1ayXdOb6H1emGtnGGwy63uPU.jpg" alt=""
                    class="rounded-xl relative opacity-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray"
                    class="max-w-10 max-h-10 absolute">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                </svg>
            </div>
        </RouterLink>
        <div v-if="type !== 'upcoming'" class="absolute text-indigo-100 bottom-2 -right-4">
            <Vote :vote="item.vote_average"></Vote>
        </div>
    </div>
    <span v-if="type === 'upcoming'"
        class="flex rounded-lg bg-indigo-500 text-indigo-200 p-4 text-center font-bold text-xs">
        {{ nome }}
    </span>
    <span v-else class="flex rounded-lg bg-indigo-500 text-indigo-200 p-4 text-center font-bold text-xs">
        {{ nome + " (" + data.substring(0, 4) + ")" }}
    </span>
    <div class="flex md:flex-row flex-col mt-2">
        <button
            @click="userStore.user ? writeReview(item.id, type === 'upcoming' ? 'film' : type) : $router.push('/signup')"
            class="flex rounded-lg bg-indigo-400 text-indigo-600 p-2 justify-center w-full md:mr-1 mb-1 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>
        <button
            @click="userStore.user ? addToFavourite(item.id, nome, type === 'upcoming' ? 'film' : type, item.backdrop_path, item.vote_average) : $router.push('/signup')"
            class="flex rounded-lg bg-indigo-400 text-indigo-600 p-2 justify-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
import Vote from './Vote.vue';
import { addToFav, isPresentFav } from "@/api/firebase/db";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { useSearchbarStore } from "@/stores/searchbar";
export default {
    props: ['item', 'type'],
    emits: ['failFav', 'succFav'],
    setup() {
        const userStore = useUserStore();
        const searchStore = useSearchbarStore();
        return { userStore, searchStore }
    },
    computed: {
        nome(): string {
            return this.type === 'serie tv' ? this.item.name : this.item.title;
        },
        data(): string {
            return this.type === 'serie tv' ? this.item.first_air_date : this.item.release_date as string;
        }
    },
    methods: {
        writeReview(idFilm: number, type: string) {
            router.push(
                {
                    name: type == 'film' ? 'movie' : 'tv',
                    params: { id: idFilm },
                    hash: type == 'film' ? '#commentmovie' : '#commentv',
                }
            );
        },
        async addToFavourite(idFilm: number, filmName: string, type: string, poster_path?: string, vote_average?: number) {
            if (await isPresentFav(idFilm.toString())) {
                this.$emit('failFav');
                return;
            }
            await addToFav(idFilm, filmName, type, poster_path, vote_average);
            this.$emit('succFav');
        }
    },
    components: { Vote }
}
</script>