/*jshint esversion: 6 */

const MapaEstado = Vue.component('MapaEstado', {
    name: 'MapaEstado',
    template: /*html*/`
        <g 
        v-on:click="clickAction" 
        v-bind:class="[classObject]" 
        v-on:mouseover="infoMouseOver"
        :data-regional="item.regional"
        >
            <path :d="item.svgData" />
            <text :transform="item.textData" class="abreviation-state">{{item.uf|upper}}</text>
            <circle 
                v-if="showCircleInfo"
                :cy="item.circleData.cy" 
                :cx="item.circleData.cx" 
                r="10" 
                v-bind:class="[counterClassObject]" 
            />
            <text :x="item.circleText.x" :y="item.circleText.y" class="semaforo">{{altText|pad}}</text>
        </g>
    `,
    props: {
        item: { 
            type: Object,
            default: () => ({
                altText: "--"
            }),
        },
        showCircleInfo: {
            type: Boolean,
            default: true
        },
    },
    data: () => {
        return {
            active: false,
            counterActive: false,
            altText: () => { return this.item.altText ? this.item.altText: "--"; }
        };
    },
    filters: {
        upper: (value) => {
            if (!value) return '';
            value = value.toUpperCase();
            return value;
        },
        pad: (value) => {
            if (!value) return '';
            return ('000000000' + value).substr(-2);
        }
    },
    methods: {
        clickAction: function (event) {
            console.log('mapa-estado: clickAction()');
            this.$emit("stateSelectedEvent", this);
        },
        resetAction: function () {
            this.disable();
        },
        disable: function () {
            console.log('mapa-estado: disabled ',this.item.uf);
            this.active = false;
            this.hideCounter();
        },
        enable: function () {
            console.log('mapa-estado: enable ');
            this.active = true;
            this.showCounter();
        },
        setAltText: function (val) {
            this.altText = val;
        },
        hideCounter: function () {
            this.counterActive = false;
        },
        showCounter: function () {
            this.counterActive = true;
        },
        infoMouseOver: function (args) {
            this.$emit("stateMouseOverEvent", { src: this, event: args });
        }
    },
    created() {
        this.altText = this.item.altText;
    },
    computed: {
        classObject: function () {
            return this.active ? ["mapa-svg-estados-active"] : ["mapa-svg-estados"];
        },
        counterClassObject: function () {
            return this.counterActive ? ["sphere active"] : ["sphere"];
        },
    },
});

