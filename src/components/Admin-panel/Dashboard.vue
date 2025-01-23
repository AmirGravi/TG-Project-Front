<template>
    <div class="col-12 col-md-12 custom-width  d-flex">
        <!-- Sidebar -->
        <nav :class="['sidebar', isSidebarOpen ? 'open' : 'closed']" @click="!isSidebarOpen && toggleSidebar()">
            <div class="toggle-icon" @click.stop="toggleSidebar">
                <span class="hamburger-icon">&#9776;</span>
            </div>
            <div v-if="isSidebarOpen" class="sidebar-header">
                <h3>پیشخوان مدیریت سایت</h3>
                <hr>
                <strong>داشبورد</strong>
                <hr>
            </div>


            <ul v-if="isSidebarOpen" class="list-unstyled components">
                <li>
                    <router-link to="/admin/dashboard" class="nav-link ">داشبورد</router-link>
                </li>
                <li>
                    <a href="#" class="nav-link align-items-center d-flex" @click="toggleProductsSubmenu">محصولات
                        <span
                            :class="{ 'fa-solid': true, 'fa-arrow-left': !isProductsSubmenuOpen,'fa-arrow-down': isProductsSubmenuOpen }">
                        </span>
                    </a>
                    <ul v-show="isProductsSubmenuOpen"
                        :class="['list-unstyled sub-menu', isProductsSubmenuOpen ? 'open' : '']">
                        <li>
                            <router-link class="listcss" to="/admin/dashboard/products/add">افزودن محصول</router-link>
                        </li>
                        <li>
                            <router-link class="listcss" to="/admin/dashboard/products/all">لیست تمامی
                                محصولات</router-link>
                        </li>
                        <li>
                            <router-link class="listcss" to="/admin/dashboard/products/delete">ویرایش و حذف
                                محصولات</router-link>
                        </li>

                    </ul>
                </li>
                <li>
                    <a href="#" class="nav-link align-items-center d-flex" @click="toggleCategorySubmenu"> مدیریت دسته
                        بندی ها<span :class="{ 'fa-solid': true, 'fa-arrow-left': !isCategorySubmenuOpen,
                                'fa-arrow-down': isCategorySubmenuOpen }"> </span></a>
                    <ul v-show="isCategorySubmenuOpen"
                        :class="['list-unstyled sub-menu', isCategorySubmenuOpen ? 'open' : '']">
                        <li>
                            <router-link class="listcss" to="/admin/dashboard/Category/add">ایجاد دسته بندی
                                جدید</router-link>
                        </li>
                        <li>
                            <router-link class="listcss" to="/admin/dashboard/Category/List">لیست دسته بندی
                                ها</router-link>
                        </li>
                        <li>
                            <router-link class="listcss" to="/admin/dashboard/Category/EditAndDelete">ویرایش و حذف دسته
                                بندی
                            </router-link>
                        </li>

                    </ul>
                </li>
            </ul>


        </nav>



        <!-- Main content -->
        <div class="responsiveCss" :class="[ isSidebarOpen ? 'shifted col-12 col-xl-10 ' : 'col-12 ']">
            <router-view></router-view>
            <div v-if="message" class="alert alert-info">
                {{ message }}
            </div>
        </div>
        <div v-if="isSidebarOpen" class="overlay"></div>
    </div>
</template>




<script>
import AddProductForm from './Products/AddProductFrorm.vue';
import AllProduct from './Products/AllProduct.vue';
import CategoryManagerVue from './Categories/AddCategory.vue';
import DeleteProduct from './Products/EditAndDeleteProduct.vue';



export default {
    components: {
        AddProductForm,
        AllProduct,
        DeleteProduct,
        CategoryManagerVue
    },
    data() {
        return {
            isSidebarOpen: false,
            isProductsSubmenuOpen: false, // برای باز و بسته کردن زیرمجموعه محصولات
            isCategorySubmenuOpen:false,
            message: this.$route.query.message // پیام برای نمایش

        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        toggleProductsSubmenu() {
            this.isProductsSubmenuOpen = !this.isProductsSubmenuOpen; // تغییر وضعیت زیرمجموعه محصولات
         
                if (this.isProductsSubmenuOpen) {
                    this.isCategorySubmenuOpen = false
                }
          
          
        },
        toggleCategorySubmenu() {
            this.isCategorySubmenuOpen = !this.isCategorySubmenuOpen; // تغییر وضعیت زیرمجموعه دسته بندی ها
           
            if (this.isCategorySubmenuOpen) {
                this.isProductsSubmenuOpen = false
                }
         
        },
        removeMessage() {
            this.message = null; // حذف پیام
        },


    },
    mounted() {
        if (this.message) {
            // اگر پیام وجود دارد، پس از ۳ ثانیه آن را حذف کن
            setTimeout(() => {
                this.removeMessage();
            }, 3000);
        }
    }
}
</script>

<style>
.fa-solid{
    padding-left:8px
}
.router-link-exact-active{
    color: #45aaf2 !important;
}

@media (max-width:1204px) {
    .responsiveCss{
        margin-right: 45px !important;
    }
}
.responsiveCss{
        display: flex;
            flex-direction: column;
            align-items: center;
}
.custom-width {
    max-width: calc(100% - 3rem);
}
.listcss {
    color: #ffffff;
    text-decoration: none;
    padding: 10px;
}
.listcss:hover{
    color: black;
}
.arrow {
    margin-left: 5px;
    /* فاصله بین متن و فلش */
    transition: transform 0.3s ease;
    /* انیمیشن برای تغییر وضعیت */
}

.arrow.up {
    transform: rotate(180deg);
    /* چرخش برای فلش رو به بالا */
}

.arrow.down {
    transform: rotate(0deg);
    /* فلش رو به پایین */
}

.wrapper {
    display: flex;
}

/* Sidebar styling */
.sidebar {
    background-color: #343a40;
    color: #fff;
    min-height: 100vh;
    transition: all 0.3s ease;

    position: relative;
    cursor: pointer;
}
@media (max-width: 1204px) {
    .sidebar {
        position: fixed;
        /* قرار دادن sidebar به صورت ثابت روی صفحه */
        top: 0;
        right: 0;
        width: 100%;
        /* عرض کامل صفحه */
        z-index: 9999;
        /* قرار دادن منو در بالای سایر المان‌ها */

    }
}
/* Overlay styles when sidebar is open */
@media (max-width: 1204px) {
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    /* سفید با شفافیت */
    z-index: 998;
    /* در زیر sidebar */
}
}

.nav-link {
    padding: 17px 6px !important;
    font-size: 1rem;
    display: flex !important;
    justify-content: space-between !important;
}

.sidebar.open {
    width: 250px;
}

.sidebar.closed {
    width: 3rem;
}

.sidebar-header h3 {
    padding: 25px 6px 1px 1px;
    font-size: 1.2rem;
}

.sidebar-header strong {
    padding: 10px 7px;
    font-size: 1.2rem;
    font-weight: 300;
}

.components {
    padding-left: 0;
    list-style-type: none;
    padding: 15px 6px;
}

.nav-link {
    color: #fff;
    text-decoration: none;
    padding: 10px;
    display: block;
}





.sub-menu {
    padding-right: 2px;
    border-right: 1px solid #ffffff78;
    /* تغییر رنگ خط */
    margin-top: 5px;
    opacity: 0;
    /* شروع با عدم نمایش */
    max-height: 0;
    /* شروع با ارتفاع صفر */
    overflow: hidden;
    /* جلوگیری از نمایش محتوای اضافی */
    transition: max-height .3s cubic-bezier(1, 0.11, 0, 1.03), opacity .3s cubic-bezier(1, 0.06, 0.74, 0.94);
    /* انیمیشن هم‌زمان ارتفاع و شفافیت */
    display: block !important;
    /* افکت‌های ملایم */
}
.sub-menu.open {
    opacity: 1;
    transition: max-height 3s ease, opacity 3s ease;
        /* باز شدن سریعتر */
    /* نمایش کامل */
 max-height: 500px;
    /* ارتفاع مناسب برای نمایش زیرمجموعه‌ها */
}


.sub-menu li {
    padding: 14px 4px;
    /* فاصله بیشتر برای هر آیتم */
    border-bottom: 1px solid #e0e0e0c7;
    /* خط زیر هر زیرمجموعه */
}

.sub-menu li:last-child {
    border-bottom: none;
    /* حذف خط زیر آخرین زیرمجموعه */
}

.sub-menu li:hover {
    background-color: #f1f1f1;
    /* تغییر رنگ پس‌زمینه در حالت hover */
}

/* Toggle Icon Styling */
.toggle-icon {
    position: relative;
    top: 10px;
    margin: 0px 5px;
    background-color: #343a40;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.hamburger-icon {
    font-size: 30px;
    color: #fff;
}

/* Content styling */
.content {
    flex: 1;
    padding: 20px;
    transition: margin-right 0.3s ease;
}

/* Submenu styling */
.list-unstyled {
    padding-left: 8px;
    /* فاصله برای زیرمجموعه‌ها */
}
.fa-arrow-left.rotate {
    transform: rotate(270deg);
        margin-left: 6px;
    /* چرخاندن فلش به 90 درجه */
}
</style>
