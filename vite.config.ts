import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'
// @ts-ignore
import { resolve } from 'path'

// https://vitejs.dev/config/

// const folders = [
//     ...sync(`${__dirname}/src/components/**/*.vue`),
//     ...sync(`${__dirname}/src/helper/**/*.ts`),
//     ...sync(`${__dirname}/src/module/**/*.ts`),
//     ...sync(`${__dirname}/src/index.ts`)
// ]
//
// const includeFolders = folders.map(f => f.substring(__dirname.length + 1))

export default defineConfig({
    plugins: [
        vue(),
        dts(),
        Components({
            dirs: ['src/components/naive-ui'],
            resolvers: [NaiveUiResolver()]
        })
    ],
    build: {
        manifest: false,
        lib: {
            // @ts-ignore
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'fnForms',
            fileName: 'fn-forms',
            formats: ['es'],
        },
        rollupOptions: {
            input: 'src/index.ts',
            output: {
                inlineDynamicImports: true,
                sourcemap: false,
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        },
    },
})
