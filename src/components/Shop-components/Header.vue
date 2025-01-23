<template>
    <div class="container-fluid" style="z-index: 1000;">
        <div class="header" :class="['header', { 'scrolled': isScrolled }]">
            <div class="logo">
                <a href="https://narianco.com/">
                    <img src="/images/Logo300.png" :class="{ 'logo-small': isScrolled }" alt="Site Logo">
                </a>
            </div>


            <div class="nav">

                <!-- منوی کشویی -->
                <div class="menu">
                    <ul>
                        <li class="menu-item">
                            <a href="#">محصولات<i class="fa-solid fa-bars"></i></a>
                            <ul class="submenu">
                                <li><a href="#">مردانه</a><i class="fa-solid fa-chevron-left"></i></li>
                                <li><a href="#">زنانه</a><i class="fa-solid fa-chevron-left"></i></li>
                            </ul>
                        </li>
                        <li class="menu-item">
                            <a class="Vizhecss" href="#">فروش ویژه</a>
                        </li>

                        <!-- باکس جستجو -->
                        <div class="search-box">
                            <form @submit.prevent="searchProducts">

                                <input v-model="searchQuery" type="text" placeholder="جستجو در محصولات..." />
                            </form>

                        </div>


                        <li class="menu-item">

                            <router-link to="/Auth"><i class="fa-regular fa-user"></i></router-link>


                        </li>


                        <li class="menu-item">
                            <i class="fa-regular fa-heart"></i>
                        </li>


                        <li class="menu-item cart-icon">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span class="cart-count">0</span>
                        </li>

                    </ul>
                </div>



            </div>

        </div>
        <div v-if="searchResults.length > 0" class="search-results">
            <div v-for="product in searchResults" :key="product.id" class="product-card">
                <img :src="product.images[0]" alt="Product Image" class="product-image-search"
                    v-if="product.images && product.images.length" />
                <div class="searchdivCss">
                    <h3 class="search-name-head">{{ product.name }}</h3>

                    <div class="d-flex">قیمت : <div style="color: #ffa502;"> {{ product.price }} تومان </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '', // برای نگهداری مقدار جستجو
            searchResults: [], // ذخیره نتایج جستجو
            isScrolled: false, // وضعیت اسکرول
        }
    },
    watch: {
        searchQuery: {
            handler(newQuery) {
                if (newQuery.trim() === '') {
                    this.searchResults = []; // اگر جستجو خالی است، نتایج را پاک کن
                    return;
                }
                this.fetchProducts(newQuery); // جستجو در دیتابیس
            },
            immediate: true, // بلافاصله بعد از mount اجرا شود
        },
    },
    methods: {
        async fetchProducts(query) {
            try {
                const response = await axios.get('http://localhost:5000/api/products/search', {
                    params: { query },
                });
                this.searchResults = response.data; // ذخیره نتایج جستجو
            } catch (error) {
                console.error('Error fetching products:', error.response);
                this.searchResults = []; // خالی کردن نتایج در صورت خطا
            }
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 1; // بررسی اسکرول بیش از 10 پیکسل
            if (window.scrollY > 5) {
                this.$el.querySelector('.header').classList.add('sticky'); // اضافه کردن کلاس sticky
            } else {
                this.$el.querySelector('.header').classList.remove('sticky'); // حذف کلاس sticky
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll); // اضافه کردن listener
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll); // حذف listener
    },

}


</script>

<style scoped>
.d-flex {
    display: flex;
    gap: 10px;
    /* فاصله بین عناصر */
    align-items: center;
    /* تراز کردن عمودی */
}
.search-box {
    display: flex;
    align-items: center;
    margin-left: 20px;
    flex-direction: row-reverse;
}


.search-box input {
padding: 8px 12px 8px 30px;
    /* فضای کافی برای آیکون */
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
        direction: rtl;
        margin-right: 21px;
            width: 267px;
}

.search-box button {
    padding: 8px 12px;
    font-size: 14px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-box button:hover {
    background-color: #45a049;
}


.Vizhecss{
        margin: 1px -23px;
}
.Vizhecss:hover{
    color: #ff4757;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
}

.container {
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
}
ul{
        display: flex;
            flex-direction: row-reverse;
            align-items: center;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
}

/* استایل هدر هنگام اسکرول */
.header.scrolled {
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* سایه برای تفکیک */
}

/* هنگام چسبیدن هدر به بالای صفحه */
.header.sticky {
    position: fixed;
    top: 0;
    /* چسبیدن هدر به بالای صفحه */
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    /* بالاتر از بقیه عناصر */
    padding: 10px 0;
    /* کمی فاصله برای هدر */
}
/* استایل پیش‌فرض لوگو */
.logo img {
    width: 210px;
    height: 44px;
    transition: width 0.3s ease, height 0.3s ease;
}

/* استایل لوگو هنگام اسکرول */
.logo img.logo-small {
    width: 150px;
    /* اندازه کوچک لوگو */
    height: auto;
}

.nav {
    display: flex;
    align-items: center;
}

.products-link {
    text-decoration: none;
    color: #333;
    padding: 10px;
    display: block;
    margin-right: 20px;
}

.products-link:hover {
    background-color: #f1f1f1;
}

.menu {
    position: relative;
}

.menu ul {
    list-style: none;
}

.menu-item {
    position: relative;
}

.menu-item a {
    text-decoration: none;
    color: #333;
    padding: 10px 20px;
        display: flex;
            align-items: center;
}
.fa-bars:before,
.fa-navicon:before {
    content: "\f0c9";
    font-size: 21px;
    padding-left: 11px;
}


/* منوی کشویی */
.submenu {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    min-width: 200px;
}

.menu-item:hover .submenu {
    display: block;
}

.submenu li {
    padding: 2px 1px;
        background-color: white;
            display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: space-between;

}

.submenu li a {
    color: #333;
    text-decoration: none;
        direction: rtl;
}

.fa-chevron-left{
        padding-left: 10px;
            color: #27272772;
                font-size: 12px;
}

.product-card{
       width: 30%;
        direction: rtl;
            display: flex;
            flex-direction: row;
                padding: 8px 12px;
                    margin: 1px 0px;
}
.search-results{
    display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 170px;
}
.product-image-search{
    width: 24%;
        height: 87px;
        border-radius: 64%;
            border: 2px solid #ff6b81;
}
.searchdivCss{
    display: flex;
        flex-direction: column;
        justify-content: space-evenly;
            padding-right: 34px;
}
.search-name-head{
    color:#ff6348;
    font-weight: 500;
}

.fa-user{
        font-size: 25px;
           
}
.fa-heart{
    font-size: 25px;
    padding-right: 18px;
}
.fa-cart-shopping{
        font-size: 25px;
            padding-right: 18px;
}
.cart-icon {
    position: relative;
    /* والد دارای موقعیت */
    display: inline-block;
}

.cart-count {
    position: absolute;
    top: 10px;
        right: 37px;
    background-color: #ff4756d3;
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 7px;
    border-radius: 50%;
    min-width: 16px;
    /* حداقل عرض */
    text-align: center;
    line-height: 1;
    pointer-events: none;
    /* جلوگیری از کلیک روی بج */
    display: flex;
        align-items: center;
}

</style>