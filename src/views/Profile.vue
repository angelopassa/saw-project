<template>
    <div class="container mx-auto px-3">
        <span class="flex justify-center text-indigo-500 text-xl font-bold">
            Modifica Profilo
        </span>

        <div class="flex justify-center flex-col">
            <div class="relative mt-4 w-full">
                <input type="text" id="username" v-model="username"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                <label for="username"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Username</label>
                <p class="text-red-500 text-sm font-semibold" v-if="usernameError">L'username deve contenere almeno 3
                    caratteri</p>
            </div>
            <p v-show="showUsernameSuccessMessage"
                class="text-green-500 bg-green-100 font-semibold w-full text-sm rounded-full text-center p-2 mt-1">Username
                aggiornato con successo!</p>
            <button class="rounded-full bg-indigo-700 text-indigo-50 text-center p-1 mt-2 min-w-full text-bold text-sm"
                @click="updateUsername()">
                Cambia Username
            </button>
            <div class="relative mt-4 w-full">
                <input type="password" id="oldPassword" v-model="oldPassword"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                <label for="oldPassword"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Vecchia
                    Password</label>
            </div>
            <p class="text-red-500 text-sm font-semibold text-left w-full" v-if="oldPasswordError">Password non Corretta</p>
            <div class="relative mt-4 w-full">
                <input type="password" id="newPassword" v-model="newPassword"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                <label for="newPassword"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nuova
                    Password</label>
            </div>
            <p class="text-red-500 text-sm font-semibold text-left w-full" v-if="newPasswordError">
                {{ newPasswordErrorMessage }}</p>
            <p v-show="showPasswordSuccessMessage"
                class="text-green-500 bg-green-100 font-semibold w-full text-sm rounded-full text-center p-2 mt-1">Password
                aggiornata con successo!</p>
            <button class="rounded-full bg-indigo-700 text-indigo-50 text-center p-1 mt-2 min-w-full text-bold text-sm"
                @click="changePassword()">
                Aggiorna Password
            </button>
        </div>
        <button
            class="flex flex-row rounded-full justify-center gap-2 bg-red-500 text-red-100 p-2 mt-5 min-w-full text-bold text-md"
            @click="deleteProf()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clip-rule="evenodd" />
            </svg>
            <span>
                Elimina Profilo
            </span>
        </button>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
export default {
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    data() {
        return {
            username: useUserStore().user.displayName as string,
            usernameError: false,
            newPassword: "" as string,
            oldPassword: "" as string,
            oldPasswordError: false,
            newPasswordError: false,
            newPasswordErrorMessage: "",
            showPasswordSuccessMessage: false,
            showUsernameSuccessMessage: false
        }
    },
    watch: {
        username(newValue) {
            this.showUsernameSuccessMessage = false;
            if (newValue.length < 3)
                this.usernameError = true;
            else
                this.usernameError = false;
        },
        oldPassword() {
            this.oldPasswordError = false;
            this.showPasswordSuccessMessage = false;
        },
        newPassword() {
            this.newPasswordError = false;
            this.showPasswordSuccessMessage = false;
        }
    },
    methods: {
        async changePassword() {
            if (this.newPassword.length == 0) {
                this.newPasswordError = true;
                this.newPasswordErrorMessage = "Password Vuota";
                return;
            }
            if (this.newPassword.length < 6) {
                this.newPasswordError = true;
                this.newPasswordErrorMessage = "La password deve contenere almeno 6 caratteri";
                return;
            }
            let email = this.userStore.user.email;
            let error = await this.userStore.login(email, this.oldPassword);
            if (error) {
                this.oldPasswordError = true;
                return;
            }
            error = await this.userStore.changePassword(this.newPassword);
            if (!error) this.showPasswordSuccessMessage = true;
        },
        async updateUsername() {
            let error = await this.userStore.changeUsername(this.username);
            if (!error) this.showUsernameSuccessMessage = true;
        },
        async deleteProf() {
            let error = await this.userStore.deleteProfile();
            if (!error) router.push('/');
        }
    }
}
</script>