<template>
    <div class="mx-auto overflow-hidden mt-10 shadow-lg mb-2  shadow-lg border rounded-lg">
        <div class="p-5 text-white text-center text-3xl ">Calculator</div>

        <textarea class="w-full pt-4 p-5 text-white text-right text-md bg-transparent border-none focus:outline-none" readonly>{{ state.history }}</textarea>
        <div class="pt-16 p-5 pb-0 text-white text-right text-3xl">{{ state.input }}</div>
        <div class="p-5 text-white text-right text-3xl ">= <span class="text-orange-500">{{ state.result }}</span></div>

        <div class="grid grid-cols-4 justify-between">
                <div v-for="button in buttons" :key="button" class="calculator-btn" @click="handleClick(button)">
                    <span>{{button}}</span>
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
            input: null,
            operator: null,
            history: '',
            result: 0,
        })

        const buttons = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '×', 'C', '0', '=', '÷'];

        function handleClick(button) {
            const operators = ['+', '-', '×', '÷']
            const buttonHandlers = [
                {
                    type: 'clear',
                    test: button => button === 'C',
                    handler: () => {
                        state.input = '0'
                        state.history = ''
                        state.operator = state.result = null
                    },
                },
                {
                    type: 'number',
                    test: button => !isNaN(parseFloat(button)),
                    handler: button => {
                        if(state.operator === "=") {
                            state.input = button
                            state.history += "\n"
                            state.operator = null
                        } else if (!state.input || operators.includes(state.input.slice(-1))) {
                            state.input = button
                        } else {
                            state.input += button
                        }
                        state.history += button
                    },
                },
                {
                    type: 'operator',
                    test: button => operators.includes(button),
                    handler: button => {
                        if (!state.input) return
                        if (!state.operator || state.operator == "=") {
                            state.result = parseFloat(state.input);
                        } else {
                            state.result = {
                                '+': state.result + parseFloat(state.input),
                                '-': state.result - parseFloat(state.input),
                                '×': state.result * parseFloat(state.input),
                                '÷': state.result / parseFloat(state.input),
                            }[state.operator]
                        }
                        state.operator = button
                        state.input += " " + button

                        state.history += " "+button+" "
                    },
                },
                {
                    type: 'equals',
                    test: button => button === '=',
                    handler: () => {
                        if (state.operator && state.input) {
                            state.result = {
                                '+': state.result + parseFloat(state.input),
                                '-': state.result - parseFloat(state.input),
                                '×': state.result * parseFloat(state.input),
                                '÷': state.result / parseFloat(state.input),
                            }[state.operator]

                            state.input = String(state.result)
                            state.operator = button

                            state.history += " "+button+" "+ state.input
                        }
                    },
                },
            ]

            buttonHandlers.find(handler => handler.test(button))?.handler(button);
        }


        return { buttons, state, handleClick }
    }
}
</script>
