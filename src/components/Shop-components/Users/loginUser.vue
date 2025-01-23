<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="cardCss" style="width: 100%; max-width: 400px;">
            <div class="card-body">
                <h5 class="card-title TextColorCss text-center mb-4">ورود به حساب</h5>

                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="email" class="form-label TextColorCss">ایمیل</label>
                        <input v-model="email" type="email" class="form-control" id="email"
                            placeholder="ایمیل خود را وارد کنید" required />
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label TextColorCss">رمز عبور</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="رمز عبور خود را وارد کنید" required />
                    </div>

                    <button type="submit" class="btn btn-primary w-100 btnCss"><span class="TextColorCss"
                            style="font-size: 1.1rem;">ورود</span></button>
                </form>

                <div class="mt-3 text-center">
                    <small>حساب کاربری ندارید؟ <a href="/register">ثبت نام کنید</a></small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            // Logic for login will go here
            console.log('Login data:', {
                email: this.email,
                password: this.password
            });

            // For example, make an API call to validate login credentials
        }
    }
};
</script>

<style scoped>
.btnCss {
    background-color: #000000b8;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid #040404;
}
.cardCss {
    background-color: rgba(255, 255, 255, 0.2);
    /* پس‌زمینه نیمه‌شفاف */
    border-radius: 15px;
    /* گوشه‌های گرد */
    backdrop-filter: blur(10px);
    /* ایجاد افکت محو کردن پس‌زمینه */
    -webkit-backdrop-filter: blur(10px);
    /* پشتیبانی از مرورگرهای قدیمی */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* سایه برای زیبایی بیشتر */
    padding: 20px;
    /* فاصله داخلی */
}
.TextColorCss{
            color: #fff1f1;
                font-weight: 400;
                text-shadow: 0px 0px 8px #ffffff;
        
}
.form-control{
        border: 1px solid #000000 !important;
}
</style>
