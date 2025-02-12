const CartComponent = {
    template: `
        <div class="cart-overlay" v-if="show">
            <div class="cart-container">
                <div class="cart-header">
                    <h3>Your Cart ({{ itemCount }})</h3>
                    <button @click="$emit('close')" class="close-btn">&times;</button>
                </div>
                
                <div class="cart-items">
                    <div v-for="item in cart" :key="item.id" class="cart-item">
                        <img :src="item.image" :alt="item.name">
                        <div class="item-details">
                            <h4>{{ item.name }}</h4>
                            <p>{{ item.price | currency }} x {{ item.quantity }}</p>
                        </div>
                        <button @click="$emit('remove-item', item.id)" class="remove-btn">Remove</button>
                    </div>
                </div>

                <div class="cart-footer">
                    <div class="total">Total: {{ total | currency }}</div>
                    <button @click="$emit('checkout')" class="checkout-btn">Checkout</button>
                </div>
            </div>
        </div>
    `,
    props: {
        cart: {
            type: Array,
            required: true
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        total() {
            return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        itemCount() {
            return this.cart.reduce((count, item) => count + item.quantity, 0);
        }
    },
    filters: {
        currency(value) {
            return `$${value.toFixed(2)}`;
        }
    }
};

export default CartComponent;
