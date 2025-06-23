<template>
    <div class="customer-view">
      <CustomerLayout>
        <template #customer-list-container>
          <CustomerForm />
        </template>
        <template #Vip-customer-form-container>
          <div class="mt-8">
          <VipCustomerForm />
          </div>
        </template>
      </CustomerLayout>
    </div>
</template>

<script>
import CustomerLayout from "../components/customer/CustomerLayout.vue";
import CustomerForm from "../components/customer/CustomerForm.vue";
import VipCustomerForm from "../components/customer/VipCustomerForm.vue";

export default {
  components: { CustomerLayout, CustomerForm, VipCustomerForm },
};
</script>