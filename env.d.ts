/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

export declare global {
    interface Window extends ServiceWorkerGlobalScope { }

    interface WindowEventMap extends ServiceWorkerGlobalScopeEventMap { }
}
