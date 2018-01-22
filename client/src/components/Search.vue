<template>
    <div id="root">
        <div id="searchBox">
            <strong>Choose a movie: </strong>
            <input v-model="input"/>
            <button type="submit" v-on:click="searchMovie">Search Movies</button>
            <div class="dropdown">
                <strong>Search By: </strong>
                <select v-model="selectedOpt" v-on:change="searchByOpt">
                    <optgroup label="Genres">Genres
                        <option value="drama">Drama</option>
                        <option value="romance">Romance</option>
                        <option value="action">Action</option>
                        <option value="thriller">Thriller</option>
                        <option value="scifi">Sci-Fi</option>
                        <option value="crime">Crime</option>
                        <option value="adventure">Adventure</option>
                    </optgroup>
                    <option value="Latest">Latest</option>
                    <option value="Top Rated">Top Rated</option>
                    <option value="Popularity">Popularity</option>
                </select>
                <button type="submit" >Search</button>
            </div>
            <div v-for="result in resultsArr" :key="result">
                <result-view v-bind:variable="result"></result-view>
            </div>
        </div>
    </div>
</template>

<script>
import results from './Results.vue'
import Vue from 'vue'
Vue.component('result-view', results)

export default ({
  name: 'Search',
  data () {
    return {
      input: '',
      resultsArr: [],
      count: 1,
      dataLoaded: false,
      selectedOpt: null
    }
  },
  methods: {
    searchMovie () {
      this.resultsArr = []
      let value = (/(\s)+/g).test(this.input) ? this.input.replace(/(\s)+/g, '+') : this.input
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'http://localhost:9191/movie?title=' + value)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this.dataLoaded = true
          this.resultsArr = (JSON.parse(xhr.responseText))
          console.log(this.dataLoaded)
          console.log(this.resultsArr[0])
          console.log('Got results: ' + this.resultsArr.length)
          this.count++
          console.log(this.count)
        }
      }
    },
    searchByOpt () {
      console.log(this.selectedOpt)
    }
  }
})
</script>

<style>
#searchBox {
    padding-top: 50px;
}
#getInfo {
    background-color: #3498DB;
    color: white;
    border: none;
    cursor: pointer;
}

#getInfo:hover, #getInfo:focus {
    background-color: #2980B9;
}

.dropbtn {
    background-color: #3498DB;
    color: white;
    /* padding: 16px; */
    /* font-size: 16px; */
    border: none;
    cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
    background-color: #2980B9;
}

#dropdownList {
    display: none;
}
.dropdown-content {
    display: block;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    overflow: auto;
    /* box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); */
    /* z-index: 1; */
}

.dropdown-content div {
    padding: 12px 16px;
    display: block;
}

.dropdown div:hover {background-color: #f1f1f1}

.show {display:block;}

.genre-types {
    display: block;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    overflow: auto;
}

.genre-types div {
    padding: 12px 16px;
    display: block;
}
</style>
