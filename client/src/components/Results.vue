<template>
  <div>
    <div v-if="data.length !== 0">
      <div v-for="movie in data" :key="movie.tconst">
        <div>{{movie.primary_title}}</div>
        <div>{{movie.start_year}}</div>
        <div>{{movie.runtime_mins}}</div>
        <div>{{movie.average_rating}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resultView',
  props: ['data']
}
</script>
