<template>
    <div>
        <main>
            <slot name="CallingCard">
            </slot>
        </main>
        <div class="flex-1 gap-4 w-full">
            <div>
                <slot name="CallingList">
                </slot>
            </div>
            <div>
                <slot name="CallingHistory">
                </slot>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>