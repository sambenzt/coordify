<template>
    <div>
        <div class="col-md-12">
            <input type="text" v-model="endpoint" class="form-control" placeholder="endpoint">
        </div>
        <div class="col-md-12 mt-3">
            <input type="text" v-model="token" class="form-control" placeholder="Bearer token">
        </div>
        <div class="col-md-12 mt-3">
            <input type="text" v-model="method" class="form-control" placeholder="method">
        </div>
        <div class="col-md-12 d-flex justify-content-end mt-3">
            <button class="btn btn-primary" @click="accept()">Accept</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            endpoint:localStorage.getItem('endpoint') || null,
            token:localStorage.getItem('token') || null,
            method:localStorage.getItem('method') || 'post'
        }
    },
    methods:{
        accept(){
            localStorage.setItem('endpoint', this.endpoint);
            localStorage.setItem('token', this.token);
            localStorage.setItem('method', this.method.toLowerCase());
        }
    }
}
</script>