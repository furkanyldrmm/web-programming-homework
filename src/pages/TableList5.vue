<template>
  <v-app>
    <div class="content">
      <div class="container-fluid">
        <div>
          <v-dialog v-model="dialog2" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Add WorkCenter
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Product Detail</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row v-for="(item,idx) in plans.order_items" :key="idx"> 
                    <v-col cols="12">
                      <v-text-field
                      v-model="item.product.name"
                        label="Amount"
                        value="10.00"
                        prefix="$"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Age*"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        :items="[
                          'Skiing',
                          'Ice hockey',
                          'Soccer',
                          'Basketball',
                          'Hockey',
                          'Reading',
                          'Writing',
                          'Coding',
                          'Basejump',
                        ]"
                        label="Interests"
                        multiple
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      
             <template v-slot:[`item.order_items`]="{ item }">
         <tr v-for="(item,idx) in item.order_items" :key="idx">
    <td>{{item.product.name}}</td>
    <td>{{item.amount}}</td>
  </tr>
      </template>
       <template v-slot:[`item.action`]="{ item }">
              <span
                class="mr-5 mt-2"
                @click="onEdit(item)"
              >
edit
              </span>

              <span
                class="mt-2 mr-5"
                @click="onDelete(item)"
              >
              delete
              </span>
      </template>
        </v-data-table>
      </div>
    </div>
  </v-app>
</template>
<script>
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
const tableColumns = ["Id", "Name", "Type.name", "Price", "City"];

export default {
  components: {
    LTable,
    Card,
  },
  data() {
    return {
        plans:[],
      dialog: false,
      product: {
        name: "",
        price: "",
        img_src: "",
        product_type: "",
      },

      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
      headers: [
        { text: "Id", value: "id" },
        { text: "Products-Amount", value: "order_items" },
        { text: "Customer", value: "customer.name" },
        { text: "Order Date", value: "order_date" },
        { text: "Dateline", value: "date_line" },
         {
          text: 'Operations',
          value: 'action',
          sortable: false,
        },

],
dialog2:false,
      selected: "",
      fields: [
        {
          key: "id",
          label: "Id",
          width: "60%",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "product_type_id",
          label: "Product Type",
          // Variant applies to the whole column, including the header and footer
        },
      ],
      items: [],
      picked: "",
      tableData: "",
      table1: "",
    };
  },
  created() {
    this.load();
  },
  methods: {
      onEdit(item){

          this.$router.push('plan/'+item.id)

      },
    load() {
      this.$axios
        .get("http://127.0.0.1:8000/api/orders", {
          params: this.moreParams,
        })
        .then((res) => {
          this.desserts = res.data;
          console.log(this.desserts)
        });
    },
  },
};
</script>
<style>
</style>
