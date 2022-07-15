<template>
    <div class="p-2">
        <!-- <document /> -->

        <textedit />
    </div>
</template>

<script>
import textedit from "./components/text-edit.vue"
import document from "./components/document.vue"

export default {
    components: { textedit, document },
    data() {
        return {
            toolbar: ['bold', 'italic', 'underline']
        }
    },
    mounted() {
        console.log("mounted");
    },
}
</script>
<style>
</style>