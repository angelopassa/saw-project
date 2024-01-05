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

        <div v-if="result" v-show="!loading && !noNet">
            <div class="flex my-5 md:mx-20 p-5 flex-col lg:flex-row justify-center">
                <div class="flex lg:mr-5 min-w-max justify-center mb-5 lg:mb-0 items-center">
                    <img v-if="result.poster_path" :src="'https://image.tmdb.org/t/p/w300' + result.poster_path" alt=""
                        class="rounded-lg">
                    <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center">
                        <img src="https://image.tmdb.org/t/p/w300/k1Q1ayXdOb6H1emGtnGGwy63uPU.jpg" alt=""
                            class="rounded-xl relative opacity-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="gray" class="max-w-32 max-h-32 absolute">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                        </svg>
                    </div>
                </div>
                <div class="flex bg-indigo-500 rounded-lg flex-col px-10 py-7 w-full">
                    <div class="flex flex-wrap">
                        <span v-for="genre in result!.genres"
                            class="flex m-1 text-indigo-50 rounded-md align-middle p-1 font-bold text-sm"
                            :class="generi[genre.name]">{{
                                genre.name }}
                        </span>
                    </div>
                    <div class="flex flex-wrap justify-between mt-2">
                        <div v-if="result.first_air_date"
                            class="flex flex-wrap font-extrabold text-2xl text-indigo-100 m-1 align-middle">
                            <span class="mr-1">{{ result.name
                            }}</span>
                            <span>({{ result.first_air_date.substring(0, 4) }}</span>
                            <span v-if="result.status != 'Ended'" class="ml-1"> - In Corso</span>
                            <span v-else-if="result.first_air_date.substring(0, 4) != result.last_air_date.substring(0, 4)"
                                class="ml-1">- {{
                                    result.last_air_date.substring(0, 4) }}</span>
                            <span>)</span>
                        </div>

                        <button :disabled="!userStore.user"
                            @click="addToFavourite(result.id, result.name, 'serie tv', result.backdrop_path, result.vote_average)"
                            class="rounded-lg bg-indigo-400
                    text-indigo-600 p-2 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </button>
                    </div>
                    <span class="italic font-semibold text-indigo-50" :class="result.tagline == '' ? 'hidden' : 'block'">"{{
                        result.tagline }}"</span>
                    <span class="font-sm text-indigo-50 text-justify mt-5 bg-indigo-600 rounded-lg p-5">
                        <Text :text="result.overview"></Text>
                    </span>
                    <div class="flex flex-row mt-5">
                        <span class="flex text-indigo-100 font-semibold mr-5">Creata da:</span>
                        <div class="flex flex-wrap justify-center">
                            <span v-for="(person, idx) in result.created_by" class="mr-5 text-indigo-200">
                                <RouterLink :to="'/person/' + person.id">
                                    {{ person.name }}
                                </RouterLink>
                                <span v-if="idx != result.created_by.length - 1">,</span>
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col mt-5">
                        <span class="flex justify-center text-indigo-100 font-semibold">Cast</span>
                        <div class="flex flex-wrap justify-center">
                            <li v-for="person in cast" class="mr-5 text-indigo-200">
                                <RouterLink :to="'/person/' + person.id">
                                    {{ person.name }}
                                </RouterLink>
                            </li>
                        </div>
                    </div>
                    <div class="flex flex-col mt-5">
                        <span class="flex text-indigo-50 items-center font-semibold">Disponibile su</span>
                        <div class="flex flex-wrap">
                            <span v-for="network in result.networks"
                                class="flex items-center w-20 mr-3 p-2 mt-3 bg-slate-200 rounded-xl min-w-min">
                                <img v-if="network.logo_path"
                                    :src="'https://image.tmdb.org/t/p/original' + network.logo_path" :alt="network.name"
                                    :title="network.name">
                                <span v-else class="flex items-center text-center">{{ network.name }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col mt-5">
                        <span class="flex text-indigo-50 items-center font-semibold">Prodotto da</span>
                        <div class="flex flex-wrap">
                            <span v-for="company in result.production_companies"
                                class="flex items-center w-20 mr-3 p-2 mt-3 bg-slate-200 rounded-xl min-w-min">
                                <img v-if="company.logo_path"
                                    :src="'https://image.tmdb.org/t/p/original' + company.logo_path" :alt="company.name"
                                    :title="company.name">
                                <span v-else class="flex items-center text-center">{{ company.name }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="my-10 mx-10 lg:mx-32">
                <div v-for="(season, idx) in result.seasons">
                    <div class="flex flex-row bg-indigo-600 justify-between p-4"
                        :class="setupClassNav(idx, season.season_number)" @click="getEpisodes(season.season_number)">
                        <div>
                            <h2 class="text-indigo-100 font-bold">{{ season.season_number }} - {{ season.name }}</h2>
                        </div>
                        <div class="flex items-center">
                            <svg v-if="visible[season.season_number]" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 text-indigo-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-indigo-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </div>
                    </div>

                    <div v-if="visible[season.season_number]">
                        <div v-if="!seasons[season.season_number]" role="status"
                            class="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-puls">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                                </div>
                                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
                            </div>
                            <div class="flex items-center justify-between pt-4">
                                <div>
                                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                                </div>
                                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
                            </div>
                            <div class="flex items-center justify-between pt-4">
                                <div>
                                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                                </div>
                                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
                            </div>
                            <div class="flex items-center justify-between pt-4">
                                <div>
                                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                                </div>
                                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
                            </div>
                            <div class="flex items-center justify-between pt-4">
                                <div>
                                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                                </div>
                                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
                            </div>
                            <span class="sr-only">Loading...</span>
                        </div>

                        <div v-else class="bg-indigo-500 text-indigo-50"
                            :class="idx == result.seasons.length - 1 ? 'rounded-b-md' : ''">
                            <div class="mx-10" v-for="(episode, idx) in seasons[season.season_number].episodes">
                                <div class="flex flex-col p-2 md:flex-row">
                                    <span class="flex items-center p-2 font-extrabold">
                                        S{{ season.season_number }}E{{ episode.episode_number }}
                                    </span>
                                    <div class="flex w-32 items-center p-2">
                                        <img v-if="episode.still_path"
                                            :src="'https://image.tmdb.org/t/p/original' + episode.still_path"
                                            :alt="episode.name" :title="episode.name" class="rounded-md">
                                        <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center">
                                            <img src="https://image.tmdb.org/t/p/original/1Jog7D5IYLk80rtG8XKTab0dt4d.jpg"
                                                alt="" class="rounded-xl relative opacity-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="gray" class="max-w-6 max-h-6 absolute">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="flex flex-col justify-items-center p-2 w-full">
                                        <div class="flex flex-row justify-between">
                                            <div class="flex-col">
                                                <p class="font-xs text-xs">{{ new
                                                    Date(episode.air_date).toLocaleString("it-IT",
                                                        {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        }) }}</p>
                                                <p class="font-semibold">
                                                    <span>{{ episode.name }}</span>
                                                    <span v-if="episode.runtime">
                                                        &#x2022; {{ episode.runtime }}m
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="flex text-indigo-100">
                                                <Vote :vote="episode.vote_average"></Vote>
                                            </div>
                                        </div>

                                        <div class="flex font-xs">
                                            <Text :text="episode.overview"></Text>
                                        </div>
                                        <div class="flex flex-col font-xs text-sm mt-2">
                                            <div class="flex flex-row">
                                                <span class="font-semibold">Diretto da:</span>
                                                <div v-for="director in episode.crew">
                                                    <span v-if="director.job == 'Director'" class="ml-1">
                                                        <RouterLink :to="'/person/' + director.id">
                                                            {{ director.name }}
                                                        </RouterLink>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="flex flex-row">
                                                <span class="font-semibold">Scritto da:</span>
                                                <div v-for="writer in episode.crew">
                                                    <span v-if="writer.job == 'Writer'" class="ml-1">
                                                        <RouterLink :to="'/person/' + writer.id">
                                                            {{ writer.name }}
                                                        </RouterLink>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Review :media-id="tv_id" :poster-path="result ? result.backdrop_path : null" :name="result ? result.name : null"
            type="tv" :list-season="result ? result.seasons : null" :idcomment="idcomment" id="commentv" :no-net="noNet"
            :list-episodes="seasons" @add-season-info="(nr_season, res) => seasons[nr_season] = res">
        </Review>
    </div>

    <div v-for="i in nSuccess">
        <ToastSuccess v-if="mapSuccess[i]" @finish="delete mapSuccess[i]">
            Aggiunto ai preferiti!
        </ToastSuccess>
    </div>

    <div v-for="i in nFail">
        <ToastFail v-if="mapFail[i]" @finish="delete mapFail[i]">
            Già presente nei Preferiti!
        </ToastFail>
    </div>
</template>

<script lang="ts">
import { searchTvById, genres_tv, getEpisodesById, getTvCreditsById } from "@/api/tmdb"
import type { Serie, Stagione, PersonCast } from "@/api/tmdb";
import { useUserStore } from "@/stores/user";
import Loading from "@/components/Loading.vue";
import Review from "@/components/Review.vue";
import Text from "@/components/Text.vue";
import Vote from "@/components/Vote.vue";
import ToastFail from "@/components/ToastFail.vue";
import ToastSuccess from "@/components/ToastSuccess.vue";
import { addToFav, isPresentFav } from "@/api/firebase/db";
export default {
    props: ['idcomment'],
    setup() {
        const userStore = useUserStore();
        return { userStore }
    },
    data() {
        return {
            tv_id: this.$route.params.id as string,
            result: null as Serie | null,
            generi: genres_tv,
            loading: true,
            seasons: [] as Stagione[],
            visible: {} as { [key: number]: boolean },
            cast: [] as PersonCast[],
            noNet: false,
            nSuccess: 0 as number,
            nFail: 0 as number,
            mapSuccess: {} as { [key: number]: number },
            mapFail: {} as { [key: number]: number }
        }
    },
    async created() {
        this.noNet = false;
        this.loading = true;
        this.result = await searchTvById(this.tv_id);
        if (this.result) {
            let c = await getTvCreditsById(this.tv_id);
            c = c.cast.filter((item: PersonCast) => item.known_for_department == 'Acting');
            if (c.length > 10) this.cast = c.slice(0, 10);
            else this.cast = c;
            for (let season of this.result.seasons)
                this.visible[season.season_number] = false;
        } else
            this.noNet = true;

        this.loading = false;
    },
    methods: {
        async getEpisodes(nr_season: number) {
            this.visible[nr_season] = !this.visible[nr_season];
            if (this.visible[nr_season] && !this.seasons[nr_season]) {
                let res = await getEpisodesById(this.tv_id, nr_season);
                this.seasons[nr_season] = res;
            }
        },
        async addToFavourite(idFilm: number, filmName: string, type: string, poster_path?: string, vote_average?: number) {
            if (await isPresentFav(idFilm.toString())) {
                this.nFail++;
                this.mapFail[this.nFail] = 1;
                return;
            }
            await addToFav(idFilm, filmName, type, poster_path, vote_average);
            this.nSuccess++;
            this.mapSuccess[this.nSuccess] = 1;
        },
        setupClassNav(idx: number, sn: number): string {
            let out: string = '';
            if (idx == 0)
                out += 'rounded-t-md ';
            if (idx == (this.result!.seasons.length - 1) && !this.visible[sn])
                out += 'rounded-b-md';
            return out;
        }
    },
    components: { Loading, Review, Text, Vote, ToastFail, ToastSuccess }
}
</script>