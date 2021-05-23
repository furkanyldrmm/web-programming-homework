<template>
  <v-app>
    <div class="content">
      <div class="container-fluid">
        <div>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Add Product
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Product Detail</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                      <v-col cols="12">
                      <v-text-field
                      v-model="product.name"
                        label="Name"
                        required
                      ></v-text-field>
                      </v-col>
                    
                    <v-col cols="12">
                      <v-text-field                       v-model="product.img_src"
 label="Image Link" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                     <v-text-field
            label="Price"
            value="10.00"
            prefix="$"
                                  v-model="product.price"

          ></v-text-field>
                    </v-col>
                    <v-col cols="12" >
                       <v-select
            :items="items"
             item-text="name"
                                   v-model="product.product_type_id"

                  item-value="id"
            label="Standard"
          ></v-select>
                     
                    </v-col>
                                        <v-col cols="12" >

                     <v-switch
        v-model="product.is_salable"
      ></v-switch>
                                        </v-col>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="store">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
           <v-dialog v-model="dialog2" persistent max-width="600px">
           
            <v-card>
              <v-card-title>
                <span class="headline">Product Detail Update</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                      <v-col cols="12">
                      <v-text-field
                      v-model="productEdit.name"
                        label="Name"
                        required
                      ></v-text-field>
                      </v-col>
                    
                    <v-col cols="12">
                      <v-text-field                       v-model="productEdit.img_src"
 label="Image Link" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                     <v-text-field
            label="Price"
            value="10.00"
            prefix="$"
                                  v-model="productEdit.price"

          ></v-text-field>
                    </v-col>
                    <v-col cols="12" >
                       <v-select
            :items="items"
             item-text="name"
                                   v-model="productEdit.product_type_id"

                  item-value="id"
            label="Standard"
          ></v-select>
                     
                    </v-col>
                                        <v-col cols="12" >

                     <v-switch
        v-model="productEdit.is_salable"
      ></v-switch>
                                        </v-col>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog2 = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="update">
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div>
          <v-container style="max-width:600px">
<v-row>
<v-col
          class="d-flex"
          cols="12"
        >
          <v-select
            :items="items"
            label="Standard"
          ></v-select>
        </v-col>
</v-row>
          </v-container>
        </div>
        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
          <template v-slot:item.img_src="{ item }">
            <img :src="item.img_src" style="width: 100px; height: 100px" />
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
      dialog: false,
      dialog2:false,
      product: {
        name: "",
        price: "",
        img_src: "",
        product_type_id: "",
        is_salable:false,
      },

      updateId:"",
       productEdit: {
        name: "",
        price: "",
        img_src: "",
        product_type_id: "",
        is_salable:false,
      },

      items:[],

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
        { text: "Name", value: "name" },
        { text: "Image", value: "img_src" },
        { text: "Type", value: "type.name" },
        { text: "Price", value: "price" },
         {
          text: 'Operations',
          value: 'action',
          sortable: false,
        },
      ],
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
          key: "img_src",
          label: "Image",
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "product_type",
          label: "Product Type",
          // Variant applies to the whole column, including the header and footer
        },
        {
          key: "price",
          label: "Price",
          // Variant applies to the whole column, including the header and footer
        },
      ],
      picked: "",
      tableData: "",
      table1: "",
    };
  },
  created() {
    this.load();
    this.loadType();
  },
  methods: {

onEdit(item){
this.$axios
        .get("http://127.0.0.1:8000/api/products/"+item.id+"/edit")
        .then((data) => {
this.productEdit.id=data.data.id;
this.productEdit.name=data.data.name;
this.productEdit.img_src=data.data.img_src;
this.productEdit.product_type_id=data.data.product_type_id;
this.productEdit.price=data.data.price;

this.product.is_salable=data.data.is_salable;
this.dialog2=true;
this.updateId=item.id;
})
},
    store(){
       this.$axios
        .post("http://127.0.0.1:8000/api/products", this.product)
        .then((res) => {
          this.dialog
        })
    },
    loadType(){
       this.$axios
        .get("http://127.0.0.1:8000/api/product-type", { params: this.moreParams })
        .then((res) => {
          this.items = res.data;
        });
    },
    update(){
        this.$axios
        .put("http://127.0.0.1:8000/api/products/"+this.updateId, this.productEdit )
        .then((res) => {
        });

    },
    load() {
      this.$axios
        .get("http://127.0.0.1:8000/api/products", { params: this.moreParams })
        .then((res) => {
          this.desserts = res.data;
        });
    },
  },
};
</script>
<style>
</style>
