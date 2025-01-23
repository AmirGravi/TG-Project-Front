
<template>
  


  <router-view></router-view>

</template>

<style >
body {
  font-family: Vazirmatn, sans-serif !important;
}
</style>




<script>

export default {

  mounted() {
    if (!localStorage.getItem('isAuthenticated')) {
      localStorage.setItem('isAuthenticated', 'false'); // تنظیم مقدار پیش‌فرض
    }
    console.log(localStorage.getItem('isAuthenticated')); // برای دیباگ
  }
}

</script>
