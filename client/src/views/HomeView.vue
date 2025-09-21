<template>
  <div class="container mt-5">
    <h3>{{ title }}</h3>
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
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.login }}</td>
            <td>{{ item.password }}</td>
            <td>
              <button class="btn btn-outline-success">Удалить</button>
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

        return {
          allTypes,
          allRows,
          addNewRows
        }

      },

      data() {
        return {
          title: "Создать новую метку",
        }
      }
    }

</script>