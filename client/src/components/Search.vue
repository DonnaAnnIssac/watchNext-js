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
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="crime">Crime</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                    </optgroup>
                    <option value="release">Latest</option>
                    <option value="rating">Top Rated</option>
                    <option value="popular">Popularity</option>
                </select>
                <button type="submit" >Search</button>
            </div>
        </div>
    </div>
</template>

<script>
const genres = ['drama', 'romance', 'action', 'thriller', 'comedy', 'adventure', 'sci-fi', 'crime']
export default ({
  name: 'searchBy',
  data () {
    return {
      input: '',
      resultsArr: [],
      selectedOpt: null
    }
  },
  methods: {
    searchMovie () {
      let value = (/(\s)+/g).test(this.input) ? this.input.replace(/(\s)+/g, '+') : this.input
      this.fetchResults('http://localhost:9191/movie?title=' + value)
    },
    searchByOpt () {
      if (genres.includes(this.selectedOpt)) {
        this.fetchResults('http://localhost:9191/movie/genre?genre=' + this.selectedOpt)
      } else this.fetchResults('http://localhost:9191/movie/' + this.selectedOpt)
    },
    fetchResults (url) {
      let vm = this
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          vm.resultsArr = (JSON.parse(xhr.responseText))
          vm.$emit('dataLoaded', vm.resultsArr)
        }
      }
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
