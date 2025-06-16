interface ImportMetaEnv {
  VITE_APP_URL: string
  VITE_SAMPLE_USERNAME: string
  VITE_SAMPLE_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
