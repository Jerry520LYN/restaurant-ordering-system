import {defineStore} from 'pinia';
import {getCustomerList} from '@/api/customer';
import { addCustomer, deleteCustomer, updateCustomer } from '@/api/customer';

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customerList: [],
        vipCustomerList: [],
        error: null
    }),
    actions: {
        async fetchCustomerList() {
            try {
                const response = await getCustomerList();
                this.customerList = response || [];
            } catch (error) {
                console.error('fetchCustomerList - 错误:', error);
                this.error = error;
            }
        },
        async addCustomer(customerData) {
            try {
                const response = await addCustomer(customerData);
                await this.fetchCustomerList();
                return response;
            } catch (error) {
                console.error('addCustomer - 错误:', error);
                this.error = error;
            }
        },
        async deleteCustomer(phone) {
            try {
                const response = await deleteCustomer(phone);
                await this.fetchCustomerList();
                return response;
            } catch (error) {
                console.error('deleteCustomer - 错误:', error);
                this.error = error;
            }
        },
        async updateCustomer(customerData) {
            try {
                const response = await updateCustomer(customerData);
                await this.fetchCustomerList();
                return response;
            } catch (error) {
                console.error('updateCustomer - 错误:', error);
                this.error = error;
            }
        }
    }
});
