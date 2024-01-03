<template>
    <div
        class="flex flex-row rounded-full border-2 border-indigo-300 bg-indigo-300 w-fit mx-auto mb-5 flex-nowrap text-sm font-light divide-x text-slate-500">
        <div class="rounded-xl p-2 font-normal">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1 || !visibleNav">
                Prev
            </button>
        </div>
        <div v-show="limitLower >= 1" class="rounded-xl py-2 p-3 hidden sm:block"
            :class="1 == currentPage ? 'bg-indigo-600 text-white' : ''">
            <button @click="changePage(1)" :disabled="!visibleNav">
                1
            </button>
        </div>
        <div v-show="limitLower >= 1" class="rounded-xl py-2 p-3 hidden sm:block">
            ...
        </div>
        <div v-for="n in limitPage" class="rounded-xl py-2 p-3 hidden sm:block"
            :class="(n + limitLower) == currentPage ? 'bg-indigo-600 text-white' : ''">
            <button @click="changePage(n + limitLower)" :disabled="!visibleNav">
                {{ n + limitLower }}
            </button>
        </div>
        <div v-show="limitLower + 10 < nPage && nPage > 10" class="rounded-xl py-2 p-3 hidden sm:block">
            ...
        </div>
        <div v-show="limitLower + 10 < nPage && nPage > 10" class="rounded-xl py-2 p-3 hidden sm:block"
            :class="nPage == currentPage ? 'bg-indigo-600 text-white' : ''">
            <button @click="changePage(nPage)" :disabled="!visibleNav">
                {{ nPage }}
            </button>
        </div>
        <div class="p-2 rounded-xl font-normal">
            <button @click="changePage(currentPage + 1)" :disabled="currentPage == nPage || !visibleNav">
                Next
            </button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ['nPage', 'currentPage', 'visibleNav', 'limitLowerParent'],
    emits: ['changePage'],
    data() {
        return {
            limitPage: 0,
            limitLower: this.limitLowerParent,
            maxPage: 10
        }
    },
    created() {
        this.limitPage = this.maxPage;
        if (this.nPage < this.maxPage)
            this.limitPage = this.nPage;
    },
    beforeUpdate() {
        this.limitLower = this.limitLowerParent;
        this.limitPage = this.maxPage;
        if (this.nPage < this.limitPage)
            this.limitPage = this.nPage;
    },
    methods: {
        changePage(page: number) {
            if (this.nPage > this.maxPage) {
                if (page == 1) this.limitLower = 0;
                else if (page <= this.nPage - this.maxPage) this.limitLower += (page - this.currentPage);
                else this.limitLower = this.nPage - this.maxPage;
            }
            this.$emit('changePage', page, this.limitLower);
        }
    }
}
</script>