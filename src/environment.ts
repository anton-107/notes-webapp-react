/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ROOT: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const API_ROOT: string | undefined = import.meta.env.VITE_API_ROOT;

export { API_ROOT };
