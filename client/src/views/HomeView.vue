<template>
  <div class="container mt-5">
    <h3>{{ title }}</h3>

    <div class="alert alert-success mt-4 mb-4">
      <strong>Для разделения меток</strong> использовать разделитель ;
    </div>

    <button class="btn btn-success" @click="addNewRows()">Создать новую метку</button>
  </div>

  <div class="container mt-5">
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="bg-success text-light">
          <tr>
            <th>Метка</th>
            <th>Тип</th>
            <th>Логин</th>
            <th>Пароль</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in allRows">
            <td>
              <input class="form-control" v-model="item.name">
            </td>
            <td>
              <select v-model="item.type" class="form-control" @change="validateAndOther()">
                <option v-for="(asd) in allTypes" :value="asd">{{ asd }}</option>
              </select>
            </td>
            <td>
              <input class="form-control" :class="item.arrayErrors.includes('login') ? 'border border-danger' : '' " v-model="item.login">
            </td>
            <td>
              <input :type="item.type === 'LDAP' ? 'password' : 'text'" class="form-control"  :placeholder="item.type === 'LDAP' ? '*'.repeat(item.password.length) : item.password  " v-model="item.password" :disabled="item.type === 'LDAP'">
            </td>
            <td>
              <button class="btn btn-outline-success" @click="deleteSelfRow(index)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>


<script>

    import { useRowsStore } from '@/stores/counter'
    import { computed } from 'vue'

    export default {

      setup() {
        const rows = useRowsStore()

        const allTypes = computed(() => rows.types)
        const allRows = computed(() => rows.rows)

        const addNewRows = () => {
          rows.addNewRow()
        }

        const deleteSelfRow = (index) => {
          rows.deleteSelfRow(index)
        }

        const setterNamesByName = (index) => {
          rows.setterNamesByName(index)
        }


        const validateAndOther = (index) => {
          setterNamesByName(index)
        }

        return {
          allTypes,
          allRows,
          addNewRows,
          deleteSelfRow,
          setterNamesByName
        }

      },

      data() {
        return {
          title: "Создать новую метку",
        }
      }
    }

</script>