<template>
    <h1 class="TextCssH">ویرایش و حذف دسته بندی ها</h1>
    <div class="col-12 d-flex " style="justify-content: center;">


        <div class="box col-11 col-xl-10" ref="notification">

            <div class="card w-100">
                <div class="card-header backgroundCardH text-white">
                    <h2 class="card-title h5 mb-0">لیست دسته‌بندی‌ها</h2>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li v-for="category in categories" :key="category._id" class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center flexCss ">
                                <div>
                                    <strong>{{ category.name }}</strong>
                                    <p class="mb-0 text-muted">
                                        {{ category.description || "بدون توضیحات" }}
                                    </p>
                                </div>
                                <div>
                                    <button class="btn btn-warning btn-sm mx-2" @click="openEditModal(category)">
                                        ویرایش
                                    </button>
                                    <button class="btn btn-danger btn-sm" @click="deleteCategory(category._id)">
                                        حذف
                                    </button>
                                </div>
                            </div>
                            <!-- نمایش فرزندان -->
                            <ul v-if="category.children && category.children.length > 0" class="mt-3">
                                <li v-for="child in category.children" :key="child._id"
                                    class="list-group-item list-group-item-secondary">
                                    <div class="d-flex justify-content-between flexCss">
                                        <div>
                                            <div class="d-flex flex-row align-items-start">
                                                <strong class="ps-2"> {{ child.name }}</strong>
                                                <span class="text-muted text-mutedChild">(فرزند) </span>

                                            </div>
                                            <p class="mb-0 text-muted">
                                                {{ child.description || "بدون توضیحات" }}
                                            </p>

                                        </div>
                                        <div>
                                            <button class="btn btn-warning btn-sm mx-2" @click="openEditModal(child)">
                                                ویرایش
                                            </button>
                                            <button class="btn btn-danger btn-sm" @click="deleteCategory(child._id)">
                                                حذف
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- مودال برای ویرایش دسته بندی -->
        <div>
            <div>
                <!-- دکمه برای نمایش مودال -->


                <!-- مودال -->
                <div class="modal" :class="modalClasses" :style="modalStyles">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <AlertNotification v-show="notificationMessage " ref="alert" :message="notificationMessage"
                                :styleAlert="'info'" :duration="5000" />

                            <div class="modal-header d-flex flex-row justify-content-between ">
                                <h5 class="modal-title modalcss">ویرایش دسته‌بندی</h5>
                                <button type="button" class="btn btn-outline-secondary" @click="closeModal"
                                    aria-label="Close">
                                    <span aria-hidden="true" class="CloseModalCss">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="updateCategory">
                                    <div class="form-group">
                                        <label for="name" class="text-primary">نام دسته‌بندی</label>
                                        <input type="text" id="name" v-model="editForm.name"
                                            class="form-control border border-primary" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="description" class="text-danger">توضیحات</label>
                                        <textarea id="description" v-model="editForm.description"
                                            class="form-control border border-danger"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="image" class="text-success">تصویر</label>
                                        <input type="file" id="image" @change="handleImageChange"
                                            class="form-control border border-success" />
                                    </div>
                                    <div class="form-group">
                                        <label for="parent" class="text-warning">دسته‌بندی والد:</label>
                                        <select v-model="editForm.parent" id="parent"
                                            class="form-select border-warning">
                                            <option value="none">بدون دسته‌بندی</option>
                                            <option v-for="category in categories" :key="category._id"
                                                :value="category._id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div v-if="imagePreview" class="form-group">
                                        <label>پیش‌نمایش تصویر</label>
                                        <img :src="'http://localhost:5000' + imagePreview" alt="Preview"
                                            class="img-thumbnail" width="100" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" style="background-color:#fd9644;border: 1px solid;"
                                    class="btn btn-primary" @click="updateCategory">ذخیره
                                    تغییرات</button>
                                <button type="button" @click="closeModal" class="btn btn-secondary">بستن</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AlertNotification from '../AlertAdminPanel.vue';

export default {
    components: {
        AlertNotification
    },
    data() {
        return {
            categories: [],
            editForm: {
                _id: "",
                name: "",
                description: "",
                parent: "",
                image: null,
            },
            showModal: false,
            imagePreview: null, // برای پیش‌نمایش تصویر انتخابی
            notificationMessage: '', // یا مقدار پیش‌فرض دلخواه
            parent: '', // مقدار پیش‌فرض: بدون دسته‌بندی
           
        };
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        closeModal() {
      
            this.showModal = false;
            this.imagePreview = null; // پاک کردن پیش‌نمایش تصویر
            this.notificationMessage = ''; // پاک کردن پیام نوتیفیکیشن
        },

        async fetchCategories() {
            try {
                const response = await axios.get("http://localhost:5000/api/categories");
                this.categories = response.data;
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },

        openEditModal(category) {
            this.editForm = { ...category };
            this.imagePreview = category.image || null; // پیش‌نمایش تصویر قبلی در صورت موجود بودن
            this.showModal = true;
        },

        handleImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.editForm.image = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        async updateCategory() {
            const formData = new FormData();
            formData.append('name', this.editForm.name);
            formData.append('description', this.editForm.description);
            formData.append('parent', this.editForm.parent || "");

            if (this.editForm.image) {
                formData.append('image', this.editForm.image);
            }

            try {
                const response = await axios.put(
                    `http://localhost:5000/api/categories/${this.editForm._id}`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                this.fetchCategories();
                // this.closeModal();
                this.notificationMessage = response.data.message; // ذخیره پیغام در data
                this.$refs.alert.showNotification()
            
                this.showModal = true;
            } catch (error) {
                this.notificationMessage = error.response ? error.response.data.message : "مشکلی در ارتباط با سرور وجود دارد"; // اگر خطا پاسخ سرور داشته باشد، پیام آن را نمایش بده
                this.$refs.alert.showNotification()
                console.error("Error updating category:", error);
            }
        },

        async deleteCategory(categoryId) {
            if (confirm("آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟")) {
                try {
                    await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
                    this.fetchCategories();
                    alert("دسته‌بندی با موفقیت حذف شد.");
                } catch (error) {
                    console.error("Error deleting category:", error);
                }
            }
        },
         // تعیین وضعیت نمایش مودال
         shouldModalBeVisible() {
            // شرط: نمایش مودال فقط در صورتی که پیام نوتیفیکیشن وجود داشته باشد یا showModal فعال باشد
            return this.notificationMessage || this.showModal;
        },
      
    },
    computed: {
        // کلاس‌های پویا
        modalClasses() {
            return {
                'fade': !this.shouldModalBeVisible(),
                'show': this.shouldModalBeVisible(),
            };
        },
        // استایل‌های پویا
        modalStyles() {
            return {
                'display': this.shouldModalBeVisible() ? 'block' : 'none',
                'background-color': this.shouldModalBeVisible() ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
            };
        },
    },
};
</script>

<style scoped>
.backgroundCardH{
        background-color: #fd9644 !important;
        
}
.form-group{
        margin-top: 7px;
}
.box {
    box-shadow: 0 3px 20px #ffbd057d;
}

.TextCssH {
    box-shadow: 0 0px 8px #ffbd057d;
}

@media (max-width: 845px) {
    .flexCss{
        display: flex !important;
                flex-direction: column !important;
align-items: center;
    }
}


ul{
    padding: 0px;
}
.CloseModalCss{
    font-size: 30px;
        display: flex;
        height: 23px;
        align-items: center;
}
.categoryshowCss {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-right: 60px;
}
.text-mutedChild{
        padding: 2px;
            border-radius: 20px;
            background-color:  #ffc107 !important;
            color:#000000ea ;

}

.categoryNameCss {
    background-color: #fd9644;
    font-size: 20px;
    padding: 8px;
    border-radius: 8px;
    color: #ffffff;
    font-weight: 200;
}

.categorydiscriptionCss {
    background-color: #26de81;
    font-size: 16px;
    padding: 8px;
    border-radius: 8px;
    color: #ffffff;
    font-weight: 200;
}

.subcategoryIndent {
    margin-left: 20px;
    /* فاصله دادن به زیرمجموعه‌ها */
}

.subcategoryNameCss {
    background-color: #f39c12;
    font-size: 18px;
    padding: 8px;
    border-radius: 8px;
    color: #ffffff;
    font-weight: 200;
}

.subcategoryDescriptionCss {
    background-color: #16a085;
    font-size: 14px;
    padding: 8px;
    border-radius: 8px;
    color: #ffffff;
    font-weight: 200;
}

.childsCss {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 5px;
}

.childsboxCss {
    border-radius: 15px;
}

.btnCss {
    background-color: #eb3b5a !important;
    border-color: #fc5c65 !important;
    color: white !important;
}

button:focus,
input:focus,
select:focus,
textarea:focus {
    outline: none !important;
    box-shadow: none !important;
}

.zirmajmoeCss {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.zirspanCss {
    color: #ffffff;
    background-color: #0d6efdc4;
    padding: 7px;
    border-radius: 9px;
    font-size: 17px;
    font-weight: 700;
}

.listandeditCss {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

@media (max-width: 754px) {
    .modal-dialog {
            max-width: 95%;
            padding-right: 52px;
    }
}
</style>
