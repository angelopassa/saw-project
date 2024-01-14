<template>
    <div role="status" class="space-y-4 animate-pulse">
        <div class="flex items-center justify-center w-full h-72 bg-gray-300 rounded sm:w-52">
            <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 18">
                <path
                    d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
        </div>
        <div class="w-full">
            <div class="h-8 bg-gray-200 rounded-full w-full mb-2"></div>
            <div class="w-full flex flex-row gap-1">
                <div class="h-6 bg-gray-200 rounded-full mb-2.5 w-full"></div>
                <div class="h-6 bg-gray-200 rounded-full mb-2.5 w-full"></div>
            </div>
        </div>
        <span class="sr-only">Loading...</span>
    </div>
</template>