<template>
  <card class="col-md-5 card">
    <h4 slot="header" class="card-title">Login Dashboard</h4>
    <form>
      
       <div class="center">
          <base-input type="text"
                    label="Email"
                    placeholder="Email"
                    v-model="user.email">
          </base-input>
        </div>
          <base-input type="text"
                    label="Password"
                    placeholder="Password"
                    v-model="user.password">
          </base-input>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right col-md-12" @click="login">
Login
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        user: {
          email: '',
          password:'',
        }
      }
    },
    methods: {
         login(){
 this.$axios
        .post('http://127.0.0.1:8000/api/login', { email:this.user.email, password:this.user.password})
        .then((res) => {
          if(res){
            console.log("commit")
            this.$store.commit("setAuthentication", true);
            this.$store.commit("setUserData", res.data);
            this.$router.push('/shop')


          }

})
        .finally(() => {
        })
    },
    
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>
.card{ margin:auto;}
</style>
