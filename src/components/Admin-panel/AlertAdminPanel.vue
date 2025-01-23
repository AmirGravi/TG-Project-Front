<template>
    <div v-if="show" class="notification-container col-12">
        <div :class="`AlertText alert alert-${styleAlert}`" role="alert">
            {{ message }}
        </div>
        <div v-if="progressEnabled" ref="progressBar" class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
</template>

<script>
export default {
    props: {
        message: { type: String, required: true }, // پیام اعلان
        styleAlert: { type: String, default: 'info' }, // نوع اعلان: success, danger, info, warning
        duration: { type: Number, default: 5000 }, // مدت زمان نمایش اعلان
        progressEnabled: { type: Boolean, default: true } // نمایش یا عدم نمایش نوار پیشرفت
    },
    data() {
        return {
            show: false,
            progress: 0,
            intervalId: null,
        };
    },
    methods: {
        showNotification() {
            this.show = true;
            if (this.progressEnabled) {
                this.startProgress();
            }

            // اسکرول به سمت المنت 300px بالاتر از آن
            this.$nextTick(() => {
                const element = this.$el;
                const offset = 300;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const positionToScroll = elementPosition - offset;

                window.scrollTo({
                    top: positionToScroll,
                    behavior: 'smooth'
                });
            });

            setTimeout(() => {
                this.hideNotification();
            }, this.duration);
        },
        hideNotification() {
            this.show = false;
            clearInterval(this.intervalId);
            this.progress = 0;
        },
        startProgress() {
            const intervalStep = 100 / (this.duration / 100);
            this.intervalId = setInterval(() => {
                if (this.progress < 100) {
                    this.progress += intervalStep;
                } else {
                    clearInterval(this.intervalId);
                }
            },90 );
        }
    }
};
</script>


<style scoped>
.notification-container {
    position: relative;
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.AlertText{
    font-size: .8rem;
    text-align: center;
}

.alert {
    position: relative;
    padding: .7rem 0;
    margin-bottom: 0;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
}

.progress-bar {
    position: absolute;
    bottom: 0px;
    right: 0;
    height: 4px;
    background-color: #000000c8;
    transition: width 0.5s ease;
    border-radius: 10px;
    z-index: 1000;
}
</style>