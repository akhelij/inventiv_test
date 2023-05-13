import './bootstrap';
import { createApp } from 'vue';
import Calculator from './components/Calculator.vue';

createApp({})
    .component('Calculator', Calculator)
    .mount('#app')
