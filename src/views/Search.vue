<template>
    <div class="flex items-center justify-center mb-10">
        <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-indigo-600">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>
            <input type="text" v-model="search" placeholder="Cerca..."
                class="rounded-full pl-10 py-2 pr-2 outline outline-indigo-500 w-96">
        </div>
    </div>
    <div class="container mx-auto relative px-2">
        <PageNav :n-page="nPage" :current-page="currentPage" :visible-nav="visibleNav"
            :limit-lower-parent="searchStore.search.limitLower"
            @change-page="(n, limitLowerChild) => { setCards(search, n); searchStore.updateLimitLower(limitLowerChild) }">
        </PageNav>

        <VisibleBar :visible-film="visibleFilm" :name="'Film'" @change-vis-parent="visibleFilm = !visibleFilm"></VisibleBar>
        <div v-show="visibleFilm"
            class="justify-center grid lg:grid-cols-6 gap-4 m-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
            <div v-for="item in movies" class="flex flex-col justify-between p-2">
                <Card :item="item" type="film" @fail-fav="updateFail()" @succ-fav="updateSucc()"></Card>
            </div>
        </div>

        <VisibleBar :visible-film="visibleTv" :name="'Serie TV'" @change-vis-parent="visibleTv = !visibleTv"></VisibleBar>
        <div v-show="visibleTv"
            class="justify-center grid lg:grid-cols-6 gap-4 m-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
            <div v-for="item in tv" class="flex flex-col justify-between p-2">
                <Card :item="item" type="serie tv" @fail-fav="updateFail()" @succ-fav="updateSucc()"></Card>
            </div>
        </div>

        <VisibleBar :visible-film="visiblePeple" :name="'Persone'" @change-vis-parent="visiblePeple = !visiblePeple">
        </VisibleBar>
        <div v-show="visiblePeple"
            class="justify-center grid lg:grid-cols-6 gap-4 m-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
            <div v-for="item in person" class="flex flex-col justify-between p-2">
                <RouterLink :to="'/person/' + item.id">
                    <div class="flex justify-center py-5">
                        <img v-if="item.profile_path" :src="'https://image.tmdb.org/t/p/w200' + item.profile_path"
                            :alt="item.name" class="rounded-lg">
                        <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center">
                            <img src="https://image.tmdb.org/t/p/w200/k1Q1ayXdOb6H1emGtnGGwy63uPU.jpg" alt=""
                                class="rounded-xl relative opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="gray" class="max-w-10 max-h-10 absolute">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                    </div>
                </RouterLink>
                <span class="flex rounded-lg bg-indigo-500 text-indigo-200 p-4 text-center font-bold text-xs">
                    {{ item.name }}
                </span>
            </div>
        </div>

        <PageNav :n-page="nPage" :current-page="currentPage" :visible-nav="visibleNav"
            :limit-lower-parent="searchStore.search.limitLower"
            @change-page="(n, limitLowerChild) => { setCards(search, n); searchStore.updateLimitLower(limitLowerChild) }">
        </PageNav>
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
import { searchByKeyword } from "@/api/tmdb"
import type { Media, Result } from "@/api/tmdb";
import VisibleBar from "@/components/VisibleBar.vue";
import PageNav from "@/components/PageNav.vue";
import ToastFail from "@/components/ToastFail.vue";
import ToastSuccess from "@/components/ToastSuccess.vue";
import Card from "@/components/Card.vue";
import { useUserStore } from "@/stores/user";
import { useSearchbarStore } from "@/stores/searchbar";
export default {
    setup() {
        const userStore = useUserStore();
        const searchStore = useSearchbarStore();
        return { userStore, searchStore }
    },
    data() {
        return {
            search: useSearchbarStore().search.value as string,
            movies: [] as Media[],
            tv: [] as Media[],
            person: [] as Media[],
            visibleFilm: true,
            visibleTv: true,
            visiblePeple: true,
            nPage: 0 as number,
            currentPage: useSearchbarStore().search.page as number | null,
            visibleNav: false,
            nSuccess: 0 as number,
            nFail: 0 as number,
            mapSuccess: {} as { [key: number]: number },
            mapFail: {} as { [key: number]: number }
        };
    },
    watch: {
        search(value) {
            this.setCards(value);
            useSearchbarStore().updateValue(value);
        }
    },
    created() {
        if (this.search != null && this.currentPage != null)
            this.setCards(this.search, this.currentPage);
    },
    methods: {
        async setCards(keyword: string, page: number = 1) {
            this.visibleNav = false;
            let result: Result | null = await searchByKeyword(keyword, page);
            if (result) {
                this.nPage = result.total_pages;
                this.currentPage = result.page;
                useSearchbarStore().updatePage(this.currentPage);
                if (result.total_results == 0) {
                    this.nPage = 0;
                    this.currentPage = 0;
                }
                this.movies = result.results.filter((item: Media) => item.media_type == "movie");
                this.tv = result.results.filter((item: Media) => item.media_type == "tv");
                this.person = result.results.filter((item: Media) => item.media_type == "person");
            }
            this.visibleNav = true;
        },
        updateFail() {
            this.nFail++;
            this.mapFail[this.nFail] = 1;
        },
        updateSucc() {
            this.nSuccess++;
            this.mapSuccess[this.nSuccess] = 1;
        }
    },
    components: { VisibleBar, PageNav, ToastSuccess, ToastFail, Card }
}
</script>