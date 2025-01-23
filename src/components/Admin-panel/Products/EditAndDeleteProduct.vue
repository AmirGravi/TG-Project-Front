<template>
    <h1 class="TextCssH">ویرایش و حذف محصولات</h1>
    <div class="col-12 d-flex " style="justify-content: center;">


        <div class="box col-11 col-xl-10" ref="notification">

            <div class="container ">
                <div v-if="loading" class="alert alert-info">در حال بارگذاری محصولات...</div>
                <div v-if="error" class="alert alert-danger">{{ error }}</div>

                <div class="row mt-3" v-if="products.length">
                    <div class="col-md-4 mb-3" v-for="product in products" :key="product._id">
                        <div class="product-card">
                            <div class="image-container">
                                <div class="image-slider" v-if="product && product.images && product.images.length">
                                    <button @click="prevImage(product._id)" v-if="product.images.length > 1"
                                        class="nav-button left-button">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>

                                    <img :src="product.images[imageIndices[product._id] || 0]" alt="Product Image"
                                        style="max-width: 80%; max-height:256px;" />

                                    <button @click="nextImage(product._id)" v-if="product.images.length > 1"
                                        class="nav-button right-button">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                    <div v-if="loadingImage[product._id]" class="overlay">
                                        <div class="spinner"></div>
                                    </div>
                                </div>

                            </div>
                            <h5 class="product-name">{{ product.name }}</h5>
                            <p class="product-price">{{ formattedPrice(product.price) }} هزار تومان</p>
                            <p class="product-description">{{ truncatedDescription(product.description) }}</p>

                            <div class="d-flex justify-content-between mt-4">
                                <button class="btn btn-danger" @click="deleteProduct(product._id)">حذف</button>
                                <!-- دکمه حذف -->
                                <button class="btn btn-primary" @click="editProduct(product._id)">ویرایش</button>
                                <!-- دکمه ویرایش -->
                            </div>

                        </div>
                    </div>
                </div>

                <div v-else class="alert alert-warning col-xl-10">محصولی وجود ندارد.</div>
            </div>

        </div>


    </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
            loading: true,
            error: null,
            imageIndices: {}, // اندیس‌های فعلی تصاویر هر محصول,
            loadingImage: {}, // وضعیت لودینگ برای هر محصول
        };
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        // بیشتر از چند کاراکتر توضیحات نشون داده نشوند

        truncatedDescription(description) {
            const maxLength = 30; // تعداد کاراکترهایی که می‌خواهید نمایش داده شود
            return description.length > maxLength
                ? description.substring(0, maxLength) + '...'
                : description;
        },
        editProduct(productId) {
            this.$router.push({ name: 'EditProduct', params: { id: productId } });
        },
        async deleteProduct(productId) { // متد حذف محصول
            if (confirm('آیا از حذف این محصول مطمئن هستید؟')) {
                try {
                    await axios.delete(`http://localhost:5000/api/products/${productId}`);
                    this.showNotificationWithProgress('محصول با موفقیت حذف شد.');
                    await this.fetchProducts(); // بارگذاری مجدد محصولات
                   
                } catch (error) {
                    this.showNotificationWithProgress('خطا در حذف محصول');
                }
            }
        },
        async fetchProducts() {
            this.loading = true; // در اینجا شروع به بارگذاری می‌کنیم
            this.error = null;   // خطا را پیش از شروع بارگذاری پاک کنید

            try {
                const response = await axios.get('http://localhost:5000/api/products'); // آدرس API شما
                this.products = response.data;
                if (!Array.isArray(this.products)) {
                    throw new Error('داده‌های دریافت شده نامعتبر است.');
                }
                console.log(response.data);
                this.products.forEach(product => {
                    this.$set(this.imageIndices, product._id, 0);
                    this.$set(this.loadingImage, product._id, false);
                });
            } catch (err) {
                this.error = err.response ? err.response.data.message : 'خطا در بارگذاری محصولات';
            } finally {
                this.loading = false;
                this.error = false
            }
        },
        nextImage(productId) {
            this.changeImage(productId, 1);
        },
        prevImage(productId) {
            this.changeImage(productId, -1);
        },
        changeImage(productId, direction) {
            this.loadingImage[productId] = true; // فعال کردن لودینگ

            setTimeout(() => {
                const product = this.products.find(p => p._id === productId);
                const currentIndex = this.imageIndices[productId] || 0;
                const newIndex = (currentIndex + direction + product.images.length) % product.images.length;

                this.imageIndices[productId] = newIndex;
                this.loadingImage[productId] = false; // غیر فعال کردن لودینگ
            }, 300); // تأخیر برای نمایش لودینگ
        },
        formattedPrice(price) {
            return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
        }
    },
};
</script>

<style scoped>

.box {
    box-shadow: 0 3px 20px #fd96447d;
}

.TextCssH {
    box-shadow: 0 0px 8px #fd96447d;
}
p {
    margin-bottom: 5px;
}

.product-colors,
.product-sizes {
    margin-top: 10px;
    text-align: center;
}

.quantityCss {
    background-color: #eccc68;
    border-radius: 50%;
    padding: 2px 10px;
}

.color-swatches {
    display: flex;
    border: 1px solid #ffab33;
    border-radius: 23px;
    padding: 5px 1px;
    gap: 8px;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
}

.color-swatch {
    width: 30px;
    height: 30px;
    display: flex;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.size-options {
    display: flex;
    border: 1px solid #ff4757;
    border-radius: 23px;
    padding: 5px 1px;
    gap: 8px;
    justify-content: center;

    flex-wrap: wrap;
    align-content: center;
}

.size-option {
    padding: 5px 10px;
    background-color: #f0f0f0;
    border-radius: 20px;
    border: 1px solid #ddd;
    cursor: pointer;
    font-weight: bold;
}

.size-option:hover {
    background-color: #007bff;
    color: white;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.277);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.image-slider {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgb(0 0 0 / 0%);
    color: rgb(255 100 100);
    border: none;
    font-size: 34px;
    padding: 10px;
    cursor: pointer;
}

.left-button {
    left: 10px;
}

.right-button {
    right: 10px;
}

.row {
    display: flex;
    flex-wrap: wrap;
}

.product-card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    border: 1px solid;
    transition: transform 0.2s;
}

.product-card:hover {
    transform: scale(1.05);
}

.product-name {
    font-size: 1.25rem;
    margin: 0.5rem 0;
}

.product-price {
    color: #007bff;
    font-size: 1.1rem;
}

.product-description {
    font-size: 0.9rem;
    color: #555;
}

.color-name {
    font-weight: 300;
}
</style>
