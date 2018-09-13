/*jshint esversion: 6 */

const App = new Vue({
  name: 'App',
  template: `
    <main id="app">
      <div id="vue-mapa">
        <mapa-brasil></mapa-brasil>
      </div>
    </main>
  `,
  el: '#app'
});