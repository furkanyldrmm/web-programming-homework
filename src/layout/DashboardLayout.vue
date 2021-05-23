<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
    <sidebar-link to="/admin/orders">
        <i class="nc-icon nc-notes"></i>
        <p>Orders</p>
      </sidebar-link>
      <sidebar-link to="/admin/products">
        <i class="nc-icon nc-notes"></i>
        <p>Products</p>
      </sidebar-link>
      <sidebar-link to="/admin/sub-products">
        <i class="nc-icon nc-notes"></i>
        <p>Sub-Products</p>
      </sidebar-link>
      <sidebar-link to="/admin/workcenters">
        <i class="nc-icon nc-paper-2"></i>
        <p>WorkCenters</p>
      </sidebar-link>
      <sidebar-link to="/admin/operations">
        <i class="nc-icon nc-atom"></i>
        <p>Operations</p>
      </sidebar-link>
      <sidebar-link to="/admin/workcenter-operation">
        <i class="nc-icon nc-pin-3"></i>
        <p>WorkCenter Operation</p>
      </sidebar-link>

    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
