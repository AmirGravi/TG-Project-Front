<template>
    <h1 class="TextCssH">ویرایش محصول</h1>
    <div class="col-12 d-flex " style="justify-content: center;" ref="notification">



        <div class="box col-11 col-xl-10" ref="notification">
            <div v-if="notificationMessage" class="alert alert-success col-11">{{ notificationMessage }}</div>

            <div class="container">


                <div v-if="loading" class="alert alert-info">در حال بارگذاری محصول...</div>
                <div v-if="error" class="alert alert-danger">{{ error }}</div>

                <form v-if="product" @submit.prevent="updateProduct" method="put" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="productName" class="form-label d-flex">نام محصول</label>
                        <input type="text" id="productName" v-model="product.name"
                            class="form-control border border-primary" />
                    </div>

                    <div class="mb-3">
                        <label for="productPrice" class="form-label d-flex">قیمت محصول</label>
                        <input type="number" id="productPrice" v-model="product.price"
                            class="form-control border border-danger" />
                    </div>

                    <div class="mb-3">
                        <label for="productDescription" class="form-label d-flex">توضیحات محصول</label>
                        <textarea id="productDescription" v-model="product.description"
                            class="form-control border border-success"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="productCategory" class="form-label d-flex">دسته‌بندی محصول:</label>
                        <select id="productCategory" class="form-control border border-primary"
                            v-model="productCategory" required>
                            <option value="" disabled>انتخاب کنید...</option>

                            <!-- نمایش دسته‌بندی‌های اصلی -->
                            <option v-for=" category in categories" :key="category.id" :value="category._id">
                                {{ category.name }}
                            </option>

                            <template v-for="category in categories">
                                <option v-for="subcategory in category.children" :key="subcategory.id"
                                    :value="subcategory._id">
                                    -{{ subcategory.name }}
                                </option>
                            </template>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="productImages" class="form-label d-flex">عکس محصول:</label>
                        <div v-if="product.images.length" class="piccss row g-3">
                            <div v-for="image in product.images" :key="image" class="col-12 col-md-4 col-lg-3">
                                <div class="card shadow-sm rounded" style="width: 80%;">
                                    <img :src="image" alt="Product Image" class="card-img-top rounded-3" />
                                    <div class="card-body text-center">
                                        <button @click="removeImage(image)" class="btn btn-danger w-100">حذف
                                            تصویر</button>
                                        <div v-if="serverLoading" class="loading-overlay">
                                            <div class="loading-spinner">بارگذاری...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <input type="file" name="images[]" id="productImages" class="form-control border border-warning"
                            @change="handleFileUpload" multiple />

                    </div>


                    <div class="mb-3">
                        <label for="productColors" class="form-label d-flex ">رنگ‌بندی:</label>
                        <div v-for="(color, index) in productColors" :key="index" class="input-group mb-2">
                            <input type="color" class="form-control form-control-color border border-info"
                                v-model="productColors[index].color" />
                            <input type="text" class="form-control border border-info"
                                v-model="productColors[index].name" placeholder="نام رنگ یا توضیح" />
                            <button type="button" class="btn btn-danger" @click="removeColor(index)">حذف</button>
                        </div>
                        <button type="button" class="btn btn-secondary" @click="addColor">افزودن رنگ</button>
                    </div>

                    <div class="mb-3">
                        <label for="productSizes" class="form-label d-flex ">سایزبندی:</label>
                        <div v-for="(size, index) in productSizes" :key="index" class="input-group mb-2">
                            <input type="text" class="form-control border border-dark" v-model="productSizes[index]"
                                placeholder="سایز محصول" />
                            <button type="button" class="btn btn-danger" @click="removeSize(index)">حذف</button>
                        </div>
                        <button type="button" class="btn btn-secondary" @click="addSize">افزودن سایز</button>
                    </div>
                    <div class="mb-3">
                        <label for="productQuantity" class="form-label d-flex">موجودی محصول</label>
                        <input type="number" id="productQuantity" v-model="product.quantity"
                            class="form-control border border-info" placeholder="تعداد موجودی محصول" />
                    </div>
                    <div class="alert alert-dark" role="alert" style="margin-bottom: 21px;">* کاربر عزیز لطفا پس از
                        هرگونه تغییر در محصول از دکمه ذخیره تغییرات استفاده کنید *</div>

                    <div class="d-flex justify-content-between buttomBtns">
                        <button type="submit" class="btn btn-primary" :disabled="loading">
                            {{ loading ? 'در حال بارگذاری...' : 'ذخیره تغییرات' }}
                        </button>
                        <button type="button" class="btn btn-success" @click="$router.go(-1)">بازگشت</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            product: null,
            productColors: [],
            productSizes: [],
            loading: true,
            error: null,
            serverLoading: false,
            images: [],
            notificationMessage: '' , // متغیر جدید برای پیام نوتیفیکیشن
            selectedImages: [], // یا مقدار اولیه مناسب
            previousImages: [], // اینجا متغیر را تعریف کنید
            newImages: [], // متغیرهای جدید
            uploadedImages: [], // لیست تصاویر
            productCategory: '', // فیلد برای ذخیره دسته‌بندی انتخاب شده
            categories: [], // آرایه دسته‌بندی‌ها
        };
    },
    watch: {
        notificationMessage(newVal) {
            if (newVal) {
                this.$refs.notification.scrollIntoView({ behavior: 'smooth' });
            }
        }
    },
    mounted() {  // افزودن متد mounted
        this.fetchProduct();
        this.loadCategories();
    },
    methods: {
        async loadCategories() {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                this.categories = response.data; // فرض بر این است که دسته‌بندی‌ها از سرور دریافت می‌شوند



            } catch (error) {
                console.error("Error loading categories", error);
            }
        },
        async fetchProduct() {
            try {
                const productId = this.$route.params.id;
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                this.product = response.data;
                this.productColors = this.product.colors || [];
                this.productSizes = this.product.sizes || [];
                this.productCategory = this.product.category || [];
                this.categories = this.productCategory || [];
                this.previousImages = this.product.images || []; // بارگذاری تصاویر قبلی
                this.product.quantity = this.product.quantity || 0; // مقداردهی اولیه موجودی
            } catch (err) {
                this.error = err.response ? err.response.data.message : 'خطا در بارگذاری محصول';
            } finally {
                this.loading = false;
            }
        },
        handleFileUpload(event) {
            const files = event.target.files;
            console.log(files);
            this.newImages = []; // فقط فایل‌ها را به newImages اضافه می‌کنیم
            
            // فقط فایل‌ها را به selectedImages اضافه می‌کنیم
            for (let i = 0; i < files.length; i++) {
                this.newImages.push(files[i]);
            }
   
        

       
        },
        addColor() {
            this.productColors.push({ color: '', name: '' });
        },
        removeColor(index) {
            this.productColors.splice(index, 1);
        },
        addSize() {
            this.productSizes.push('');
        },
        removeSize(index) {
            this.productSizes.splice(index, 1);
        },
        // برای حذف تصویر 
        async confirmRemoveImage() {
            const confirmed = confirm('آیا مطمئن هستید که می‌خواهید تصویر را حذف کنید؟');
            if (confirmed) {
                await this.removeImage();
            }
        },
        async removeImage(image) {
            try {
              
                this.serverLoading = true;
                const imageId = image.split('/').pop(); // فقط نام فایل را بگیرید
                console.log(imageId);
                await axios.delete(`http://localhost:5000/api/images/${imageId}`);

                this.product.images = this.product.images.filter(img => img !== image);
                this.notificationMessage = 'تصویر مورد نظر حذف شد.'; // پیام نوتیفیکیشن
                setTimeout(() => {
                    this.notificationMessage = ''; // ناپدید کردن پیام بعد از 3 ثانیه
                }, 3000);
            } catch (error) {
                this.error = 'خطا در حذف تصویر';
                console.error(error);
            } finally {
                this.serverLoading = false; // پایان حالت بارگذاری
            }
        },
        async updateProduct() {
            const formData = new FormData();
            formData.append('name', this.product.name);
            formData.append('price', this.product.price);
            formData.append('description', this.product.description);

            formData.append('quantity', this.product.quantity); // اضافه کردن موجودی
            //  اضافه کردن دسته بندی
            formData.append('category', this.productCategory);  
            // اضافه کردن رنگ‌ها به FormData (فقط رنگ‌هایی که حذف نشده‌اند)
            this.productColors.forEach(color => {
                if (color.color || color.name) { // فقط رنگ‌هایی که مقداردهی شده‌اند
                    formData.append('colors[]', JSON.stringify(color));
                }
            });

            // اضافه کردن سایزها به FormData (فقط سایزهایی که حذف نشده‌اند)
            this.productSizes.forEach(size => {
                if (size) { // فقط سایزهایی که مقداردهی شده‌اند
                    formData.append('sizes[]', size);
                }
            });

            // اضافه کردن تصاویر قبلی
            this.previousImages.forEach((image) => {
                formData.append('images[]', image);
            });

            // اضافه کردن تصاویر جدید
            this.newImages.forEach((imageFile) => {
                formData.append('images[]', imageFile);
            });

            try {
                const productId = this.$route.params.id;
                console.log(productId);
                await axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.notificationMessage = 'محصول با موفقیت به‌روزرسانی شد.'; // پیام موفقیت
                
                setTimeout(() => {
                    this.notificationMessage = ''; // ناپدید کردن پیام بعد از 3 ثانیه
                }, 3000);
                // this.$router.push('/'); // یا هر مسیری که می‌خواهید
            } catch (error) {
                this.error = 'خطا در به‌روزرسانی محصول';
                console.error(error);
            }
        }


    }
};
</script>

<style scoped>
@media (max-width:550px) {
    .buttomBtns{
            flex-direction: column;
            gap: 10px;
    }
}
.alert-dark {
    color: #ffffff;
    background-color: #383839;
    border-color: #bcbebf;
}
.piccss{
    display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
            margin: 0px 0px 23px 0px;
}
input:focus {
    border-color: transparent;
    /* رنگ مرزی را حذف می‌کند */
    box-shadow: none;
    /* سایه‌ی اطراف فیلد را حذف می‌کند */
}
.img-fluid {
    max-width: 28%;
    height: auto;
    display: flex;
    margin-bottom: 1rem;
}


.box {
    box-shadow: 0 3px 20px #eb3b5a7d;
}

.TextCssH {
    box-shadow: 0 0px 8px #eb3b5a7d;
}

.notification-container {
    position: relative;
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    z-index: 1;

}

.alert {

    position: relative;
    padding: 13px;
    margin-bottom: 0;
    border: 1px solid transparent;
    border-radius: .25rem;
}

.progress-bar {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 2px;
    background-color: #055160;
    transition: width 0.5s ease;
    z-index: 1000;
}

.content {
    padding: 0;
}

.price-display {
    color: #fa3131;
    display: flex;
    margin-top: 8px;
    font-weight: 300;
    margin-bottom: 0px;
    padding-bottom: 4px;
    width: auto;

}

.price-underline {
    display: flex;
    width: 50%;
    /* عرض خط را کمی کمتر از 100% تنظیم می‌کند تا با padding جا شود */
    border-bottom: 1px solid rgba(0, 0, 0, 0.451);
    /* خط سیاه */
    margin-top: 4px;
    /* فاصله بین متن و خط */
    margin-bottom: 8px;
    /* فاصله پایین خط */
}

@media (max-width: 600px) {
    .price-underline {
        display: flex;
        width: 100%;
        /* عرض خط را کمی کمتر از 100% تنظیم می‌کند تا با padding جا شود */
        border-bottom: 1px solid rgba(0, 0, 0, 0.451);
        /* خط سیاه */
        margin-top: 4px;
        /* فاصله بین متن و خط */
        margin-bottom: 8px;
        /* فاصله پایین خط */
    }
}
</style>
