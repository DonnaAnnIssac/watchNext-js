<template>
  <div>
   <div>{{ variable.primary_title }}</div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: ['variable'],
  methods: {
    displayMovieResults (arr) {
      arr.map(result => {
        let obj = document.createElement('div')
        obj.setAttribute('id', result['tconst'])
        let title = document.createElement('div')
        title.innerText = result['primary_title']
        obj.appendChild(title)
        let release = document.createElement('div')
        release.innerText = '(' + result['start_year'] + ')'
        obj.appendChild(release)
        let duration = document.createElement('div')
        duration.innerText = result['runtime_mins'] + ' mins'
        obj.appendChild(duration)
        let rating = document.createElement('div')
        rating.innerText = result['average_rating']
        obj.appendChild(rating)
      })
    },
    computed: {
      resultReady () {
        console.log(this.results.length)
        if (this.results.length > 0) return true
      }
    }
  },
  mounted: function () {
    console.log('Inside child')
  },
  updated: function () {
    console.log('updated')
    console.log(this.variable)
  }
}
</script>
