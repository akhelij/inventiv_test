<template>
    <div class="mx-auto overflow-hidden mt-10 shadow-lg mb-2  shadow-lg border rounded-lg">
        <div class="">
            <div class="p-5 text-white text-center text-3xl ">Calculator</div>
            <div class="pt-16 p-5 pb-0 text-white text-right text-3xl ">{{ state.operation }}</div>
            <div class="p-5 text-white text-right text-3xl ">= <span class="text-orange-500">{{ state.result }}</span></div>


            <div class="grid grid-cols-4 justify-between">
                <div v-for="button in buttons" :key="button" class="calculator-btn">
                    <span>{{button}}</span>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    name: 'Calculator',
    setup() {
        const state = reactive({
            operation: '100 + 200',
            operator: null,
            result: '300',
        })

        const buttons = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '×', '=', '0', '.', '÷'];
        return { buttons, state }
    }
}
</script>
