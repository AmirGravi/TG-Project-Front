<template>

    <div class="header-container">
        <headerComponent dir="ltr"></headerComponent>
    </div>
    <div class="MobileHeader">
        <MobileHeader ></MobileHeader>
    </div>

    <img class="imgcss" src="https://narianco.com/wp-content/uploads/2024/09/mainBannerFall2024-copy-2048x1024.webp"
        alt="">


</template>

<script>
import headerComponent from './Header.vue';
import MobileHeader from './MobileHeader.vue';
export default {

    components: {
        headerComponent,
        MobileHeader
    }

}
</script>

<style scoped>
@media (max-width: 1200px) {
    .header-container {
        display: none !important;
    }
}
@media (max-width: 1200px) {
    .MobileHeader {
        display: block !important;
        position: relative;
        z-index: 1000;  

    }
}
.MobileHeader{
    display: none;
}
.header-container {
    position: relative;
        z-index: 1000;
        display: flex;
        min-height: 65px;
        align-items: center;
}

.imgcss {
    width: 100%;
}

.headerComponent {
    position: relative;
    z-index: 1;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    /* پس‌زمینه نیمه شفاف برای هدر */
}

h1 {
    position: relative;
    z-index: 2;
    text-align: center;
    margin-top: -100px;
    /* فاصله از بالای صفحه */
    color: white;
    /* رنگ نوشته سفید برای دیده شدن روی تصویر */
}

router-link {
    position: relative;
    z-index: 2;
    display: block;
    text-align: center;
    margin-top: 20px;
    color: white;
    /* رنگ لینک سفید */
}
</style>