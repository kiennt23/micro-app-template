import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "{{cookiecutter.app_name | replace('-', '_')}}",
            filename: "remoteEntry.js",
            // Modules to expose
            exposes: {
                "./{{cookiecutter.app_root_module_name}}": "./{{cookiecutter.app_source_dir}}/{{cookiecutter.app_root_module_name}}"
            },
            shared: ['react']
        })
    ]
})
