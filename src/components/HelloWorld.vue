<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn density="compact" @click="firstButtonClick">Первая кнопка</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn density="comfortable" @click="addRow">Вторая</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn density="default" rounded="xl" @click="changeEl">Футбол</v-btn>
      </v-col>
    </v-row>
    <v-row>
      {{ el }}
    </v-row>
    <v-row>
      <v-text-field v-model="el" />
    </v-row>
  </v-container>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Имя
        </th>
        <th class="text-left">
          Количество калорий
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  export default {
    data () {
      return {
        el: 'Привет!!!',
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
    methods: {
      firstButtonClick () {
        console.log('Привет!!!!!')
      },
      addRow () {
        this.desserts.push({ name: 'Новый элемент', calories: 1000 })
      },
      changeEl () {
        this.el = 'Пока!!!!'
      },
    },
  }
</script>
