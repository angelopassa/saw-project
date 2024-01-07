<template>
    <div class="flex justify-center mx-auto">
        <div
            class="flex flex-col items-center justify-center p-4 mt-4 rounded-lg border-indigo-200 border-2 lg:w-6/12 w-11/12">
            <span class="font-extrabold text-2xl text-indigo-500">
                Recupera Password
            </span>
            <div class="relative mt-4 w-full">
                <input type="email" id="email" v-model="email"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                <label for="email"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">E-mail</label>
            </div>
            <button class="rounded-full bg-indigo-700 text-indigo-50 text-center p-4 mt-5 min-w-full font-bold"
                @click="restore()">
                Recupera Password
            </button>
            <p class="text-red-500 text-sm font-semibold mt-5" v-if="restoreError">{{ errorMessage }}
            </p>
            <p class="text-green-500 text-sm font-semibold mt-5" v-if="restoreSuccess">Una mail è stata inviata a {{ email
            }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user"
export default {
    setup() {
        const userStore = useUserStore();
        return { userStore }
    },
    data() {
        return {
            email: "" as string,
            restoreError: false as boolean,
            restoreSuccess: false as boolean,
            errorMessage: "" as string
        }
    },
    watch: {
        email() {
            this.restoreError = false;
            this.restoreSuccess = false;
        }
    },
    methods: {
        async restore() {
            let error = await this.userStore.restorePassword(this.email);
            console.log(error);
            if (error) {
                this.restoreError = true;
                if (error == "auth/network-request-failed")
                    this.errorMessage = "Nessuna connessione ad Internet!";
                else
                    this.errorMessage = "Utente non trovato!";
            }
            else this.restoreSuccess = true;
        }
    }
}
</script>