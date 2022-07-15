import { defineStore } from 'pinia'

export const toolbarStore = defineStore('toolbarStore', {

  state: () => ({
    isOpen: false
  }),
  actions: {
    open() {
      // muda o estado
      this.isOpen = true
    },
    close() {
      // muda o estado
      this.isOpen = false
    },
  },
})