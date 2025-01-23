<template>



    <div class="contain">
        <ul>
            <li class="menu-item">
               <i class="fa-solid fa-bars"></i>

            </li>
        </ul>

        <div class="logo">
            <a href="https://narianco.com/">
                <img src="/images/Logo300.png" class="head-Img" alt="Site Logo">
            </a>
        </div>



        <li class="menu-item cart-icon">
        
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="cart-count">0</span>
  

        </li>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.contain{
        display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            min-height: 3rem;
            background-color: white;
                gap: 2rem;
}
@media (min-width:450px) {
    .contain{
        gap: 5rem;
    }
}
@media (min-width:500px) {
    .contain {
        gap: 9rem;
    }
}
@media (min-width:800px) {
    .contain {
        gap: 18rem;
    }
}
.head-Img{
        max-width: 8rem;
}
ol,
ul {
    list-style: none;
}

.cart-icon {
    position: relative;
    /* والد دارای موقعیت */
    display: inline-block;
}

.cart-count {
    position: absolute;
        top: 10px;
        right: 18px;
        background-color: #ff4756d3;
        color: white;
        font-size: 10px;
        font-weight: 500;
        padding: 2px 5px;
        border-radius: 50%;
        min-width: 11px;
        text-align: center;
        line-height: 1;
        pointer-events: none;
        display: flex;
        align-items: center;
}
ul{
    margin: 0;
    padding: 0;
}
.menu-item {
font-size: 1.4rem;
display: flex;
}

/* اضافه کردن استایل برای آیکون */
.fa-bars {
    font-size: 1.6rem;
    /* تنظیم اندازه آیکون */
    line-height: 1;
}
</style>