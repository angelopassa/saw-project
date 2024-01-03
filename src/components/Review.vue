<template>
    <div class="flex flex-col container md:mx-auto items-center p-4">
        <span class="text-2xl font-extrabold text-indigo-500">Recensioni</span>
        <form class="flex flex-col w-full m-5 rounded-xl bg-indigo-100 p-2" @submit.prevent="sendReview()">
            <div v-if="type == 'tv'" class="p-3">
                <div class="p-2">
                    <span class="text-indigo-500 text-sm font-bold">Scegli cosa recensire</span>
                    <div class="flex items-center mb-4 mt-4">
                        <input id="serie-choice" type="radio" v-model="choice" value="serie" :disabled="loading || noNet"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                        <label for="serie-choice" class="ml-2 text-sm font-medium text-gray-900">Serie</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="season-choice" type="radio" v-model="choice" value="season" :disabled="loading || noNet"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                        <label for="season-choice" class="ml-2 text-sm font-medium text-gray-900">Stagione</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="episode-choice" type="radio" v-model="choice" value="episode"
                            :disabled="loading || noNet"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                        <label for="episode-choice" class="ml-2 text-sm font-medium text-gray-900">Episodio</label>
                    </div>
                    <div v-if="choice != 'serie'">
                        <label for="season-list" class="block mb-2 text-sm font-medium text-gray-900 sr-only">Select
                            an option</label>
                        <select id="season-list" v-model="choiceSeason" :disabled="loading || noNet" @change="getEpisodes()"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option v-for="season in listSeason" :value="season.season_number">
                                {{ season.name }}
                            </option>
                        </select>
                    </div>
                    <div v-if="choice == 'episode'" class="mt-2">
                        <label for="episode-list" class="block mb-2 text-sm font-medium text-gray-900 sr-only">Select
                            an option</label>
                        <select id="episode-list" v-model="choiceEpisode" :disabled="loading || noNet"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option v-if="listEpisodesLocal[choiceSeason]"
                                v-for="(episode, idx) in listEpisodesLocal[choiceSeason].episodes" :value="idx">
                                {{ episode.episode_number + ". " + episode.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex flex-row relative p-3">
                <label for="data" class="text-indigo-500 text-sm font-bold mr-1 p-2">Visto il</label>
                <div class="relative flex w-min">
                    <input :value="new Date(data).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                    })" id="data" type="text" class="rounded-xl text-sm border-indigo-200 border-2 focus:ring-0 p-2"
                        required disabled>
                    <span class="absolute inset-y-0 right-2 flex items-center pl-2 text-indigo-500"
                        @click="visibleDate = !visibleDate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path
                                d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                            <path fill-rule="evenodd"
                                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
                <Transition name="fade">
                    <div v-if="visibleDate && !noNet" class="absolute left-10 top-full">
                        <DatePicker v-model="data" mode="date" :max-date="new Date()" />
                    </div>
                </Transition>

            </div>
            <div class="p-3">
                <label for="tilolo" class="text-indigo-500 text-sm font-bold mr-1 p-2">Titolo</label>
                <input v-model="titolo" id="titolo" type="text"
                    class="rounded-xl text-sm border-indigo-200 border-2 focus:ring-0 p-2" required
                    :disabled="loading || noNet">
            </div>
            <div class="p-3">
                <label for="comment" class="text-indigo-500 text-sm font-bold p-2">Scrivi una recensione</label>
                <textarea id="comment" rows="4" v-model="comment"
                    class="w-full rounded-xl text-sm border-indigo-200 border-2 focus:ring-0 p-2"
                    placeholder="La tua recensione..." required :disabled="loading || noNet"></textarea>
            </div>
            <div class="flex flex-row items-center p-3">
                <label for="voto" class="text-indigo-500 text-sm font-bold p-2 mr-1">Voto</label>
                <input id="voto" type="range" min="0" max="10" step="0.1" v-model="vote"
                    class="mr-2 h-1 bg-white rounded-lg appearance-none cursor-pointer range-sm"
                    :disabled="loading || noNet">
                <input id="voto" type="number" min="0" max="10" step="0.1" v-model="vote"
                    class="rounded-xl text-sm border-indigo-200 border-2 focus:ring-0 p-2 text-center"
                    :disabled="loading || noNet">
            </div>
            <button type="submit" :disabled="!store.user || loading || noNet"
                class="flex flex-row items-center justify-center self-center w-40 text-lg font-bold bg-indigo-700 text-indigo-50 rounded-full p-2 my-4">
                <span class="mr-2">Invia</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>
        </form>

        <div v-if="loading" role="status" class="w-full p-4 animate-puls">
            <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div class="flex items-center justify-between border border-gray-200 shadow rounded-lg p-4 mb-4 mt-1">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div class="flex items-center justify-between border border-gray-200 shadow rounded-lg p-4 mb-4 mt-1">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div class="flex items-center justify-between border border-gray-200 shadow rounded-lg p-4 mb-4 mt-1">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
            <div class="flex items-center justify-between border border-gray-200 shadow rounded-lg p-4 mb-4 mt-1">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <span class="sr-only">Loading...</span>
        </div>

        <div v-else class="m-5 w-full flex flex-col">
            <div v-for="review in reviews" class="mb-5">
                <div class="flex flex-row items-center gap-2 text-xs font-semibold px-3 text-indigo-700 mb-2">
                    <Avatar :username="review.userName" color="red"></Avatar>
                    {{ review.userName }} &#x2022; {{
                        review.dataRev.toDate().toLocaleString("it-IT", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        }) }}
                </div>
                <div class="flex flex-col bg-indigo-400 rounded-xl border-indigo-50 p-4 text-indigo-50">
                    <div class="flex flex-row justify-between items-center bg-indigo-500 p-2 rounded-xl">
                        <div>
                            <span class="text-medium font-bold px-3 text-indigo-100">{{ review.nameMedia }}</span>
                            <span class="text-sm font-normal">Visto il {{
                                review.dataVis.toDate().toLocaleString("it-IT", {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }) }}</span>
                        </div>
                        <Vote :vote="review.vote"></Vote>
                    </div>
                    <span class="p-3 text-base font-medium -mb-4">{{ review.titleRev }}</span>
                    <span class="p-3 text-sm">
                        <Text :text="review.desc"></Text>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { addReview, getReviewById, getReviewByIdMediaAndUser } from '@/api/firebase/db';
import type { Stagione } from '@/api/tmdb';
import { getEpisodesById } from '@/api/tmdb';
import type { DocumentData } from 'firebase/firestore';
import Avatar from '@/components/Avatar.vue';
import Vote from './Vote.vue';
import Text from './Text.vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
export default {
    props: ['mediaId', 'posterPath', 'name', 'type', 'listSeason', 'listEpisodes', 'idcomment', 'noNet'],
    emits: ['addSeasonInfo'],
    data() {
        return {
            reviews: [] as DocumentData[],
            store: useUserStore(),
            data: new Date(Date.now()) as Date,
            titolo: "" as string,
            comment: "" as string,
            vote: 0 as number,
            loading: true as boolean,
            choice: "serie" as string,
            choiceSeason: 1 as number,
            choiceEpisode: 0 as number,
            visibleDate: false as boolean,
            listEpisodesLocal: this.listEpisodes as Stagione[]
        }
    },
    watch: {
        data() {
            this.visibleDate = false;
        }
    },
    async created() {
        this.loading = true;
        this.reviews = await getReviewById(this.mediaId);
        if (this.idcomment) {
            let res = await getReviewByIdMediaAndUser(this.idcomment);
            if (res) {
                this.titolo = res.titleRev;
                this.vote = res.vote;
                this.comment = res.desc;
                this.data = res.dataVis.toDate().toISOString().split('T')[0];
                if (res.season != null) {
                    this.choiceSeason = res.season;
                    this.choice = "season";
                }
                if (res.episode != null) {
                    this.choiceEpisode = res.episode;
                    this.choice = "episode";
                }
            }
        }
        if (this.listEpisodesLocal && !this.listEpisodesLocal[this.choiceSeason])
            this.getEpisodes();
        this.loading = false;
    },
    methods: {
        async sendReview() {
            this.loading = true;
            let idS = this.mediaId;
            let poster = this.posterPath;
            let name = this.name;
            let type = 'film';
            let url = '/movie/';
            if (this.type == 'tv') {
                type = 'serie tv';
                url = '/tv/';
                if (this.choice == "season") {
                    idS = (this.listEpisodesLocal[this.choiceSeason].id).toString();
                    name = this.name + " • " + this.listSeason[this.choiceSeason].name;
                    type = 'stagione';
                } else if (this.choice == "episode") {
                    idS = (this.listEpisodesLocal[this.choiceSeason].episodes[this.choiceEpisode].id).toString();
                    poster = this.listEpisodesLocal[this.choiceSeason].episodes[this.choiceEpisode].still_path;
                    name = this.name + " • " + this.listEpisodesLocal[this.choiceSeason].name + " • " + this.listEpisodesLocal[this.choiceSeason].episodes[this.choiceEpisode].episode_number + ". " + this.listEpisodesLocal[this.choiceSeason].episodes[this.choiceEpisode].name;
                    type = 'episodio';
                }
            }

            if (type == 'stagione')
                await addReview(this.mediaId, idS, this.titolo, this.comment, new Date(this.data), this.vote, Date.now(), poster, name, type, this.choiceSeason);
            else if (type == 'episodio')
                await addReview(this.mediaId, idS, this.titolo, this.comment, new Date(this.data), this.vote, Date.now(), poster, name, type, this.choiceSeason, this.choiceEpisode);
            else
                await addReview(this.mediaId, idS, this.titolo, this.comment, new Date(this.data), this.vote, Date.now(), poster, name, type);

            url += this.mediaId;
            this.store.notifySub(idS, url);
            this.reviews = await getReviewById(this.mediaId);
            this.loading = false;
        },
        async getEpisodes() {
            if (!this.listEpisodesLocal[this.choiceSeason]) {
                let res = await getEpisodesById(this.mediaId, this.choiceSeason);
                this.listEpisodesLocal[this.choiceSeason] = res;
                this.$emit('addSeasonInfo', this.choiceSeason, res);
            }
        }
    },
    components: {
        Avatar, DatePicker, Vote, Text
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>