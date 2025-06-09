<template>
  <div>
    <v-progress-circular
      v-if="isLoading"
      class="d-block mx-auto my-8"
      color="primary"
      indeterminate
    />
    <v-alert
      v-else-if="matches.length === 0"
      type="info"
    >
      {{ searchQuery ? 'Ни одного матча не найдено' : 'Нет доступных матчей' }}
    </v-alert>
    <template v-else>
      <v-data-table
        :headers="headers"
        :items="matches"
      />
    </template>
  </div></template>


<script>
  import api from '@/api'
  export default {
    data () {
      return {
        page: 1,
        itemsPerPage: 12,
        matches: [],
        isLoading: false,
        headers: [
          {
            align: 'start',
            key: 'utcDate',
            sortable: false,
            title: 'Дата',
          },
          { key: 'status', title: 'Статус ' },
        ],
      }
    },
    computed: {
      totalPages () {
        return Math.ceil(this.matches.length / this.itemsPerPage)
      },
      paginatedLeagues () {
        const start = (this.page - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.matches.slice(start, end)
      },
    },
    mounted () {
      this.loadMatches();
    },
    methods: {
      loadMatches (){
        this.isLoading = true;
        const leagueId = this.$route.query.id;
        api.get(`api/v4/competitions/${leagueId}/matches`)
          .then(response => this.matches = response.data.matches)
          .catch(error => console.error(error))
          .finally( () => this.isLoading = false);
      },
      onSearchInput () {
        this.page = 1;
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
