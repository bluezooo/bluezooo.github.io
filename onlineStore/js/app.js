

const { createApp } = Vue;

const mainApp = {
    data() {
        return {
            currentView: 'home',
            breadcrumbs: [],
            showCart: false,
            categories: [
                { id: 'electronics', name: 'Electronics' },
                { id: 'fashion', name: 'Fashion' },
                { id: 'home', name: 'Home & Garden' },
                { id: 'sports', name: 'Sports' }
            ],
            products: products,
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            selectedCategory: null,
            searchQuery: '',
            sortField: 'name',
            sortDirection: 'asc'
        }
    },
    computed: {
        cartTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
        },
        cartItemCount() {
            return this.cart.reduce((count, item) => count + item.quantity, 0);
        },
        filteredProducts() {
            if (!this.selectedCategory) return this.products;
            return this.products.filter(p => 
                p.categories.includes(this.selectedCategory)
            );
        }
    },
    methods: {
        viewProduct(product) {
            window.location.href = `product.html?id=${product.id}`;
        },


        addToCart(product) {
            const existing = this.cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.cart.push({
                    ...product,
                    quantity: 1
                });
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



        filterByCategory(categoryId) {
            this.selectedCategory = categoryId;
            this.updateBreadcrumbs();
            window.history.replaceState(null, '', `?category=${categoryId}`);
        },

        updateBreadcrumbs() {
            if (this.selectedCategory) {
                this.breadcrumbs = [{
                    name: this.getCategoryName(this.selectedCategory),
                    link: `#`
                }];
            } else {
                this.breadcrumbs = [];
            }
        },
        
        loadCategoryFromURL() {
            const params = new URLSearchParams(window.location.search);
            const category = params.get('category');
            if (category) this.selectedCategory = category;
        }
    },
    mounted() {
        this.loadCategoryFromURL();
        this.updateBreadcrumbs();
    }
};

createApp(mainApp).mount('#app');
