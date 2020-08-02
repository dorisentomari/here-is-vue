import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
  input: './src/index.js',
  output: {
    format: 'umd',
    file: 'dist/umd/vue.js',
    name: 'Vue',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    process.env.NODE_ENV === 'development' ?
      serve({
        open: false,
        openPage: '/public/index.html',
        port: 4500,
        contentBase: ''
      }) :
      null
  ]
}
