<template>
    <div>
        document
        <div class="border rounded p-1">
            <draggable v-model="list" handle=".handle" ghost-class="ghost" @start="drag = true" @end="drag = false"
                item-key="id">
                <template #item="{ element, index }">
                    <div class="">
                        <textedit />
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import textedit from "./text-edit.vue"
import { Icon } from "@iconify/vue"

export default {
    components: { Icon, draggable, textedit },
    data() {
        return {
            btnShow: false,
            menuShow: false,
            list: [
                { name: "John", text: "", id: 0 },
                { name: "Joao", text: "", id: 1 },
                { name: "Jean", text: "", id: 2 }
            ],
            drag: false,
        }
    },
}
</script>
<style scoped>
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>