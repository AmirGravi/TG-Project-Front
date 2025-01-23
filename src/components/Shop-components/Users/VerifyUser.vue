<template>
    <div class="container mt-5 text-center">
        <h2>تأیید ایمیل</h2>
        <p>لطفاً ایمیل خود را بررسی کرده و لینک تأیید را کلیک کنید.</p>
        <div class="countdown-circle mt-3">
            <h3>{{ minutes }}:{{ seconds }}</h3>
            <p>زمان باقی‌مانده برای تایید: ۵ دقیقه</p>
        </div>
        <p v-if="message" class="mt-3">{{ message }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            minutes: 5,
            seconds: 0,
            message: '',
            intervalId: null, // برای مدیریت بازه بررسی
            token: null,
        };
    },
    methods: {
        startCountdown() {
            const countdown = setInterval(() => {
                if (this.seconds === 0) {
                    if (this.minutes === 0) {
                        clearInterval(countdown);
                    } else {
                        this.minutes -= 1;
                        this.seconds = 59;
                    }
                } else {
                    this.seconds -= 1;
                }
            }, 1000);
        },
        async checkVerification() {
            try {
                const email = localStorage.getItem('email');
                const res = await axios.get('http://localhost:5000/api/check-verification', {
                    params: { email },
                });
                console.log(res.data);
                

                if (res.data.isVerified) {
                    this.message = 'ثبت‌نام با موفقیت تکمیل شد! اکنون وارد می‌شوید.';
                    clearInterval(this.intervalId); // توقف بررسی
                    setTimeout(() => this.$router.push('/'), 3000); // هدایت به صفحه لاگین
                } else {
                    this.message = 'ایمیل شما هنوز تأیید نشده است. لطفاً منتظر بمانید.';
                }
            } catch (err) {
                this.message = 'خطا در بررسی وضعیت تأیید.';
            }
        },
    },
    mounted() {
        this.startCountdown();

        // بررسی وضعیت تأیید هر ۵ ثانیه
        this.intervalId = setInterval(() => {
            this.checkVerification();

        }, 1000);
    },
    created() {
        // دریافت توکن از query
        this.token = this.$route.query.token;
    },
    beforeDestroy() {
        // توقف بازه زمانی هنگام خروج از کامپوننت
        clearInterval(this.intervalId);
    },
};
</script>

<style scoped>
.countdown-circle {
    width: 150px;
    height: 150px;
    border: 5px solid #007bff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
</style>
