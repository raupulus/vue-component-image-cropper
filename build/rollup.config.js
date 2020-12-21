import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: {
        name: 'CropperModal',
        exports: 'v-component-image-cropper',
    },
    plugins: [
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
            data: { // This helps to inject variables in each <style> tag of every Vue SFC
                //scss: () => `@import "@/styles/variables.scss";`, 
                //sass: () => `@import "@/styles/variables.scss"`,
              },
            style: {
                preprocessOptions: {
                    scss: {
                        includePaths: ['node_modules'],
                    }
                },
            }
        }),
        buble(), // Transpile to ES5
        scss(),
        commonjs(),
    ],
};