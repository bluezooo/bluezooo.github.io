const { createApp } = Vue;

createApp({
    data() {
        return {
            product: null,
            showCart: false,
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            breadcrumbs: [],
            categories: [
                { id: 'electronics', name: 'Electronics' },
                { id: 'fashion', name: 'Fashion' },
                { id: 'home', name: 'Home & Garden' },
                { id: 'sports', name: 'Sports' }
            ]
        }
    },
    computed: {
        cartTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
        },
        cartItemCount() {
            return this.cart.reduce((count, item) => count + item.quantity, 0);
        }
    },
    methods: {
        loadProduct() {
            const params = new URLSearchParams(window.location.search);
            const productId = parseInt(params.get('id'));
            this.product = products.find(p => p.id === productId);
            
            if(this.product) {
                this.breadcrumbs = [
                    { 
                        name: this.getCategoryName(this.product.categories[0]), 
                        link: `index.html?category=${this.product.categories[0]}`
                    },
                    { name: this.product.name, link: '#' }
                ];
            }
        },


        addToCart(product) {
            const existing = this.cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.cart.push({...product, quantity: 1});
            }
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        removeFromCart(index) {
            this.cart.splice(index, 1); // Remove item from cart
            this.saveCart();
        },
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : categoryId;
        },
        clearCart() {
            this.cart = [];
            this.saveCart();
        },
        checkout() {
            window.location.href = 'checkout.html';
        },

        filterByCategory(categoryId) {
            window.location.href = `index.html?category=${categoryId}`;
        },

    },
    mounted() {
        this.loadProduct();
    }
}).mount('#app');