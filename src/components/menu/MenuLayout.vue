<template>
    <div class="menu-layout">
        <main>
            <slot name="hot-dishes-container">
                <!-- 默认内容，当没有提供插槽内容时显示 -->
            </slot>
        </main>
        <main>
            <slot name="menu-form-container">
                <!-- 默认内容，当没有提供插槽内容时显示 -->
            </slot>
        </main>
    </div>
</template>

<script>
export default {
    name: "MenuLayout"
}
</script>