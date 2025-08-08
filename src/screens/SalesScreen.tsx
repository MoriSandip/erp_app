import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    category: string;
    inStock: boolean;
}

interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
}

interface Order {
    id: string;
    customerId: string;
    customerName: string;
    orderNumber: string;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    date: string;
    items: OrderItem[];
}

const SalesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [showCreateOrder, setShowCreateOrder] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<OrderItem[]>([]);

    const [customers] = useState<Customer[]>([
        { id: '1', name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0123', address: '123 Main St, City, State' },
        { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '+1-555-0124', address: '456 Oak Ave, City, State' },
        { id: '3', name: 'Mike Davis', email: 'mike.davis@email.com', phone: '+1-555-0125', address: '789 Pine Rd, City, State' },
        { id: '4', name: 'Lisa Wilson', email: 'lisa.wilson@email.com', phone: '+1-555-0126', address: '321 Elm St, City, State' },
        { id: '5', name: 'David Brown', email: 'david.brown@email.com', phone: '+1-555-0127', address: '654 Maple Dr, City, State' },
    ]);

    const [products] = useState<Product[]>([
        { id: '1', name: 'Laptop Dell XPS 13', sku: 'LAP-DELL-XPS13', price: 1299.99, category: 'Electronics', inStock: true },
        { id: '2', name: 'iPhone 15 Pro', sku: 'PHN-IPHONE-15PRO', price: 999.99, category: 'Electronics', inStock: true },
        { id: '3', name: 'Office Chair', sku: 'FUR-CHAIR-OFFICE', price: 299.99, category: 'Furniture', inStock: true },
        { id: '4', name: 'Printer HP LaserJet', sku: 'ELC-PRINT-HP-LJ', price: 199.99, category: 'Electronics', inStock: false },
        { id: '5', name: 'Desk Lamp', sku: 'FUR-LAMP-DESK', price: 49.99, category: 'Furniture', inStock: true },
        { id: '6', name: 'Wireless Mouse', sku: 'ELC-MOUSE-WIRELESS', price: 29.99, category: 'Electronics', inStock: true },
        { id: '7', name: 'Coffee Machine', sku: 'APP-COFFEE-MACHINE', price: 399.99, category: 'Appliances', inStock: true },
        { id: '8', name: 'Monitor 27"', sku: 'ELC-MONITOR-27', price: 299.99, category: 'Electronics', inStock: true },
    ]);

    const [orders, setOrders] = useState<Order[]>([
        {
            id: '1',
            customerId: '1',
            customerName: 'John Smith',
            orderNumber: 'ORD-001',
            total: 1299.99,
            status: 'Delivered',
            date: '2024-01-15',
            items: [
                { productId: '1', productName: 'Laptop Dell XPS 13', quantity: 1, price: 1299.99, total: 1299.99 }
            ]
        },
        {
            id: '2',
            customerId: '2',
            customerName: 'Sarah Johnson',
            orderNumber: 'ORD-002',
            total: 599.99,
            status: 'Shipped',
            date: '2024-01-16',
            items: [
                { productId: '2', productName: 'iPhone 15 Pro', quantity: 1, price: 999.99, total: 999.99 }
            ]
        },
        {
            id: '3',
            customerId: '3',
            customerName: 'Mike Davis',
            orderNumber: 'ORD-003',
            total: 899.99,
            status: 'Processing',
            date: '2024-01-17',
            items: [
                { productId: '3', productName: 'Office Chair', quantity: 2, price: 299.99, total: 599.98 },
                { productId: '5', productName: 'Desk Lamp', quantity: 1, price: 49.99, total: 49.99 }
            ]
        },
    ]);

    const filters = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return '#FF9800';
            case 'Processing': return '#2196F3';
            case 'Shipped': return '#9C27B0';
            case 'Delivered': return '#4CAF50';
            case 'Cancelled': return '#F44336';
            default: return '#757575';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'All' || order.status === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const handleCreateOrder = () => {
        setShowCreateOrder(true);
    };

    const handleViewOrder = (order: Order) => {
        Alert.alert(
            'Order Details',
            `Order: ${order.orderNumber}\nCustomer: ${order.customerName}\nTotal: $${order.total.toFixed(2)}\nItems: ${order.items.length}`,
            [
                { text: 'Close', style: 'cancel' },
                {
                    text: 'Edit Order', onPress: () => {
                        Alert.alert('Edit Order', `Edit ${order.orderNumber} functionality would go here`);
                    }
                }
            ]
        );
    };

    const handleSelectCustomer = () => {
        Alert.alert(
            '🧍‍♂️ Choose Customer',
            'Select a customer for this order:',
            [
                ...customers.map(customer => ({
                    text: customer.name,
                    onPress: () => {
                        setSelectedCustomer(customer);
                        Alert.alert('Customer Selected', `${customer.name} selected for this order`);
                    }
                })),
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const handleSelectProducts = () => {
        Alert.alert(
            '📦 Select Products',
            'Choose products for this order:',
            [
                ...products.filter(product => product.inStock).map(product => ({
                    text: `${product.name} - $${product.price.toFixed(2)}`,
                    onPress: () => {
                        const newItem: OrderItem = {
                            productId: product.id,
                            productName: product.name,
                            quantity: 1,
                            price: product.price,
                            total: product.price
                        };
                        setSelectedProducts([...selectedProducts, newItem]);
                        Alert.alert('Product Added', `${product.name} added to order`);
                    }
                })),
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((sum, item) => sum + item.total, 0);
    };

    const handlePlaceOrder = () => {
        if (!selectedCustomer) {
            Alert.alert('Error', 'Please select a customer first');
            return;
        }
        if (selectedProducts.length === 0) {
            Alert.alert('Error', 'Please select at least one product');
            return;
        }

        const newOrder: Order = {
            id: (orders.length + 1).toString(),
            customerId: selectedCustomer.id,
            customerName: selectedCustomer.name,
            orderNumber: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
            total: calculateTotal(),
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
            items: selectedProducts
        };

        setOrders([...orders, newOrder]);
        setSelectedCustomer(null);
        setSelectedProducts([]);
        setShowCreateOrder(false);
        Alert.alert('Order Created', `Order ${newOrder.orderNumber} has been created successfully!`);
    };

    const renderOrderItem = ({ item }: { item: Order }) => (
        <TouchableOpacity style={styles.orderCard} onPress={() => handleViewOrder(item)}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.customerName}>{item.customerName}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <View style={styles.orderFooter}>
                <Text style={styles.itemsCount}>{item.items.length} items</Text>
                <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    const totalRevenue = orders
        .filter(order => order.status === 'Delivered')
        .reduce((sum, order) => sum + order.total, 0);

    const pendingOrders = orders.filter(order => order.status === 'Pending').length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sales & Orders</Text>
                <TouchableOpacity style={styles.addBtn} onPress={handleCreateOrder}>
                    <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Quick Stats */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
                    <View style={[styles.statCard, { borderLeftColor: '#4CAF50' }]}>
                        <Text style={[styles.statValue, { color: '#4CAF50' }]}>${totalRevenue.toFixed(2)}</Text>
                        <Text style={styles.statLabel}>Total Revenue</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#2196F3' }]}>
                        <Text style={[styles.statValue, { color: '#2196F3' }]}>{orders.length}</Text>
                        <Text style={styles.statLabel}>Total Orders</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#FF9800' }]}>
                        <Text style={[styles.statValue, { color: '#FF9800' }]}>{pendingOrders}</Text>
                        <Text style={styles.statLabel}>Pending</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#9C27B0' }]}>
                        <Text style={[styles.statValue, { color: '#9C27B0' }]}>{orders.filter(order => order.status === 'Shipped').length}</Text>
                        <Text style={styles.statLabel}>Shipped</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#F44336' }]}>
                        <Text style={[styles.statValue, { color: '#F44336' }]}>{orders.filter(order => order.status === 'Cancelled').length}</Text>
                        <Text style={styles.statLabel}>Cancelled</Text>
                    </View>
                </ScrollView>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Filter Tabs */}
                <View style={styles.filterContainer}>
                    <FlatList
                        data={filters}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.filterTab,
                                    selectedFilter === item && styles.filterTabActive
                                ]}
                                onPress={() => setSelectedFilter(item)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    selectedFilter === item && styles.filterTextActive
                                ]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item}
                        scrollEnabled={false}
                    />
                </View>

                {/* Create Order Section */}
                {showCreateOrder && (
                    <View style={styles.createOrderContainer}>
                        <Text style={styles.createOrderTitle}>🧾 Create New Order</Text>

                        {/* Customer Selection */}
                        <TouchableOpacity style={styles.selectionCard} onPress={handleSelectCustomer}>
                            <Text style={styles.selectionLabel}>🧍‍♂️ Customer</Text>
                            <Text style={styles.selectionValue}>
                                {selectedCustomer ? selectedCustomer.name : 'Select Customer'}
                            </Text>
                        </TouchableOpacity>

                        {/* Product Selection */}
                        <TouchableOpacity style={styles.selectionCard} onPress={handleSelectProducts}>
                            <Text style={styles.selectionLabel}>📦 Products</Text>
                            <Text style={styles.selectionValue}>
                                {selectedProducts.length > 0 ? `${selectedProducts.length} items selected` : 'Select Products'}
                            </Text>
                        </TouchableOpacity>

                        {/* Selected Products List */}
                        {selectedProducts.length > 0 && (
                            <View style={styles.selectedProductsContainer}>
                                <Text style={styles.selectedProductsTitle}>Selected Items:</Text>
                                {selectedProducts.map((item, index) => (
                                    <View key={index} style={styles.selectedProductItem}>
                                        <Text style={styles.productName}>{item.productName}</Text>
                                        <Text style={styles.productDetails}>
                                            Qty: {item.quantity} × ${item.price.toFixed(2)} = ${item.total.toFixed(2)}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Total Calculation */}
                        {selectedProducts.length > 0 && (
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalLabel}>💰 Total:</Text>
                                <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
                            </View>
                        )}

                        {/* Action Buttons */}
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setShowCreateOrder(false);
                                    setSelectedCustomer(null);
                                    setSelectedProducts([]);
                                }}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.placeOrderButton}
                                onPress={handlePlaceOrder}
                            >
                                <Text style={styles.placeOrderButtonText}>Place Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Orders List */}
                <FlatList
                    data={filteredOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />

                {/* Bottom spacing for better scroll experience */}
                <View style={styles.bottomSpacing} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backBtn: {
        padding: 0,
    },
    backIcon: {
        fontSize: 22,
        color: '#222',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },
    addBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#673AB7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    statsContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    statCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginRight: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        minWidth: 100,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 48,
        borderColor: '#d8d6d6ff',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        marginHorizontal: 2
    },
    filterContainer: {
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    filterTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    filterTabActive: {
        backgroundColor: '#673AB7',
    },
    filterText: {
        fontSize: 14,
        color: '#666',
    },
    filterTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
    listContainer: {
        padding: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    customerName: {
        fontSize: 14,
        color: '#666',
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemsCount: {
        fontSize: 14,
        color: '#666',
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAF50',
    },
    // Create Order Styles
    createOrderContainer: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    createOrderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 16,
        textAlign: 'center',
    },
    selectionCard: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
        marginBottom: 4,
    },
    selectionValue: {
        fontSize: 16,
        color: '#666',
    },
    selectedProductsContainer: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    selectedProductsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    selectedProductItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    productName: {
        fontSize: 14,
        color: '#222',
        flex: 1,
    },
    productDetails: {
        fontSize: 12,
        color: '#666',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    cancelButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        marginRight: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    placeOrderButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
        marginLeft: 8,
        alignItems: 'center',
    },
    placeOrderButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    bottomSpacing: {
        height: 20,
    },
});

export default SalesScreen; 