<template>
    <q-drawer :breakpoint="800" v-model="leftDrawerOpen" bordered :width="180">
        <q-scroll-area class="fit">

            <div class="mt-3 flex justify-center">
                <div class="w-[100px]">
                    <img src="@/assets/logo-rect.png" alt="">
                </div>
            </div>
            <div class="border-t mt-1 mx-2"></div>

            <div @click="$router.push({ path: '/' })"
                class="flex items-center  mr-2 p-2 hover:bg-gray-200 cursor-pointer">
                <div class="text-[14pt] text-slate-900">
                    <span class="iconify" data-icon="mdi:home"></span>
                </div>
                <div class="ml-1 text-[9pt] pt-1 text-slate-900 froboto fw-400">
                    Home
                </div>
            </div>
            <div class="border-t my-1 mx-2"></div>

            <q-tree :nodes="items" dense node-key="label" class="-mb-1">
                <template v-slot:default-header="prop">
                    <div class="truncate w-[144px] h-[20px] my-0 leading-3">
                        <q-avatar class="" size="18px" :text-color="prop.node.fontColor"
                            :style="'height: 18px; width: 18px; background-color: ' + prop.node.cor">
                            <Icon class="text-[12pt]" :icon="prop.node.icon" />
                        </q-avatar>
                        <span @click="clickLink(prop.node)" class="ml-1 fw-500 fraleway text-[9pt] cursor-pointer">
                            {{ prop.node.label }}
                        </span>
                    </div>
                </template>
            </q-tree>

        </q-scroll-area>
    </q-drawer>
</template>

<script>
import { rdb, snapToArray } from "@/snapshot/firebase/firebase.js"
import { ref, onValue, set, get } from "firebase/database"
import { userStore } from "@/components/auth/auth-store"
import { Icon } from "@iconify/vue"

export default {
    components: { Icon },
    data() {
        return {
            leftDrawerOpen: true,
            userStore: userStore(),
            facilitador: false,
            storage: "",
            ies: {},
            items: [
                {
                    label: "Labs",
                    icon: "ps:lab",
                    cor: "white",
                    fontColor: "black",
                    children: [
                        {
                            label: "editor",
                            icon: "ps:lab",
                            cor: "white",
                            fontColor: "black",
                            link: "/lab-editor",
                        }
                    ],
                },

            ]
        }
    },
    watch: {
        'userStore.user': function (newValue) {
            //console.log("watch store", this.userStore.user);
            let self = this
        }
    },
    mounted() {
        let self = this
    },
    methods: {
        toggle() {
            this.leftDrawerOpen = !this.leftDrawerOpen
        },

        clickLink(elem) {
            console.log(elem);
            if (elem.link == undefined) {
                return
            }
            this.$router.push({ path: elem.link })
        }
    }
}
</script>

<style>
</style>