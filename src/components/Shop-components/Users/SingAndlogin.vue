<template>

    <div class="container-fluid ">
        <!-- نمایش لینک‌ها در یک طرف صفحه -->


          <button class="btn btn-dark" @click="PuchHome">بازگشت به فروشگاه</button>


        <div class="contain_Auth">
            <div class="linksCss">
                <router-view v-if="$route.path == '/Auth/singup'"></router-view>

                <router-link class=" ball" v-if="$route.path == '/Auth/login' || $route.path == '/Auth'"
                    to="/Auth/singup">
                    <span class="RouteText">ثبت نام</span></router-link>



            </div>

            <div class="linksCss twoCss">
                <router-view v-if="$route.path == '/Auth/login'"></router-view>

                <router-link class=" ball" v-if="$route.path == '/Auth/singup' || $route.path == '/Auth'"
                    to="/Auth/login"><span class="RouteText">ورود</span></router-link>
            </div>

        </div>




    </div>


</template>

<script>
export default {

    methods: {
        PuchHome() {
            this.$router.push('/')
        }
}

};
</script>

<style scoped>

.container-fluid {
    background-image: url('https://i.pinimg.com/736x/d1/8d/0e/d18d0ebe24c36c00d88c4202a5e59acc.jpg');
        /* استفاده از تصویر آنلاین */
        background-size: cover;
        /* تصویر به اندازه کامل فضای عنصر کشیده می‌شود */
        background-position: center;
        /* تصویر در وسط قرار می‌گیرد */
        background-repeat: no-repeat;
    display: flex;
        height: 43.5rem;
        justify-content: center;
        padding: 0;
        flex-direction: column;
        align-items: center;
}
.contain_Auth{
    display: flex;
        height: 25.5rem;
        width: 100%;
        justify-content: center;
        padding: 0;
        gap: 0rem;
}
.btn{
        margin-bottom: 2rem;
            width: 20rem;
}
@media (max-width:668px) {
    .contain_Auth {

        display: flex;
        height: 55rem !important;
        justify-content: center;
        flex-direction: column;
        padding: 0;
        gap: 35px;
    }

    .linksCss {
        padding: 17px 0px;
    }
    .container-fluid{
        height: 55rem;
    }
    .btn{
        margin-top: 2rem;
    }
}
.RouteText {
        font-size: 40px;

        font-weight: bold;
        text-transform: uppercase;
        /* رنگ پیش‌فرض برای مرورگرهای قدیمی */
            color: white;
        
            /* استایل مدرن */
        background: linear-gradient(90deg, #ffffff 0%, #000000 100%);
        
            /* استایل مدرن */
            -webkit-text-stroke: 0px #ffffff;
            background: conic-gradient(#ffffff 0 0) 100% 0/0% 100% no-repeat text;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        
            animation: l1 3s linear infinite;
    }

    @keyframes l1 {
        0% {
                background-size: 0% 100%;
                /* شروع از صفر */
            }
        
            55% {
                background-size: 100% 100%;
                /* پر شدن کامل */
            }
        
            100% {
                background-size: 100% 100%;
                /* توقف روی حالت کامل */
            }
    }




.linksCss {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

   
}




.leftPanel {
    width: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
}

.rightPanel {
    width: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
}
.ball {
    border-radius: 50%;
    width: 18rem;
    height: 18rem;
    background: #222932;
    /* رنگ ثابت توپ */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 3rem;
    text-align: center;
    text-decoration: none;
}

</style>
