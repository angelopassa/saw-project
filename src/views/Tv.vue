<template>
    <div class="container mx-auto">

        <Loading v-if="loading"></Loading>

        <CacheError v-else-if="noNet"></CacheError>

        <div v-else-if="result">
            <div class="flex my-5 md:mx-20 md:p-5 p-1 flex-col lg:flex-row justify-center">
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
                <div class="flex bg-indigo-500 rounded-lg flex-col md:px-10 px-3.5 py-7 w-full">
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
                    <span class="font-sm text-indigo-50 text-justify mt-5 bg-indigo-600 rounded-lg md:p-5 p-3">
                        <Text :text="result.overview"></Text>
                    </span>
                    <span
                        class="flex items-center gap-2 text-xs font-bold bg-indigo-600 p-1.5 pl-2.5 rounded-l-md rounded-r-3xl mt-5 mb-5 text-indigo-50 w-fit">
                        <span>Voto TMDB</span>
                        <Vote :vote="result.vote_average"></Vote>
                    </span>
                    <div class="flex flex-row">
                        <span class="flex text-indigo-100 font-semibold mr-5">Creata da:</span>
                        <div class="flex flex-wrap justify-center">
                            <span v-for="(person, idx) in result.created_by" class="mr-2 text-indigo-200">
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
                            <span v-for="(person, idx) in cast" class="text-indigo-200">
                                <RouterLink :to="'/person/' + person.id" class="mr-2">
                                    {{ person.name }}
                                </RouterLink>
                                <span v-if="idx != cast.length - 1" class="mr-2">&#x2022;</span>
                            </span>
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

            <div class="my-10 md:mx-10 lg:mx-32 mx-2">
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

                        <div v-if="noNetSeasons[season.season_number]" class="flex bg-indigo-500 h-full justify-center">
                            <CacheError></CacheError>
                        </div>

                        <LoadingText v-else-if="!seasons[season.season_number]"></LoadingText>

                        <div v-else class="bg-indigo-500 text-indigo-50"
                            :class="idx == result.seasons.length - 1 ? 'rounded-b-md' : ''">
                            <div class="sm:mx-10 mx-1" v-for="episode in seasons[season.season_number].episodes">
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
            :list-episodes="seasons" @add-season-info="(nr_season, res) => seasons[nr_season] = res"
            :no-net-seasons="noNetSeasons">
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
import LoadingText from "@/components/LoadingText.vue";
import CacheError from "@/components/CacheError.vue";
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
            noNetSeasons: {} as { [key: number]: boolean },
            nSuccess: 0 as number,
            nFail: 0 as number,
            mapSuccess: {} as { [key: number]: number },
            mapFail: {} as { [key: number]: number },
            loaded: false
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
    updated() {
        if ((this.idcomment || this.$route.hash === '#commentv') && !this.loading && !this.loaded) {
            document.getElementById('commentv')!.scrollIntoView({
                behavior: "smooth"
            });
            this.loaded = true;
        }
    },
    methods: {
        async getEpisodes(nr_season: number) {
            this.visible[nr_season] = !this.visible[nr_season];
            if (this.visible[nr_season] && !this.seasons[nr_season]) {
                this.noNetSeasons[nr_season] = false;
                let res = await getEpisodesById(this.tv_id, nr_season);
                res ? this.seasons[nr_season] = res : this.noNetSeasons[nr_season] = true;
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
    components: { Loading, Review, Text, Vote, ToastFail, ToastSuccess, LoadingText, CacheError }
}
</script>