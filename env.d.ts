/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

export declare global {
    interface Window extends ServiceWorkerGlobalScope { }

    // need for addEventListener
    interface WindowEventMap extends ServiceWorkerGlobalScopeEventMap { }
}
