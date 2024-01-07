<template>
    <div class="container mx-auto justify-center">

        <div v-if="loading" role="status"
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

        <div v-else-if="!fav.data && fav.fromCache"
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

        <span v-else-if="!fav.data && !fav.fromCache" class="flex text-sm justify-center">
            Non hai ancora aggiunto nessun film o serie ai preferiti!
        </span>

        <div v-else class="w-full">
            <div class="hidden md:block">
                <table class="w-full text-sm text-left text-indigo-500 rounded-lg shadow-md">
                    <thead class="text-xs text-indigo-100 uppercase bg-indigo-500">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Image</span>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Titolo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Categoria
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Voto
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Notifiche
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Trash</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in fav?.data" class="bg-white border-b hover:bg-gray-50">
                            <td class="p-4 w-40">
                                <RouterLink :to="item.type == 'film' ? '/movie/' + index : '/tv/' + index">
                                    <img v-if="item.posterPath"
                                        :src="'https://image.tmdb.org/t/p/original' + item.posterPath" :alt="item.filmName"
                                        class="rounded-lg w-40">
                                    <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center w-40">
                                        <img src="https://image.tmdb.org/t/p/original/wUwizGzbTk5CTiKBnE4Pq1MONwD.jpg"
                                            alt="" class="rounded-xl relative opacity-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="gray" class="max-w-10 max-h-10 absolute">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                        </svg>
                                    </div>
                                </RouterLink>
                            </td>
                            <th scope="row" class="px-6 py-4 font-bold text-indigo-500">
                                {{ item.filmName }}
                            </th>
                            <td class="px-6 py-4 uppercase font-semibold text-xs text-indigo-400">
                                {{ item.type }}
                            </td>
                            <td class="px-6 py-4">
                                <Vote :vote="item.voteAverage"></Vote>
                            </td>
                            <td class="px-6 py-4 align-middle">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" class="sr-only peer" :checked="item.notify"
                                        @change="async () => { setNotifyFav(index, !item.notify); item.notify = !item.notify }">
                                    <div
                                        class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600">
                                    </div>
                                </label>
                            </td>
                            <td class="px-4 py-4">
                                <button @click="removeFav(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="w-6 h-6 hover:fill-red-500 fill-indigo-400 hover:stroke-red-700">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="block md:hidden">
                <div class="grid grid-cols-1 gap-4 mx-1.5">
                    <div v-for="(item, index) in fav?.data" class="rounded-xl bg-white shadow-xl">
                        <div class="flex flex-col">
                            <div class="flex flex-row w-full h-full">
                                <RouterLink :to="item.type == 'film' ? '/movie/' + index : '/tv/' + index"
                                    class="w-6/12 flex items-end p-3">
                                    <img v-if="item.posterPath"
                                        :src="'https://image.tmdb.org/t/p/original' + item.posterPath" :alt="item.Film"
                                        class="rounded-lg w-60">
                                    <div v-else class="flex justify-center rounded-xl bg-gray-200 items-center">
                                        <img src="https://image.tmdb.org/t/p/original/wUwizGzbTk5CTiKBnE4Pq1MONwD.jpg"
                                            alt="" class="rounded-xl relative opacity-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="gray" class="max-w-10 max-h-10 absolute">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                        </svg>
                                    </div>
                                </RouterLink>
                                <div class="p-4 flex flex-col w-full">
                                    <span class="text-xs text-indigo-300 uppercase font-light">{{ item.type }}</span>
                                    <span class="text-md text-indigo-500 font-medium">{{ item.filmName }}</span>
                                </div>
                            </div>
                            <div class="flex flex-row w-full h-full justify-around">
                                <div class="p-4 self-center flex items-center">
                                    <Vote :vote="item.voteAverage"></Vote>
                                </div>
                                <div class="p-1 self-center flex items-center">
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer" :checked="item.notify"
                                            @change="async () => { setNotifyFav(index, !item.notify); item.notify = !item.notify }">
                                        <div
                                            class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600">
                                        </div>
                                    </label>
                                </div>
                                <div class="text-indigo-500 p-4 self-center flex items-center">
                                    <button @click="removeFav(index)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor"
                                            class="w-6 h-6 hover:fill-red-500 fill-indigo-400 hover:stroke-red-700">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-for="i in nSuccess">
        <ToastSuccess v-if="mapSuccess[i]" @finish="delete mapSuccess[i]">
            {{ successMessage }}
        </ToastSuccess>
    </div>

    <div v-for="i in nFail">
        <ToastFail v-if="mapFail[i]" @finish="delete mapFail[i]">
            {{ failMessage }}
        </ToastFail>
    </div>
</template>

<script lang="ts">
import { getUsersFav, removeFavById, setNotify } from '@/api/firebase/db';
import { useUserStore } from "@/stores/user";
import type { DocumentData } from 'firebase/firestore';
import Vote from '@/components/Vote.vue';
import ToastFail from "@/components/ToastFail.vue";
import ToastSuccess from "@/components/ToastSuccess.vue";
export default {
    setup() {
        const userStore = useUserStore();
        return { userStore }
    },
    data() {
        return {
            fav: { data: null, fromCache: false } as { data: DocumentData | null, fromCache: boolean },
            loading: true as boolean,
            nSuccess: 0 as number,
            nFail: 0 as number,
            mapSuccess: {} as { [key: number]: number },
            mapFail: {} as { [key: number]: number },
            failMessage: "" as string,
            successMessage: "" as string
        }
    },
    async created() {
        this.loading = true;
        this.fav = await getUsersFav();
        this.loading = false;
    },
    methods: {
        async removeFav(id: number | string) {
            this.loading = true;
            let res = await removeFavById(id);
            if (res.message == "Success") {
                this.fav = await getUsersFav();
                this.loading = false;
            }
        },
        async setNotifyFav(id: number | string, flag: boolean) {
            let res = await setNotify(id, flag);
            if (res.message == "Success") {
                flag ? this.successMessage = "Preferenza salvata ed iscritto alle notifiche su questo media" : this.successMessage = "Preferenza salvata ed discritto alle notifiche su questo media";

                if (flag) {
                    if (Notification.permission != "granted")
                        return Notification.requestPermission()
                            .then((value) => {
                                if (value != 'granted') {
                                    this.failMessage = "Preferenza salvata ma per ricevere le notifiche è necessario fornire l'autorizzazione";
                                    this.nFail++;
                                    this.mapFail[this.nFail] = 1;
                                }
                                else {
                                    this.nSuccess++;
                                    this.mapSuccess[this.nSuccess] = 1;
                                }
                            })
                    if (!res.fromCache) {
                        this.nSuccess++;
                        this.mapSuccess[this.nSuccess] = 1;
                        return;
                    }
                    this.failMessage = "Preferenza salvata ma per ricevere le notifiche occorre essere online";
                } else {
                    this.nSuccess++;
                    this.mapSuccess[this.nSuccess] = 1;
                    return;
                }
            }
            else
                this.failMessage = res.message;

            this.nFail++;
            this.mapFail[this.nFail] = 1;
        }
    },
    components: { Vote, ToastFail, ToastSuccess }
}
</script>