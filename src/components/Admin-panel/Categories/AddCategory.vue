<template>
    <h1 class="TextCssH">ایجاد دسته بندی جدید</h1>
    <div class="col-12 d-flex" style="justify-content: center;">
        <div class="box col-11 col-xl-10">

            <div id="app" class="container mt-5">


                <form @submit.prevent="createCategory" class="mb-4" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="name" class="form-label">نام دسته‌بندی:</label>
                        <input v-model="form.name" id="name" type="text" class="form-control" required />
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">توضیحات:</label>
                        <textarea v-model="form.description" id="description" class="form-control"></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="parent" class="form-label">دسته‌بندی والد:</label>
                        <select id="parent" class="form-select" v-model="form.parent">
                            <option value="">بدون والد</option>
                            <!-- نمایش دسته‌بندی‌های اصلی -->
                            <option v-for="category in categories" :key="category._id" :value="category._id">
                                {{ category.name }}
                            </option>

                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="image" class="form-label">انتخاب تصویر:</label>
                        <input type="file" @change="handleFileChange" class="form-control" />
                    </div>

                    <button type="submit" class="btn btnCss w-100">ایجاد دسته‌بندی</button>
                </form>


            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {


    data() {
        return {
            form: {
                name: "",
                description: "",
                parent: "",
                image: null, // برای ذخیره تصویر
            },
            categories: [],

            
        };
    },
    created() {
     this.getCategories()   
    },
    methods: {

        async createCategory() {
            const formData = new FormData();
            formData.append("name", this.form.name);
            formData.append("description", this.form.description);
            formData.append("parent", this.form.parent);
            if (this.form.image) {
                formData.append("image", this.form.image);
            }

            try {
                const response = await axios.post("http://localhost:5000/api/categories", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("دسته‌بندی با موفقیت ایجاد شد.");
                this.form = { name: "", description: "", parent: "", image: null };

                // بارگذاری مجدد داده‌ها بعد از ارسال پست
                await this.getCategories();
            } catch (error) {
                console.error("خطا در ایجاد دسته‌بندی:", error);
            }
        },

     async getCategories() {
         const response = await axios.get('http://localhost:5000/api/categories')

         try {
             this.categories = response.data   
            //  ریختن دیتا داخل دسته بندی
            
         }
         catch (error) {
             { console.error("خطا در دریافت دسته بندی", error);  }
         }
        },

        handleFileChange(event) {
            this.form.image = event.target.files[0]; // ذخیره فایل انتخابی
        },

       
       
    }
};
</script>

<style scoped>
.box {
    box-shadow: 0 3px 20px #4b7bec7d;
}

.TextCssH {
    box-shadow: 0 0px 8px #4b7bec7d;
}
.categoryshowCss {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-right: 60px;
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
.childsCss{
        display: flex;
            flex-wrap: wrap;
            flex-direction: row;
                justify-content: space-evenly;
                    gap: 5px;
}
.childsboxCss{
    border-radius: 15px;
}
.btnCss{
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
.zirmajmoeCss{
        display: flex;
            flex-direction: column;
            align-items: center;
}
.zirspanCss{
        color: #ffffff;
            background-color: #0d6efdc4;
            padding: 7px;
            border-radius: 9px;
            font-size: 17px;
            font-weight: 700;
}
.listandeditCss{
        display: flex;
            flex-direction: row;
            flex-wrap: wrap;
}
</style>
