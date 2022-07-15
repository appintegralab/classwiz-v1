<template>
    <div>
        <contenteditable class="p-1 text-lg" tag="div" :contenteditable="isEditable" v-model="message" :no-nl="true" :no-html="true"
            @returned="enterPressed" />
        <div>
            {{message}}
        </div>
        <div ref="textEdit" v-html="content" contenteditable="true" class="p-1 border rounded" @input="onInput"
            @mouseup="onMouseUp">

        </div>
        <q-btn @click="aplicaBold">
            bold
        </q-btn>
        <div class="mt-2 p-2 border rounded">
            {{ contentHtml }}
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue"
import selTool from "./selection-tool"
import contenteditable from 'vue-contenteditable'

export default {
    components: { Icon, contenteditable },
    data() {
        return {
            content: 'oi <strong>gente</strong> um teste <strong>bacana e bonita</strong> aquela moça',
            contentHtml: "",
            menuShow: false,
            selecao: "",
            fontSize: "9pt",
            isEditable: true,
            message: "hello"
        }
    },
    mounted() {
        let self = this
        console.log("mounted");


    },
    methods: {
        enterPressed() {
            alert('Enter Pressed');
        },
        onInput(e) {
            let content = e.target.innerHTML
            content = content.replaceAll("&nbsp;", "")
            this.content = content
            this.contentHtml = content
        },

        onMouseUp(e) {
            console.log("MouseUp");

        },

        mouseOver() {
            this.btnShow = true
        },

        MouseLeave() {
            if (!this.menuShow) {
                this.btnShow = false
            }
        },

        keyDown(event) {
            console.log("keyDown");
            if (event.keyCode === 17) {          // when 
                console.log("ctrl is pressed");
                console.log(this.$refs.editor.editor.firstChild);
                this.$refs.editor.editor.firstChild.contentEditable = false
            }
        },

        keyUp(event) {
            console.log("keyUp");
            if (event.keyCode === 17) {          // when 
                console.log("ctrl is pressed");
                console.log(this.$refs.editor.editor.firstChild);
                this.$refs.editor.editor.firstChild.contentEditable = true
            }
        },

        aplicaBold() {

            selTool.aplicaBold(this.$refs.textEdit)
        }
    }
}
</script>
<style>
.ql-editor {
    font-size: v-bind('fontSize');
    font-family: 'Raleway' !important;
    padding: 8px;
}

.ql-tooltip {
    z-index: 1000 !important;
}

.ql-container.ql-bubble:not(.ql-disabled) a::before {
    display: none !important;
}

.ql-container.ql-bubble:not(.ql-disabled) a::after {
    display: none !important;
}
</style> 