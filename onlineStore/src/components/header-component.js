// Header component with cart functionality
const HeaderComponent = {
    template: `
        <header>
            <nav class="main-nav">
                <a href="index.html" class="logo">Shop</a>
                <div class="categories-dropdown">
                    <select v-model="selectedCategory" @change="selectCategory" class="category-select">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="cart-wrapper" @mouseover="showCart = true" @mouseleave="showCart = false">
                    <button class="cart-icon">
                        🛒 {{ cartTotal }}
                        <span class="cart-badge">{{ cartItemCount }}</span>
                    </button>
                    <div class="shopping-cart" v-show="showCart">
                        <div class="cart-items">
                            <div v-for="(item, index) in cart" :key="index" class="cart-item">
                                <img :src="item.thumbnail" class="cart-item-thumb" alt="Product Thumbnail">
                                <div class="cart-item-details">
                                    <span class="cart-item-name">{{ item.name }}</span>
                                    <div class="cart-item-quantity">
                                        <label for="quantity">Qty:</label>
                                        <input 
                                            type="number" 
                                            v-model.number="item.quantity" 
                                            min="1" 
                                            @change="$emit('save-cart')"
                                            class="quantity-input"
                                        >
                                    </div>
                                    <div class="cart-item-prices">
                                        <span class="cart-item-price">\${{ item.price.toFixed(2) }} each</span>
                                        <span class="cart-item-total">\${{ (item.price * item.quantity).toFixed(2) }}</span>
                                    </div>
                                </div>
                                <button @click="$emit('remove-from-cart', index)" class="remove-btn">×</button>
                            </div>
                        </div>
                        <div class="cart-total">
                            <span>Total:</span>
                            <span>${{ cartTotal }}</span>
                        </div>
                        <button 
                            class="clear-btn" 
                            @click="$emit('clear-cart')"
                            :disabled="cart.length === 0"
                        >
                            Clear All
                        </button>
                        <button 
                            class="checkout-btn" 
                            @click="$emit('checkout')"
                            :disabled="cart.length === 0"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    `,
    props: {
        cart: {
            type: Array,
            required: true
        },
        cartTotal: {
            type: Number,
            required: true
        },
        cartItemCount: {
            type: Number,
            required: true
        },
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showCart: false,
            selectedCategory: null
        }
    },
    methods: {
        selectCategory() {
            this.$emit('category-selected', this.selectedCategory);
        }
    }
};

export default HeaderComponent;
