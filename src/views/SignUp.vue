<template>
    <div class="flex container mx-auto justify-center p-4">
        <div class="flex lg:flex-row justify-center flex-col w-full lg:w-fit">
            <div
                class="flex flex-col items-center p-4 mt-4 rounded-lg border-indigo-200 border-2 basis-1/4 lg:w-40 min-w-full lg:mr-5">
                <span class="font-extrabold text-2xl text-indigo-500">
                    Registrati
                </span>
                <div class="relative mt-4 w-full">
                    <input type="text" id="username" v-model="username"
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="username"
                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Username</label>
                </div>
                <p class="text-red-500 text-sm font-semibold text-left w-full" v-if="usernameError">L'username deve
                    contenere almeno 3
                    caratteri
                </p>
                <div class="relative mt-4 w-full">
                    <input type="email" id="emailSignUp" v-model="emailSignUp"
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="emailSignUp"
                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">E-mail</label>
                </div>
                <p class="text-red-500 text-sm font-semibold text-left w-full" v-if="emailErrorSignUp">
                    {{ emailErrorSignUpMessage }}</p>
                <div class="relative mt-4 w-full">
                    <input type="password" id="passwordSignUp" v-model="passwordSignUp"
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                    <label for="passwordSignUp"
                        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                </div>
                <p class="text-red-500 text-sm font-semibold text-left w-full" v-if="passwordSignUpError">{{
                    passwordSignUpErrorMessage }}</p>
                <button class="rounded-full bg-indigo-700 text-indigo-50 text-center p-4 mt-5 min-w-full font-bold"
                    @click="signUp()">
                    Registrati
                </button>
                <p class="text-red-500 text-sm font-semibold mt-5" v-if="signUpError">{{ signUpErrorMessage }}
                </p>
            </div>

            <div
                class="flex flex-col items-center p-4 mt-4 rounded-lg border-indigo-200 border-2 basis-1/4 lg:w-52 min-w-full justify-between">
                <div class="flex flex-col items-center w-full">
                    <span class="font-extrabold text-2xl text-indigo-500">
                        Login
                    </span>
                    <div class="relative mt-4 w-full">
                        <input type="email" id="emailLogin" v-model="emailLogin"
                            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="emailLogin"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">E-mail</label>
                    </div>
                    <p class="text-red-500 text-sm font-semibold text-left w-full" v-if="emailErrorLogin">Formato dell'email
                        non
                        valido</p>
                    <div class="relative mt-4 w-full">
                        <input type="password" id="passwordLogin" v-model="passwordLogin"
                            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " />
                        <label for="passwordLogin"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                    </div>
                    <p class="text-red-500 text-sm font-semibold text-left w-full" v-if="passwordLoginEmpty">Password
                        Vuota</p>
                    <RouterLink to="/restore" class="text-xs mt-2 hover:text-indigo-500 transition-all duration-300">
                        Password Dimenticata?</RouterLink>
                </div>

                <button class="rounded-full bg-indigo-700 text-indigo-50 text-center p-4 mt-5 min-w-full font-bold"
                    @click="login()">
                    Login
                </button>
                <p class="text-red-500 text-sm font-semibold mt-5" v-if="loginError">{{ loginErrorMessage }}
                </p>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import router from "@/router";
export default {
    data() {
        return {
            store: useUserStore(),
            emailSignUp: "",
            passwordSignUp: "",
            emailLogin: "",
            passwordLogin: "",
            username: "",
            emailErrorLogin: false,
            emailErrorSignUp: false,
            loginError: false,
            loginErrorMessage: "",
            passwordLoginEmpty: false,
            signUpError: false,
            signUpErrorMessage: "",
            passwordSignUpError: false,
            passwordSignUpErrorMessage: "",
            usernameError: false,
            emailErrorSignUpMessage: ""
        }
    },
    watch: {
        emailLogin() {
            this.emailErrorLogin = false;
            this.loginError = false;
        },
        emailSignUp() {
            this.emailErrorSignUp = false;
            this.signUpError = false;
        },
        passwordLogin(nVal) {
            if (nVal.length != 0) this.passwordLoginEmpty = false;
            this.loginError = false;
        },
        passwordSignUp(nVal) {
            if ((nVal.length != 0 && this.passwordSignUpErrorMessage == "Password Vuota") || (nVal.length >= 6 && this.passwordSignUpErrorMessage == "La password deve contenere almeno 6 caratteri"))
                this.passwordSignUpError = false;
        },
        username(nVal) {
            if (nVal.length >= 3) this.usernameError = false;
        }
    },
    methods: {
        async signUp() {
            if (this.username.length < 3) {
                this.usernameError = true;
                return;
            }
            if (this.emailSignUp.length == 0) {
                this.emailErrorSignUp = true;
                this.emailErrorSignUpMessage = "Email Vuota";
                return;
            }
            if (this.passwordSignUp.length == 0) {
                this.passwordSignUpError = true;
                this.passwordSignUpErrorMessage = "Password Vuota";
                return;
            }
            if (this.passwordSignUp.length < 6) {
                this.passwordSignUpError = true;
                this.passwordSignUpErrorMessage = "La password deve contenere almeno 6 caratteri";
                return;
            }
            let error = await this.store.signup(this.emailSignUp, this.passwordSignUp, this.username);
            if (!error) router.push("/");
            console.log(error);
            if (error == "auth/invalid-email") {
                this.emailErrorSignUp = true;
                this.emailErrorSignUpMessage = "Formato dell'email non valido";
            } else if (error == "auth/email-already-in-use") {
                this.signUpError = true;
                this.signUpErrorMessage = "Email già in uso!";
            } else if (error == "auth/network-request-failed") {
                this.signUpError = true;
                this.loginErrorMessage = "Nessuna connessione ad Internet!"
            }
        },
        async login() {
            if (this.passwordLogin.length == 0) {
                this.passwordLoginEmpty = true;
                return;
            }
            let error = await this.store.login(this.emailLogin, this.passwordLogin);
            if (!error) router.push("/");
            console.log(error);
            if (error == "auth/invalid-email")
                this.emailErrorLogin = true;
            else if (error == "auth/user-not-found") {
                this.loginError = true;
                this.loginErrorMessage = "Utente non trovato!"
            } else if (error == "auth/wrong-password") {
                this.loginError = true;
                this.loginErrorMessage = "Password Errata!"
            } else if (error == "auth/network-request-failed") {
                this.loginError = true;
                this.loginErrorMessage = "Nessuna connessione ad Internet!"
            }
        }
    }
}
</script>