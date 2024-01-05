import { defineStore } from 'pinia'

export const useSearchbarStore = defineStore('searchbar', {
    state: () => ({
        search: {
            value: null as string | null,
            page: null as number | null,
            limitLower: 0 as number
        }
    }),
    actions: {
        updateValue(newState: string) {
            this.search.value = newState;
        },
        updatePage(newPage: number) {
            this.search.page = newPage;
        },
        updateLimitLower(newLimit: number){
            this.search.limitLower = newLimit;
        }
    }
})