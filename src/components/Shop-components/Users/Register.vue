<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="cardCss" style="width: 100%; max-width: 400px;">
            <div class="card-body">
                <div class="container mt-2">
                    <h5 class="card-title TextColorCss text-center mb-4">فرم ثبت نام</h5>
                    <form @submit.prevent="register">
                        <div class="mb-3">
                            <label for="name" class="form-label TextColorCss">نام کاربری</label>
                            <input v-model="name" type="text" id="name" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label TextColorCss">جیمیل</label>
                            <input v-model="email" type="email" id="email" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label TextColorCss">رمز عبور</label>
                            <input v-model="password" type="password" id="password" class="form-control" required />
                        </div>
                        <button type="submit" class="btn btn-primary w-100 btnCss"
                            style="font-size: 1.1rem;"><span class=" TextColorCss">ثبت نام</span></button>
                    </form>
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
            name: '',
            email: '',
            password: '',
        };
    },
    methods: {
        async register() {
            try {
                const res = await axios.post('http://localhost:5000/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                alert(res.data.message);

                localStorage.setItem('email', this.email);

                // هدایت کاربر به صفحه تأیید ایمیل
                this.$router.push('/verify');
            } catch (err) {
                alert(err.response.data.error);
            }
        },
    },
};
</script>

<style scoped>
.btnCss{
        background-color: #000000b8;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid #040404;
}
.cardCss {
    background-color: rgba(255, 255, 255, 0.2) ;
    /* پس‌زمینه نیمه‌شفاف */
    border-radius: 15px ;
    /* گوشه‌های گرد */
    backdrop-filter: blur(10px) ;
    /* ایجاد افکت محو کردن پس‌زمینه */
    -webkit-backdrop-filter: blur(10px) ;
    /* پشتیبانی از مرورگرهای قدیمی */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) ;
    /* سایه برای زیبایی بیشتر */
    padding: 20px ;
    /* فاصله داخلی */
}
.TextColorCss {
    color: #fff1f1;
    font-weight: 400;
    text-shadow: 0px 0px 8px #ffffff;

}

.form-control {
    border: 1px solid #000000 !important;
}
</style>