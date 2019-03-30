<template>
 <div id="app">
    <div class="container">
      <div class="row mt-2">
        <div class="col-12 d-flex justify-content-center">
            <ul class="nav border-0">
              <li class="nav-item">
                <a class="nav-link active" @click="current = 'list'">List</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="current = 'array'">Array</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="current = 'config'">Config endpoint</a>
              </li>
            </ul>
        </div>
      </div>
      <div class="row mt-5 p-1">
        <div class="col-12 text-center">
         <component v-bind:is="current"></component>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import list from './components/list'
import array from './components/array'
import config from './components/config'
export default {
  components:{list,array,config},
  name: 'app',
  data () {
    return {
     current:'list'
    }
  }
}
</script>

<style>

#app {
  width: 400px;
  height: 500px;
  overflow-y: scroll;
  background: #f9f9f9;
}

.container{
  width: 100vw;
  height: 100vh;
}
</style>
