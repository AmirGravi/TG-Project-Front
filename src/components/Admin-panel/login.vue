<template>


    <div class="backgroundContain">
        <div class="login-container">
            <div class="col-6 mb-3">
                <AlertNotification v-if="notificationMessage" ref="alert" :message="notificationMessage"
                    :styleAlert="'danger'" :duration="5000" />

            </div>
            <div class="card login-card">
                <div class="card-body">
                    <h2 class="card-title text-center mb-3 welcomecss">ورود به بخش مدیریت</h2>
                    <form @submit.prevent="handleLogin" class="formcss">
                        <div class="mb-3">
                            <label for="username" class="form-label">نام کاربری :</label>
                            <input type="text" v-model="username" id="username" class="form-control" required />
                        </div>
                        <div class="mb-4">
                            <label for="password" class="form-label">رمز عبور :</label>
                            <input type="password" v-model="password" id="password" class="form-control" required />
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mb-4">ورود</button>
                    </form>
                </div>
            </div>
        </div>
    </div>


</template>


<script>
import axios from 'axios';
import AlertNotification from './AlertAdminPanel.vue';
export default {
    components: {
        AlertNotification
    },
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            notificationMessage: this.$route.query.message || '' // دریافت پیام از query
        };
    },

    created() {
       
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (isAuthenticated) {
            this.$router.replace({
                path: '/admin/dashboard',
                query: { message: 'کاربر عزیز شما قبلا وارد شده‌اید و نمی‌توانید مجددا وارد شوید.' }
            });
        }
    },
    mounted() {
        const newMessage = this.$route.query.message; // استخراج پیام از query
        if (newMessage) {
            this.notificationMessage = newMessage; // ذخیره پیام در notificationMessage
            this.$refs.alert.showNotification(); // نمایش هشدار
        }    
    },
    methods: {
        async handleLogin() {
            console.log({ name: this.username, password: this.password });
            try {
                const response = await axios.post('http://localhost:5000/api/admin/login', {
                    username: this.username,
                    password: this.password
                });
                console.log(response);

                if (response.data.success) {
                    
                    
                    const token = response.data.token; // دریافت توکن
                    localStorage.setItem('token', token); // ذخیره توکن در لوکال استوریج
                    localStorage.setItem('isAuthenticated', 'true'); // وضعیت ورود
                    this.$router.push('/admin/dashboard'); // هدایت به داشبورد
                } else {
                    this.notificationMessage = 'نام کاربری یا رمز عبور اشتباه است';
                    this.$refs.alert.showNotification();
                }
            } catch (error) {
                this.notificationMessage = 'هنگام ورود خطایی رخ داده است';
                this.$refs.alert.showNotification();
                console.error('Error during login:', error); // برای تست
            }
        }
    }
};
</script>

<style scoped>
.welcomecss{
        color: #5c5857;
            text-shadow: 1px 1px #200303;
}
.login-container {
    display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 5rem;
        flex-direction: column;
}
.backgroundContain{
background-image: url('/public/images/beautiful-landscape-mother-nature_23-2148992406.jpg');
    background-size: cover;
    background-position: center;
    height: 43.3rem;
}

.login-card {
    width: 50vw;
    /* عرض کارت را تنظیم کنید */
    margin: 0;
    /* حذف مارجین اتوماتیک */
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
@media (min-width:757px) {
    .card {
            min-width: 44rem !important;
        }
}
        .card {
            min-width: 80vw;
        }

.card-body {
    /* flex: 1 1 auto; */
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
}
.formcss {
    width: 57% !important;
    /* عرض اینپوت‌ها را به 100 درصد تغییر دهید */
    max-width: 90% !important;
    /* یا مقدار دلخواه برای تنظیم حداکثر عرض */
    margin: auto !important;
    /* برای مرکز قرار دادن اینپوت‌ها */
}
@media (max-width: 580px) {
    .formcss {
            width: 100% !important;
            /* عرض اینپوت‌ها را به 100 درصد تغییر دهید */
            max-width: 90% !important;
            /* یا مقدار دلخواه برای تنظیم حداکثر عرض */
            margin: auto !important;
            /* برای مرکز قرار دادن اینپوت‌ها */
        }
}
</style>
