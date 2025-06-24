<template>
  <CallingnumberLayout>
    <template #CallingCard>
      <CallingnumberCard />
    </template>
    <template #CallingList>
      <CalledForm />
    </template>
    <template #CallingHistory>
      <CallingnumberForm />
    </template>
  </CallingnumberLayout>
</template> 

<script setup>
import CallingnumberLayout from '@/components/callingnumber/CallingnumberLayout.vue'
import CallingnumberForm from '@/components/callingnumber/CallingnumberForm.vue'
import CalledForm from '@/components/callingnumber/CalledForm.vue'
import CallingnumberCard from '@/components/callingnumber/CallnumberCard.vue'
</script>