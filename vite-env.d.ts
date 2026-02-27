/// <reference types="vite/client" />

// Allow importing .md files as raw strings via Vite's ?raw suffix
declare module '*.md?raw' {
    const content: string;
    export default content;
}
