<template>
    <div class="container mx-auto">
        <Loading :loading="loading"></Loading>

        <div v-show="!loading && noNet"
            class="flex flex-col bg-red-400 rounded-xl text-white font-bold p-5 justify-center items-center my-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-wifi-off"
                viewBox="0 0 16 16">
                <path
                    d="M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10m4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z" />
            </svg>
            <span>
                Nessuna informazione disponibile nella cache
            </span>
        </div>

        <div v-if="person_info" v-show="!loading && !noNet">
            <div class="flex my-5 md:mx-20 p-5 flex-col lg:flex-row justify-center">
                <div class="flex mr-5 min-w-max justify-center mb-5 lg:mb-0 items-center">
                    <img v-if="person_info.profile_path" :src="'https://image.tmdb.org/t/p/w300' + person_info.profile_path"
                        alt="" class="rounded-lg">
                    <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center">
                        <img src="https://image.tmdb.org/t/p/w300/k1Q1ayXdOb6H1emGtnGGwy63uPU.jpg" alt=""
                            class="rounded-xl relative opacity-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="gray" class="max-w-10 max-h-10 absolute">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                </div>
                <div class="flex bg-indigo-500 rounded-lg flex-col px-10 py-7 w-full">
                    <span class="flex font-extrabold text-2xl text-indigo-100 m-1 align-middle">{{ person_info.name
                    }}</span>
                    <div class="flex flex-row text-indigo-100 text-sm m-1">
                        <span>{{ new Date(person_info.birthday).toLocaleString("it-IT", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }) + ',' }}</span>
                        <span class="text-indigo-100 text-sm ml-1">{{ person_info.place_of_birth }}</span>
                        <span v-if="person_info.deathday" class="text-indigo-100 text-sm ml-1">&#x2022; {{ new
                            Date(person_info.deathday).toLocaleString("it-IT", {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })
                        }}</span>
                    </div>
                    <span class="font-sm text-indigo-50 text-justify mt-5 bg-indigo-600 rounded-lg p-5">{{
                        person_info.biography
                    }}</span>
                </div>
            </div>
            <div class="flex flex-col my-5 md:mx-20 p-5">
                <h1 class="text-indigo-500 font-extrabold text-3xl p-4 mb-2 rounded-xl bg-indigo-200 flex flex-row justify-between"
                    @click="visibleFilm = !visibleFilm">
                    <span>Film</span>
                    <div class="flex items-center">
                        <svg v-if="visibleFilm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-indigo-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-indigo-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                </h1>
                <div v-show="visibleFilm" class="grid grid-cols-10 justify-center">
                    <div v-for="movie in movies" class="flex m-2 flex-col">
                        <RouterLink :to="'/movie/' + movie.id">
                            <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
                                alt="" class="rounded-xl" loading="lazy">
                            <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center">
                                <img src="https://image.tmdb.org/t/p/original/k1Q1ayXdOb6H1emGtnGGwy63uPU.jpg" alt=""
                                    class="rounded-xl relative opacity-0" loading="lazy">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="gray" class="max-w-10 max-h-10 absolute">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                </svg>
                            </div>
                        </RouterLink>
                        <span class="text-indigo-400 flex justify-center text-center p-1 font-semibold"> {{ movie.title }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col my-5 md:mx-20 p-5">
                <h1 class="text-indigo-500 font-extrabold text-3xl p-4 mb-2 rounded-xl bg-indigo-200 flex flex-row justify-between"
                    @click="visibleTv = !visibleTv">
                    <span>Serie TV</span>
                    <div class="flex items-center">
                        <svg v-if="visibleTv" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-indigo-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-indigo-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                </h1>
                <div v-show="visibleTv" class="justify-center grid grid-cols-10">
                    <div v-for="serie in tv" class="flex m-2 flex-col">
                        <RouterLink :to="'/tv/' + serie.id">
                            <img v-if="serie.poster_path" :src="'https://image.tmdb.org/t/p/original' + serie.poster_path"
                                alt="" class="rounded-xl">
                            <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center">
                                <img src="https://image.tmdb.org/t/p/original/k1Q1ayXdOb6H1emGtnGGwy63uPU.jpg" alt=""
                                    class="rounded-xl relative opacity-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="gray" class="max-w-10 max-h-10 absolute">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                </svg>
                            </div>
                        </RouterLink>
                        <span class="text-indigo-400 flex justify-center text-center p-1 font-semibold"> {{ serie.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getPersonById, getMoviesByPersonId, removeDup } from '../api/tmdb'
import type { Person, Movie, Serie } from '../api/tmdb';
import Loading from '../components/Loading.vue';
export default {
    data() {
        return {
            person_id: this.$route.params.id as string,
            person_info: null as Person | null,
            movies: [] as Movie[],
            tv: [] as Serie[],
            visibleFilm: true,
            visibleTv: true,
            loading: true,
            noNet: false
        }
    },
    async created() {
        this.noNet = false;
        this.loading = true;
        this.person_info = await getPersonById(this.person_id);
        if (this.person_info) {
            let res = await getMoviesByPersonId(this.person_id);
            this.movies = res.cast.filter((item: Person) => item.media_type == 'movie');
            this.movies = this.movies.concat(res.crew.filter((item: Person) => item.media_type == 'movie'));
            this.movies = removeDup(this.movies);
            this.tv = res.cast.filter((item: Person) => item.media_type == 'tv');
            this.tv = this.tv.concat(res.crew.filter((item: Person) => item.media_type == 'tv'));
            this.tv = removeDup(this.tv);
        } else
            this.noNet = true;
        this.loading = false;
    },
    components: { Loading }
}

</script>