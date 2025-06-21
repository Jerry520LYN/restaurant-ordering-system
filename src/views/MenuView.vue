<template>
    <MenuLayout>
        <template #hot-dishes-container>
            <div class="mb-8">
                <MenuCardLayout/>
            </div>
        </template>
        <template #menu-form-container>
            <MenuForm />
        </template>
    </MenuLayout>
</template>


<script>
import MenuLayout from '@/components/menu/MenuLayout.vue'
import MenuForm from '@/components/menu/MenuForm.vue'
import MenuCardLayout from '@/components/menu/MenuCardLayout.vue';

export default {
    components: {
        MenuLayout,
        MenuForm,
        MenuCardLayout
    }
}
</script>