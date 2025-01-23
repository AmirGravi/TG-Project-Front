<template>
    <div v-if="isLoading" class="loading-overlay">
        <div class="loader-container">
            <img src="/public/images/1732409527_db319036483440b791d820f79b1fc7a8 (1) copy.png" alt="Logo" class="loader-logo" />
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    data() {
        return {
            isLoading: true // وضعیت لودر (برای مثال با استفاده از یک پراپ یا متغیر از خارج کنترل می‌شود)
        };
    },
    methods: {
        // متدی برای کنترل لودر
        toggleLoader(state) {
            this.isLoading = state;
        }
    }
};
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: fit-content;
    font-size: 40px;
    font-family: system-ui, sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    color: #0000;
    -webkit-text-stroke: 1px #fff5f5;
    --l: #0000 45%, #f35cfa 0 55%, #0000 0;
    --g: 0/300% 100% no-repeat text;
    background:
        linear-gradient(-60deg, var(--l)) var(--g),
        linear-gradient(60deg, var(--l)) var(--g);
    animation: l7 4s linear infinite;
}

.loader:before {
    content: "Loading";
}

@keyframes l7 {
    0% {
        background-position: 100%, 0
    }

    50% {
        background-position: 0, 0
    }

    to {
        background-position: 0, 100%
    }
}
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    /* پس‌زمینه سفید با شفافیت */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loader-container {
        text-align: center;
            width: 80%;
            height: 224px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 35px;
            background-color: #151b2f;
}

.loader-logo {
    width: 190px;
        margin-bottom: -9px;
}


@media (min-width:460px) {
    .loader-logo {
    width: 190px;
        margin-bottom: -6px;
    }
}
@media (min-width:880px) {
    .loader-logo {
         width: 209px;
         margin-bottom: -10px;
    }
    .loader-container {
           width: 54% ;
            height: 240px;
    }
}


@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
