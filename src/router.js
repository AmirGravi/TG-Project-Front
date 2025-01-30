import { createRouter, createWebHistory } from 'vue-router';
import FirstPage from './components/Shop-components/First-page.vue';
import Login from './components/Admin-panel/login.vue';
import Dashboard from './components/Admin-panel/Dashboard.vue';
import AddProductFrorm from './components/Admin-panel/Products/AddProductFrorm.vue';
import AllProduct from './components/Admin-panel/Products/AllProduct.vue';
import DeleteProduct from './components/Admin-panel/Products/EditAndDeleteProduct.vue';
import EditProduct from './components/Admin-panel/Products/EditProduct.vue';
import AddCategory from './components/Admin-panel/Categories/AddCategory.vue'
import CategoryList from './components/Admin-panel/Categories/CategoriesList.vue'
import CategoryEditAndDelete from './components/Admin-panel/Categories/Edit&DeleteCategory.vue'
import Register from './components/Shop-components/Users/Register.vue';
import VerifyEmail from './components/Shop-components/Users/VerifyUser.vue'
import SingAndlogin from './components/Shop-components/Users/SingAndlogin.vue';
import LoginUser from './components/Shop-components/Users/loginUser.vue';



const routes = [
    {
        path: '/',
        name: 'home',
        component: FirstPage
    },
    {
        path: '/admin/login',
        name: 'Login',
        component: Login
    },
   
    {
        path: '/Auth', component: SingAndlogin,
        children: [
            { path: 'singUp', name: 'UsersingUp', component: Register  },
            { path: 'verify', component: VerifyEmail },
            { path: 'login', component: LoginUser }
        ]
    },
 
    {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true } // مشخص کردن نیاز به احراز هویت,
        ,
        children: [
        { path: 'products/add', component: AddProductFrorm },
        { path: 'products/all', component: AllProduct },
        { path: 'products/delete', component: DeleteProduct },
        { path: '/edit-product/:id', name: 'EditProduct', component: EditProduct},
        { path: 'Category/add', name: 'AddCategory', component: AddCategory },
        { path: 'Category/List', name: 'CategoryList', component: CategoryList },
        { path: 'Category/EditAndDelete', name: 'CategoryEditAndDelete', component: CategoryEditAndDelete }
        
        ]
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: '/' // هر مسیری که پیدا نشد به صفحه اول هدایت شود
    // },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});   



// محافظ برای مسیرها که نیاز به احراز هویت دارند
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    console.log('isAuthenticated:', isAuthenticated);
    console.log('Navigating to:', to.path);
    // اگر کاربر احراز هویت شده باشد و به صفحه لاگین برود
    if (isAuthenticated && to.path === '/admin/login') {
        next({ path: '/admin/dashboard', replace: true, query: { message: 'کاربر عزیز شما قبلا وارد شده اید و نمیتوانید مجددا وارد شوید .' } });
    }
    // اگر کاربر به صفحه‌ای نیاز به احراز هویت برود و احراز هویت نشده باشد
    else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ path: '/admin/login', query: { message: 'لطفاً ابتدا وارد شوید.' } }); // هدایت به صفحه لاگین با پیام
    }
    else {
        next(); // ادامه به صفحه مورد نظر
    }
});

export default router;
