<template>
  <div>
    <!-- Строка поиска с debounce -->
    <v-text-field
      v-model="searchQuery"
      class="mb-4"
      clearable
      label="Поиск по названию лиги"
      outlined
      prepend-inner-icon="mdi-magnify"
      @input="onSearchInput"
    />

    <!-- Лоадер при загрузке -->
    <v-progress-circular
      v-if="isLoading"
      class="d-block mx-auto my-8"
      color="primary"
      indeterminate
    />

    <!-- Сообщение, если лиг нет -->
    <v-alert
      v-else-if="filteredLeagues.length === 0"
      class="ma-4"
      type="info"
    >
      {{ searchQuery ? 'Ничего не найдено' : 'Нет доступных лиг' }}
    </v-alert>

    <!-- Карточки лиг + пагинация -->
    <template v-else>
      <v-row>
        <v-col
          v-for="league in paginatedLeagues"
          :key="league.id"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <v-card
            class="ma-2"
            @click="goToLeague(league.id)"
          >
            <v-img
              v-if="league.emblem"
              class="grey lighten-2"
              contain
              height="100"
              :src="league.emblem"
            />
            <v-img
              v-else
              class="grey lighten-2"
              contain
              height="100"
              src="/src/assets/placeholder.svg"
            />
            <v-card-title>{{ league.name }}</v-card-title>
            <v-card-subtitle>{{ league.area?.name || "Не указано" }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Пагинация -->
      <v-pagination
        v-model="page"
        class="mt-4"
        :length="totalPages"
        :total-visible="7"
      />
    </template>
  </div>
</template>


<script>
  import api from '@/api'
  export default {
    data () {
      return {
        page: 1,
        itemsPerPage: 12,
        leagues: [],
        searchQuery: '',
        isLoading: false,
      }
    },
    computed: {
      totalPages () {
        return Math.ceil(this.filteredLeagues.length / this.itemsPerPage)
      },
      paginatedLeagues () {
        const start = (this.page - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filteredLeagues.slice(start, end)
      },
      filteredLeagues () {
        if (!this.searchQuery) return this.leagues;
        const query = this.searchQuery.toLowerCase();
        return this.leagues.filter(league => league.name.toLowerCase().includes(query))
      },
    },
    mounted () {
      this.loadLeagues();
    },
    methods: {
      onSearchInput () {
        this.page = 1;
      },
      loadLeagues () {
        this.isLoading = true;
        api.get('api/v4/competitions')
          .then(response => this.leagues = response.data.competitions)
          .catch(error => console.error(error))
          .finally(() => this.isLoading = false);
      },
      goToLeague (leagueId) {
        this.$router.push(`/league/?id=${leagueId}`);
      },
    },
  }
</script>
<style scoped>
.league-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s;
  margin-bottom: 16px;
}

.league-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  padding-bottom: 0;
}

.v-card-subtitle {
  padding-top: 0;
  font-size: 1rem;
}

.v-pagination {
  justify-content: center;
}
</style>
