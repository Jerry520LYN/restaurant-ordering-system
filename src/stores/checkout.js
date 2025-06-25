// stores/checkout.js
import { defineStore } from 'pinia';
import {
  createOrder,
  addDishToOrder,
  removeDishFromOrder,
  updateDishQuantity as apiUpdateDishQuantity,
  checkoutOrder,
  getOrderById,
  getOrderIdWithDishId,
  getOrderDetails,
  getAllOrdersWithDetails,
  getPopularDishes,
  getRevenue
} from '@/api/checkout';
import { updateOrder as apiUpdateOrder } from '@/api/order';

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    currentOrder: null,
    orderDetails: null,
    allOrders: [],
    popularDishes: [],
    revenueStats: null,
    loading: false,
    error: null
  }),

  actions: {
    // Create a new order
    async createNewOrder({ tableId, customerId, peopleCount }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await createOrder({ tableId, customerId, peopleCount });
        this.currentOrder = response.data;
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Add dish to order
    async addDish(orderId, dishId, quantity = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await addDishToOrder({ orderId, dishId, quantity });
        if (this.currentOrder?.orderId === orderId) {
          // Update current order dishes
          const existingDish = this.currentOrder.dishes?.find(d => d.dishId === dishId);
          if (existingDish) {
            existingDish.quantity += quantity;
          } else {
            this.currentOrder.dishes = [...(this.currentOrder.dishes || []), { dishId, quantity }];
          }
        }
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Remove dish from order
    async removeDish(orderId, dishId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await removeDishFromOrder({ orderId, dishId });
        if (this.currentOrder?.orderId === orderId) {
          this.currentOrder.dishes = this.currentOrder.dishes?.filter(d => d.dishId !== dishId);
        }
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Update dish quantity
    async updateDishQuantity(orderId, dishId, quantity) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiUpdateDishQuantity({ orderId, dishId, quantity });
        if (this.currentOrder?.orderId === orderId) {
          const dish = this.currentOrder.dishes?.find(d => d.dishId === dishId);
          if (dish) {
            dish.quantity = quantity;
          }
        }
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Checkout order
    async checkout(orderId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await checkoutOrder(orderId);
        if (this.currentOrder?.orderId === orderId) {
          this.currentOrder.status = 'completed';
        }
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Get order by ID
    async getOrderById(orderId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getOrderById(orderId);
        this.currentOrder = response.data;
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Get order by table ID
    async getOrderByTableId(tableId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getOrderIdWithDishId(tableId);
        this.currentOrder = response.data;
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Get order details
    async getOrderDetails(orderId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getOrderDetails(orderId);
        this.orderDetails = response.data;
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Get all orders with details
    async fetchAllOrdersWithDetails() {
      this.loading = true;
      this.error = null;
      try {
        const response = await getAllOrdersWithDetails();
        this.allOrders = response.data;
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Get popular dishes
    async fetchPopularDishes(startTime, endTime) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getPopularDishes(startTime, endTime);
        this.popularDishes = response.data;
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Get revenue statistics
    async fetchRevenue(startTime, endTime) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getRevenue(startTime, endTime);
        this.revenueStats = response.data;
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Clear current order
    clearCurrentOrder() {
      this.currentOrder = null;
    },

    // Update order
    async updateOrder(orderData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiUpdateOrder(orderData);
        // 如果更新的是当前订单，则刷新当前订单信息
        if (this.currentOrder?.orderId === orderData.orderId) {
          await this.getOrderById(orderData.orderId);
        }
        return response;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },

  getters: {
    // Getter for current order dishes
    currentOrderDishes: (state) => {
      return state.currentOrder?.dishes || [];
    },

    // Getter for order status
    isOrderCompleted: (state) => {
      return state.currentOrder?.status === 'completed';
    }
  }
});