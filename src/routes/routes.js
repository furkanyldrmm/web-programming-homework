import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import TableList2 from 'src/pages/TableList2.vue'
import TableList3 from 'src/pages/TableList3.vue'
import TableList4 from 'src/pages/TableList4.vue'
import TableList5 from 'src/pages/TableList5.vue'
import TableList6 from 'src/pages/TableList6.vue'


import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Login from 'src/pages/Login.vue'
import Shop from 'src/pages/Shop.vue'
import store from 'src/store/store'



const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next({path:'/login'});
          } else {
              next();
          }
      } 
       
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile,
      
      },
      {
        path: 'products',
        name: 'Table List',
        component: TableList,
      },
      {
        path: 'plan/:id',
        name: 'Table List',
        props: true,
        component: TableList6,
      },
      {
        path: 'orders',
        name: 'Table List',
        component: TableList5,
      },
      {
        path: 'operations',
        name: 'Typography',
        component: TableList3,
       
      },
      {
        path: 'workcenters',
        name: 'WorkCenters',
        component: TableList2
      },
      {
        path: 'workcenter-operation',
        name: 'Maps',
        component: TableList4
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },


  {
    path:'/login',
    component:Login,
  },
  {
    path:'/shop',
    component:Shop,

     beforeEnter: (to, from, next) => {
      if(store.state.authenticated == false) {
          next({path:'/login'});
      } else {
          next();
      }
  } 
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
