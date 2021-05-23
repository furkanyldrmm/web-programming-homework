<template>
  <v-app>
    <div class="content">
      <div class="container-fluid">
         <v-dialog v-model="dialog1" persistent max-width="600px">
           <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Add Plain
              </v-btn>
            </template>
          <v-card>
            <v-card-title>
              <span class="headline">Plan Detail</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12">
                  <v-select
                    :items="products"
                    item-text="name"
                    v-model="plan.product_id"
                    item-value="id"
                    label="Product"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="operations"
                    item-text="name"
                    v-model="plan.operation_id"
                    item-value="id"
                    label="Operation"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="workCenters"
                    item-text="name"
                    v-model="plan.work_center_id"
                    item-value="id"
                    label="WorkCenter"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="plan.time"
                  label="Picker in menu"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="plan.time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="plan.date"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="plan.date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="plan.value"></v-text-field>
                </v-col>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog2 = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="update"> Update </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Plan Detail Update</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12">
                  <v-select
                    :items="products"
                    item-text="name"
                    v-model="planEdit.product_id"
                    item-value="id"
                    label="Standard"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="operations"
                    item-text="name"
                    v-model="planEdit.operation_id"
                    item-value="id"
                    label="Standard"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="items"
                    item-text="name"
                    v-model="planEdit.product_id"
                    item-value="id"
                    label="Standard"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="plan.time"
                  label="Picker in menu"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="plan.time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="plan.date"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="plan.date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-switch v-model="planEdit.is_salable"></v-switch>
                </v-col>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog2 = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="update"> Update </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
       <!--  <v-row align="center">
          <v-col class="d-flex" cols="12" sm="3">
            <label>Select Product</label>
            <b-form-select
              v-model="plan.product_id"
              :options="products"
            ></b-form-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="3">
            <label>Select Operation</label>

            <b-form-select
              v-model="plan.operation_id"
              :options="operations"
            ></b-form-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="3">
            <label>Select WorkCenter</label>

            <b-form-select :options="workCenters"></b-form-select>
          </v-col>

          <v-col cols="11" sm="5">
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="plan.time"
                  label="Picker in menu"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="plan.time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="plan.date"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="plan.date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>

          <v-col class="d-flex" cols="12" sm="2">
            <button class="btn btn-outline" @click="addPlan">Add</button>
          </v-col>
        </v-row> -->

        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
          <template v-slot:[`item.order_items`]="{ item }">
            <tr v-for="(item, idx) in item.order_items" :key="idx">
              <td>{{ item.product.name }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <span class="mr-5 mt-2" @click="onEdit(item)"> edit </span>

            <span class="mt-2 mr-5" @click="onDelete(item)"> delete </span>
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
  props: {
    id: {
      type: [String, Number],
      required: false,
      default: null,
    },
  },
  data() {
    return {
      date: "",
      options: [
        { value: null, text: "Please select an option" },
        { value: 1, text: "This is First option" },
        { value: 2, text: "Selected Option" },
        { value: 3, text: "This is an option with object value" },
        { value: 3, text: "This one is disabled", disabled: true },
      ],
      plan: {
        product_id: "1",
        order_id: this.id,
        operation_id: "",
        work_center_id: "1",
        date: "",
        product_value: "5",
        value:"",
        time: "",
      },
        planEdit: {
        product_id: "1",
        order_id: this.id,
        operation_id: "",
        work_center_id: "1",
        date: "",
        value:"",
        product_value: "5",
        time: "",
      },
      plans: [],
      dialog: false,
      product: {
        name: "",
        price: "",
        img_src: "",
        product_type: "",
      },

      products: [],
      menu1: "",
      operations: [],
      workCenters: [],
      time: "",
      desserts: [],
      headers: [
        { text: "Product", value: "product.name" },
        { text: "Operation", value: "operation.name" },
        { text: "Work-Center", value: "work_center.name" },
        { text: "Start-Time", value: "start_time" },
        { text: "End-Time", value: "end_time" },
        {
          text: "Operations",
          value: "action",
          sortable: false,
        },
      ],
      dialog2: false,
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
      items: ["aa", "cc"],
      picked: "",
      tableData: "",
      table1: "",
      menu2: "",
    };
  },
  created() {
    this.load();
    this.loadPlan();
  },

  watch: {
    "plan.product_id"(val) {
      this.getOperation(val);
      this.getProductValue(val);

},
    "plan.operation_id"(val) {
      this.getWorkCenter(val);
    },
  },
  methods: {
    getProductValue(val) {
      this.$axios
        .get(
          "http://127.0.0.1:8000/api/get-product-value/" + this.id+"/"+val
        )
        .then((res) => {
          this.plan.value=res.data;
       
        });
    },
   getWorkCenter() {
      this.workCenters = [];
      this.$axios
        .get(
          "http://127.0.0.1:8000/api/get-work-center/" + this.plan.operation_id
        )
        .then((res) => {
          res.data.forEach((item) => {
         /*    var selectListOption = {
              value: item.id,
              text: item.name,
            }; */

            this.workCenters.push(item);
          });
        });
    },
    getOperation(product_id) {
      this.operations = [];
      this.$axios
        .get("http://127.0.0.1:8000/api/get-operations/" + product_id)
        .then((res) => {
          res.data.forEach((item) => {
           /*  var selectListOption = {
              value: item.id,
              text: item.name,
            }; */

            this.operations.push(item);
          });
        });
    },
    loadPlan() {
      console.log("girdi");
      this.$axios
        .get("http://127.0.0.1:8000/api/plan/" + this.id)
        .then((res) => {
          this.desserts = res.data;
        });
    },
    addPlan() {
      this.$axios
        .post("http://127.0.0.1:8000/api/plan", this.plan)
        .then((res) => {
          this.$swal(res.data);
        });
    },
    onEdit(item) {
this.dialog2=true;
},
    load() {
      this.$axios
        .get("http://127.0.0.1:8000/api/orders/" + this.id)
        .then((res) => {
          res.data.order_items.forEach((item) => {


/* var selectListOption = {
              value: item.product.id,
              text: item.product.name,
            };
 */
            this.products.push(item.product);
          });
        });
    },
  },
};
</script>
<style>
/* .menuable__content__active
{ left:10px !important;} */
</style>
