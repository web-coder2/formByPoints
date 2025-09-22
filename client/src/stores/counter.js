import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })


export const useRowsStore = defineStore('rows', () => {

    const rows = ref([])
    const types = ['Обычный', 'LDAP']

    function addNewRow() {
      rows.value.push({
        name: "",
        type: types[0],
        login: "",
        password: "",
        arrayErrors: [],
        namesSplitArray: []
      })
    }

    function deleteSelfRow(index) {
      rows.value.splice(index, 1)
    }

    function setterNamesByName(index) {
      const nameStr = rows.value[index].name;
      if (nameStr) {
        rows.value[index].namesSplitArray = nameStr.split(';');
      }
    }

    return { rows, types, addNewRow, deleteSelfRow, setterNamesByName }
})