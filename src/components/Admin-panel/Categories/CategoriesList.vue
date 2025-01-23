<template>
    <h1 class="TextCssH">برگه لیست دسته ها</h1>

    <div class="col-12 d-flex " style="justify-content: center;">


        <div class="box col-11 col-xl-10" ref="notification">
            <div id="app" class="container mt-5">


                <!-- بررسی وجود دسته‌بندی‌ها -->
                <div v-if="categories.length" class="card mb-3">
                    <div class="card-header bg-primary text-white">
                        <h2 class="card-title h5 mb-0">لیست دسته‌بندی‌ها</h2>
                    </div>

                    <ul class="list-group list-group-flush">
                        <!-- حلقه نمایش دسته‌بندی‌ها -->
                        <li v-for="category in categories" :key="category._id"
                            class="list-group-item  StyleResponsiveCss">
                            <!-- تصویر دسته‌بندی -->
                            <img v-if="category.image" :src="'http://localhost:5000' + category.image"
                                alt="Category Image" class="mt-2 rounded" width="100" />

                            <!-- اطلاعات دسته‌بندی -->
                            <div class="categoryshowCss">
                                <div class="categoryNameCss">نام دسته‌بندی: {{ category.name }}</div>
                                <div class="categorydiscriptionCss">
                                    توضیحات دسته‌بندی: {{ category.description || 'بدون توضیحات' }}
                                </div>
                                <span v-if="category.parent" class="text-muted">
                                    (والد: {{ getParentName(category.parent) }})
                                </span>
                            </div>

                            <!-- نمایش زیرمجموعه‌ها -->
                            <div v-if="getSubcategories(category._id).length" class="zirmajmoeCss">
                                <span class="zirspanCss">زیرمجموعه‌ها:</span>
                                <ul class="list-group mt-2 childsCss">
                                    <li v-for="subCategory in getSubcategories(category._id)" :key="subCategory._id"
                                        class="list-group-item childsboxCss">
                                        <div class="subcategoryIndent">
                                            <img v-if="subCategory.image"
                                                :src="'http://localhost:5000' + subCategory.image" alt="Category Image"
                                                class="mt-2 rounded" width="100" />
                                            <div class="subcategoryNameCss">{{ subCategory.name }}</div>
                                            <div class="subcategoryDescriptionCss">
                                                {{ subCategory.description || 'بدون توضیحات' }}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            categories: [],
        };
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        // دریافت دسته‌بندی‌ها از سرور
        async fetchCategories() {
            try {
                const response = await axios.get("http://localhost:5000/api/categories");
                console.log("داده‌های دریافت‌شده:", response.data);
                this.categories = response.data;
            } catch (error) {
                console.error("دریافت داده از سرور با خطا مواجه شد:", error);
            }
        },

        // دریافت نام والد بر اساس ID
        getParentName(parentId) {
            const parent = this.categories.find((category) => category._id === parentId);
            return parent ? parent.name : "ناشناس";
        },

        // دریافت زیرمجموعه‌های یک دسته‌بندی
        getSubcategories(categoryId) {
            console.log(categoryId);
            
            const category = this.categories.find(cat => cat._id === categoryId);
            if (category && category.children) {
                return category.children; // دسترسی مستقیم به زیرمجموعه‌ها
            }
            return []; // در صورت عدم وجود زیرمجموعه
        },
    },
};
</script>

<style scoped>
.StyleResponsiveCss{
    display: flex !important;
        align-items: center;
        flex-direction: column;
        justify-content: center;
}

.box {
    box-shadow: 0 3px 20px #a55eea7d;
}

.TextCssH {
    box-shadow: 0 0px 8px #a55eea7d;
}
/* استایل دلخواه خود را اینجا اضافه کنید */
.categoryshowCss {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 5px;
}

.categoryNameCss {
    background-color: #fd9644;
    font-size: 20px;
    padding: 8px;
    border-radius: 8px;
    color: #ffffff;
    font-weight: 200;
        margin-top: 10px;
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
    margin: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    /* فاصله دادن به زیرمجموعه‌ها */
    align-items: center;
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
        padding: 0;
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
    margin-top: 10px;
}

.listandeditCss {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
