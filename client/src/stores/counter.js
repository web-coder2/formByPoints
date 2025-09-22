import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const useRowsStore = defineStore('rows', () => {
    const rows = ref([]);
    const types = ['Обычный', 'LDAP'];

    function addNewRow() {
        rows.value.push({
            name: '',
            type: types[0],
            login: '',
            password: '',
            loginError: false,
            passwordError: false,
            namesSplitArray: [],
        });
    }

    function deleteSelfRow(index) {
        rows.value.splice(index, 1);
    }

    function setterNamesByName(index) {
        const nameStr = rows.value[index].name;
        if (nameStr) {
            rows.value[index].namesSplitArray = nameStr.split(';');
        }
    }

    function validateByError(index) {
        // валидация инпута с логиным
        if (rows.value[index].login.length === 0 || rows.value[index].login.length > 50) {
            rows.value[index].loginError = true;
        } else {
            rows.value[index].loginError = false;
        }

        // валидация инпута с паролем
        if (rows.value[index].password.length === 0 || rows.value[index].password.length > 50) {
            rows.value[index].passwordError = true;
        } else {
            rows.value[index].passwordError = false;
        }
    }

    return { rows, types, addNewRow, deleteSelfRow, setterNamesByName, validateByError };
});
