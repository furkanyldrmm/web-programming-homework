
<template>
  <div id="app">
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#/shop">FastShop</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Market</b-nav-item>
        <b-nav-item href="#">Branches</b-nav-item>
        <b-nav-item href="#">Contact</b-nav-item>
        <b-nav-item href="#">About</b-nav-item>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
    
<button class="btn" @click="showCart = !showCart" v-show="!verified">
        {{ items.length + (items.length > 1 || items.length === 0 ? " items" : " item") }}
      </button>
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  
    <div class="input-group col-md-6 mx-auto mt-5">
    <input type="text" class="form-control" placeholder="Search product">
    <div class="input-group-append">
      <button class="btn btn-secondary" type="button">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
    <div class="cart" v-show="showCart">
      <div v-show="items.length > 0">
        <ul>
          <li v-for="(item, idx) in items" transition="fade" :key="idx">
            <p>
              <strong>{{ item.quantity }}</strong> - {{ item.name }}
              <i class="fa fa-trash" @click="removeFromCart(item)"></i>
            </p>
          </li>
        </ul>
        <div>
          <button class="btn" @click="(verified = true), (showCart = false)">
            Check out
          </button>
        </div>
      </div>
      <div v-show="items.length === 0">
        <p>Your cart is empty!</p>
      </div>
    </div>
    <div class="row">
    <div class="filter col-md-3">
<h6>Price</h6>
      <div class="price">
<price-range-slider style="margin-top:20px;"></price-range-slider>
      </div>
      <div>
        <h6>Avaibility</h6>
        <form class="ml-md-2">
            <div class="form-inline border rounded p-sm-2 my-2"> <input checked type="radio" name="type" id="boring"> <label for="boring" class="pl-1 pt-sm-0 pt-1">In stock</label> </div>
            <div class="form-inline border rounded p-sm-2 my-2"> <input type="radio" name="type" id="ugly"> <label for="ugly" class="pl-1 pt-sm-0 pt-1">Not avaible</label> </div>
        </form>
    </div>
    </div>
    <div class="col-md-6">
      <div class="shop" v-show="!verified">
        <div class="row">
          <div
            class="product col-md-4 p-3"
            v-for="(item, idx) in shop"
            :key="idx"
          >
            <div
              style="
                box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
                padding: 20px;
              "
            >
              <img :src="item.img_src" />
              <h5 class="product-title">{{ item.name }}</h5>
              <p>Stock: 20</p>
              <p>${{ item.price }}</p>
              <div
                style="
                  display: flex;
                  box-shadow: none !important;
                  justify-content: space-between;
                "
              >
                <div class="aa">
                  <input
                    type="button"
                    value="-"
                    class="button-minus"
                    data-field="quantity"
                  />
                  <input
                    type="number"
                    step="1"
                    max=""
                    value="1"
                    name="quantity"
                    class="quantity-field"
                  />
                  <input
                    type="button"
                    value="+"
                    class="button-plus"
                    data-field="quantity"
                  />
                </div>
                <button style="height: 50px;border-radius:10px;font-weight:700" @click="addToCart(item)">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout" v-show="verified">
        <h3>Your Cart</h3>
        <h5 v-for="(item, idx) in items" :key="idx">
          <strong>{{ item.quantity }}</strong> - {{ item.name
          }}<span>${{ item.price * item.quantity }}</span>
        </h5>
        <hr />
        <div class="row">
          <div class="u-pull-right">
            <h5>
              Total: <span>{{ this.total() }}</span>
            </h5>
             <div>
    <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" v-model="deadline_date" class="mb-2"></b-form-datepicker>
  </div>
            <button @click="createOrder" class="btn">Looks Good</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
    </div>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import PriceRangeSlider from "../components/PriceRangeSlider.vue";

export default {
  components: {
    PriceRangeSlider,
    EditProfileForm,
  },

  data() {
    return {
      data:"",
      deadline_date:"",
   
       
      items: [],
      shop:[],
      showCart: false,
      verified: false,
      quantity: 1,
    };
  },
  created(){
this.loadProduct();
  },
  watch:{
    "items.quantity"(val){
      console.log(val)
    }
  },
  computed: {
   
  },
  methods: {
    createOrder(){

console.log(this.$store.state.user);

 this.$axios
        .post('http://127.0.0.1:8000/api/order', {dead_line:this.deadline_date,
        user_id:this.$store.state.user.id,
        order_items:this.items})

        .then((res) => {
          console.log(res)

})
    } ,
 total() {
      var total = 0;
      for (var i = 0; i < this.items.length; i++) {
        console.log(this.items)
        console.log( this.items[i].price*this.items[i].quantity);
        total+= this.items[i].price*this.items[i].quantity
      }
      return total;
    },
    loadProduct(){
 this.$axios.get('http://127.0.0.1:8000/api/products', { params: this.moreParams })
.then((res) => {
this.shop=res.data;
})
        .finally(() => {
        })
    },
    
    addToCart(item) {
      const existingItem = this.items.find((e) => {
        return e.name === item.name;
      });
      if (existingItem) {
        existingItem.quantity++;
        if(this.showCart===true){
 this.showCart=false;
        this.showCart=true;
        }
       
      } else {

        item.quantity=1;
        // Push the item into the cart
        this.items.push(item);
      }
    },
    removeFromCart(item) {
      item.quantity -= 1;
      this.items.splice(this.items.indexOf(item), 1);
    },
  },
};
</script>
<style  lang="scss" scoped>
.product-title{
  text-align: center;
    margin-top: 5px;
    font-size: 20px;
    font-weight: 700;
}
.product {
  padding: 10px;
}
img {
  transition: transform 0.2s; /* Animation */

  object-fit: cover;
  width: 250px;
  height: 200px;

  &:hover {
    transform: scale(
      1.5
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }
}
body {
  height: 100%;
  background: linear-gradient(to top, #ff6b83, lighten(#ff6b83, 15%)) no-repeat fixed  !important;
}

#app {
  font-family: "Roboto Slab", serif;
}

.header {
  height: 80px;
  h2 {
    color: #fff;
    font-family: "Rock Salt";
    float: left;
    font-weight: bolder;
    margin: 10px 20px;
  }
  button {
    border: 0;
    background: #ffdbe0;
    transition: all 0.1s ease-out;
    &:hover {
      background: darken(#ffdbe0, 2%);
    }
  }
  div {
    float: right;
    display: inline;
    margin: 10px;
  }
}

li {
  list-style: none;
}

.fa {
  cursor: pointer;
  margin-left: 5px;
}

.fade-transition {
  transition: all 0.2s ease-out;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}

.cart {
  > div {
    z-index: 100;
    background: #fff;
    padding: 20px 30px;
    position: absolute;
    right: 30px;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
    div {
      text-align: center;
    }
  }
  ul,
  li,
  p {
    margin-bottom: 0;
  }
  button {
    margin: 20px 0 10px;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: bold;
    letter-spacing: 2px;
  }
  input {
    width: 30px;
  }
}
.quantity-field {
  width: 40px;
}

.price{
  display:flex;
  flex-direction: column;
  padding:20px;
}
.shop {
  display: flex;
  h3 {
    position: absolute;
    top: -85px;
    left: -30px;
    color: rgba(255, 255, 255, 0.3);
    font-family: sans-serif;
    font-size: 4em;
    font-weight: bold;
    letter-spacing: -2px;
  }
  ul {
    margin-top: 90px;
  }
  li div {
    padding: 30px;
    background: #fff;
    margin-bottom: 20px;
    box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.3);
  }
  button {
    color: white;
    border: 0;
    background: #00adb5;
    margin: 0;
    transition: all 0.1s ease-out;
    &:hover {
      background: darken(#00adb5, 5%);
    }
  }
}

.filter{
  padding:60px;
}
.aa {
  height:30px;
  display: flex;
  box-shadow: none !important;
}
.checkout {
  background: #fff;
  box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.3);
  margin-top: 90px;
  padding: 50px 60px;
  h3 {
    position: absolute;
    top: -85px;
    left: -30px;
    color: rgba(255, 255, 255, 0.3);
    font-family: sans-serif;
    font-size: 4em;
    font-weight: bold;
    letter-spacing: -2px;
  }
  span {
    float: right;
  }
}

@media screen and (max-width: 630px) {
  .checkout {
    padding: 30px 40px;
    h5 {
      font-size: 1.2em;
    }
  }
}

@media screen and (max-width: 550px) {
  .shop h3,
  .checkout h3 {
    font-size: 3.3em;
    top: -70px;
    left: 0px;
  }
}
</style>
