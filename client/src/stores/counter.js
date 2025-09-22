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
    const localStorageKey = 'rowsData';

    // функция для палучения данных из локалстораджа браузера
    const loadFromLocalStorage = () => {
        const savedData = localStorage.getItem(localStorageKey);
        if (savedData) {
            try {
                rows.value = JSON.parse(savedData);
            } catch (e) {
                console.error('Ошибка парсинга localStorage', e);
            }
        } else {
            rows.value = [];
        }
    };

    // функиця для занесенися (set) даннгыз в локалсторадж
    const saveToLocalStorage = () => {
        localStorage.setItem(localStorageKey, JSON.stringify(rows.value));
    };

    const rows = ref([]);
    const types = ['Обычный', 'LDAP'];

    loadFromLocalStorage();

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
        saveToLocalStorage(); // при любом мутирвоании данных созраняем в localStorage
    }

    function deleteSelfRow(index) {
        rows.value.splice(index, 1);
        saveToLocalStorage(); // при любом мутирвоании данных созраняем в localStorage
    }

    function setterNamesByName(index) {
        const nameStr = rows.value[index].name;
        if (nameStr) {
            rows.value[index].namesSplitArray = nameStr.split(';');
        }
        saveToLocalStorage(); // при любом мутирвоании данных созраняем в localStorage
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
        saveToLocalStorage(); // при любом мутирвоании данных созраняем в localStorage
    }

    return { rows, types, addNewRow, deleteSelfRow, setterNamesByName, validateByError };
});
