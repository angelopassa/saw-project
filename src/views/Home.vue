<template>
    <div class="container mx-auto relative px-2 mb-10">

        <VisibleBar :visible-film="visibleFilm" :name="'Film Popolari'" @change-vis-parent="visibleFilm = !visibleFilm"
            class="mt-5">
        </VisibleBar>

        <Carousel ref="carouselFilm" v-bind="settings" :breakpoints="breakpoints" v-show="visibleFilm"
            @slide-start="({ slidingToIndex }) => slidingToIndex === carouselFilm.data.maxSlide.value ? updateFilm() : null">

            <Slide v-if="movies.length != 0" v-for="i in 10" :key="i">
                <div class="carousel__item flex flex-col justify-between p-2">
                    <LoadingCarousel></LoadingCarousel>
                </div>
            </Slide>

            <Slide v-else v-for="item in movies" :key="item.id">
                <div class="carousel__item flex flex-col justify-between p-2">
                    <Card :item="item" type="film" @fail-fav="updateFail()" @succ-fav="updateSucc()"></Card>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <button class="bg-indigo-300 rounded-full text-indigo-600 p-2 mr-1 mt-2"
                    @click.prevent="carouselFilm.slideTo(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                    </svg>
                </button>
                <button class="bg-indigo-300 rounded-full text-indigo-600 p-2"
                    @click.prevent="carouselFilm.slideTo(carouselFilm.data.maxSlide.value)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                    </svg>
                </button>
            </template>
        </Carousel>

        <VisibleBar :visible-film="visibleTv" :name="'Serie TV Popolari'" @change-vis-parent="visibleTv = !visibleTv"
            class="mt-5">
        </VisibleBar>

        <Carousel ref="carouselSeries" v-bind="settings" :breakpoints="breakpoints" v-show="visibleTv"
            @slide-start="({ slidingToIndex }) => slidingToIndex === carouselSeries.data.maxSlide.value ? updateSeries() : null">

            <Slide v-if="tv.length == 0" v-for="i in 10" :key="i">
                <div class="carousel__item flex flex-col justify-between p-2">
                    <LoadingCarousel></LoadingCarousel>
                </div>
            </Slide>

            <Slide v-else v-for="item in tv" :key="item.id">
                <div class="carousel__item flex flex-col justify-between p-2">
                    <Card :item="item" type="serie tv" @fail-fav="updateFail()" @succ-fav="updateSucc()"></Card>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <button class="bg-indigo-300 rounded-full text-indigo-600 p-2 mr-1 mt-2"
                    @click.prevent="carouselSeries.slideTo(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                    </svg>
                </button>
                <button class="bg-indigo-300 rounded-full text-indigo-600 p-2"
                    @click.prevent="carouselSeries.slideTo(carouselSeries.data.maxSlide.value)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                    </svg>
                </button>
            </template>
        </Carousel>

        <VisibleBar :visible-film="visibleUpcoming" :name="'Film In Uscita'"
            @change-vis-parent="visibleUpcoming = !visibleUpcoming" class="mt-5"></VisibleBar>

        <Carousel ref="carouselUpcoming" v-bind="settings" :breakpoints="breakpoints" v-show="visibleUpcoming"
            @slide-start="({ slidingToIndex }) => slidingToIndex === carouselUpcoming.data.maxSlide.value ? updateUpComing() : null">

            <Slide v-if="upcoming.length == 0" v-for="i in 10" :key="i">
                <div class="carousel__item flex flex-col justify-between p-2">
                    <LoadingCarousel></LoadingCarousel>
                </div>
            </Slide>

            <Slide v-else v-for="item in upcoming" :key="item.id">
                <div class="carousel__item flex flex-col justify-between p-2">
                    <Card :item="item" type="upcoming" @fail-fav="updateFail()" @succ-fav="updateSucc()"></Card>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <button class="bg-indigo-300 rounded-full text-indigo-600 p-2 mr-1 mt-2"
                    @click.prevent="carouselUpcoming.slideTo(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                    </svg>
                </button>
                <button class="bg-indigo-300 rounded-full text-indigo-600 p-2"
                    @click.prevent="carouselUpcoming.slideTo(carouselUpcoming.data.maxSlide.value)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                    </svg>
                </button>
            </template>
        </Carousel>
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
import { getPopularMovies, getPopularSeries, getUpcomingMovies, type Media, type Result } from "@/api/tmdb"
import VisibleBar from "@/components/VisibleBar.vue";
import PageNav from "@/components/PageNav.vue";
import Card from "@/components/Card.vue";
import ToastFail from "@/components/ToastFail.vue";
import ToastSuccess from "@/components/ToastSuccess.vue";
import LoadingCarousel from "@/components/LoadingCarousel.vue";
import { useUserStore } from "@/stores/user";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref } from "vue";
export default {
    setup() {
        const userStore = useUserStore();
        const carouselFilm = ref();
        const carouselSeries = ref();
        const carouselUpcoming = ref();
        return { userStore, carouselFilm, carouselSeries, carouselUpcoming }
    },
    data() {
        return {
            settings: {
                itemsToShow: 1,
                snapAlign: "center" as "center",
            },
            breakpoints: {
                700: {
                    itemsToShow: 3.5,
                    snapAlign: 'center',
                },
                1024: {
                    itemsToShow: 5,
                    snapAlign: 'start',
                },
            },
            movies: [] as Media[],
            tv: [] as Media[],
            visibleFilm: true,
            visibleTv: true,
            visibleUpcoming: true,
            upcoming: [] as Media[],
            nSuccess: 0 as number,
            nFail: 0 as number,
            mapSuccess: {} as { [key: number]: number },
            mapFail: {} as { [key: number]: number },
            nPageFilm: 0 as number,
            pageLoadedFilm: 0 as number,
            nPageSeries: 0 as number,
            pageLoadedSeries: 0 as number,
            nPageUpcoming: 0 as number,
            pageLoadedUpcoming: 0 as number,
        };
    },
    async created() {
        let result: Result | null = await getPopularMovies(1);
        if (result) {
            this.nPageFilm = result.total_pages;
            this.pageLoadedFilm = result.page;
            this.movies = result.results;
        }
        result = await getPopularSeries(1);
        if (result) {
            this.nPageSeries = result.total_pages;
            this.pageLoadedSeries = result.page;
            this.tv = result.results;
        }
        result = await getUpcomingMovies(1);
        if (result) {
            this.nPageUpcoming = result.total_pages;
            this.pageLoadedUpcoming = result.page;
            this.upcoming = result.results;
        }
    },
    methods: {
        updateFail() {
            this.nFail++;
            this.mapFail[this.nFail] = 1;
        },
        updateSucc() {
            this.nSuccess++;
            this.mapSuccess[this.nSuccess] = 1;
        },
        async updateFilm() {
            if (this.pageLoadedFilm != this.nPageFilm) {
                let result: Result | null = await getPopularMovies(++this.pageLoadedFilm);
                if (result)
                    this.movies = this.movies.concat(result.results);
            }
        },
        async updateSeries() {
            if (this.pageLoadedSeries != this.nPageSeries) {
                let result: Result | null = await getPopularSeries(++this.pageLoadedSeries);
                if (result)
                    this.tv = this.tv.concat(result.results);
            }
        },
        async updateUpComing() {
            if (this.pageLoadedUpcoming != this.nPageUpcoming) {
                let result: Result | null = await getUpcomingMovies(++this.pageLoadedUpcoming);
                if (result)
                    this.upcoming = this.upcoming.concat(result.results);
            }
        }
    },
    components: {
        Carousel,
        Slide,
        Navigation,
        VisibleBar,
        PageNav,
        Card,
        ToastFail,
        ToastSuccess,
        LoadingCarousel
    }
}
</script>

<style>
.carousel__prev,
.carousel__next {
    background-color: #5058ec !important;
    border-radius: 100%;
    padding: 3px;
}

.carousel__icon {
    color: rgb(205, 219, 254);
}
</style>