import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    price: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const InventoryScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loader for 2.5 seconds when component mounts
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
        { id: '1', name: 'Laptop Dell XPS 13', sku: 'LAP-DELL-XPS13', category: 'Electronics', quantity: 15, price: 1299.99, status: 'In Stock' },
        { id: '2', name: 'iPhone 15 Pro', sku: 'PHN-IPHONE-15PRO', category: 'Electronics', quantity: 8, price: 999.99, status: 'In Stock' },
        { id: '3', name: 'Office Chair', sku: 'FUR-CHAIR-OFFICE', category: 'Furniture', quantity: 3, price: 299.99, status: 'Low Stock' },
        { id: '4', name: 'Printer HP LaserJet', sku: 'ELC-PRINT-HP-LJ', category: 'Electronics', quantity: 0, price: 199.99, status: 'Out of Stock' },
        { id: '5', name: 'Desk Lamp', sku: 'FUR-LAMP-DESK', category: 'Furniture', quantity: 25, price: 49.99, status: 'In Stock' },
        { id: '6', name: 'Wireless Mouse', sku: 'ELC-MOUSE-WIRELESS', category: 'Electronics', quantity: 12, price: 29.99, status: 'In Stock' },
        { id: '7', name: 'Coffee Machine', sku: 'APP-COFFEE-MACHINE', category: 'Appliances', quantity: 2, price: 399.99, status: 'Low Stock' },
        { id: '8', name: 'Monitor 27"', sku: 'ELC-MONITOR-27', category: 'Electronics', quantity: 6, price: 299.99, status: 'In Stock' },
    ]);

    const filters = ['All', 'Electronics', 'Furniture', 'Appliances'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Stock': return '#4CAF50';
            case 'Low Stock': return '#FF9800';
            case 'Out of Stock': return '#F44336';
            default: return '#757575';
        }
    };

    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'All' || item.category === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const handleAddItem = () => {
        Alert.alert(
            'Add New Item',
            'Add new inventory item functionality would go here',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Add Item',
                    onPress: () => {
                        // This would typically open a modal or navigate to an add item screen
                        Alert.alert('Success', 'Add item form would open here');
                    }
                }
            ]
        );
    };

    const handleEditItem = (item: InventoryItem) => {
        Alert.alert(
            'Edit Item',
            `Edit ${item.name}`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Edit', onPress: () => {
                        Alert.alert('Edit', `Edit form for ${item.name} would open here`);
                    }
                },
                { text: 'Delete', style: 'destructive', onPress: () => handleDeleteItem(item) }
            ]
        );
    };

    const handleDeleteItem = (item: InventoryItem) => {
        Alert.alert(
            'Delete Item',
            `Are you sure you want to delete "${item.name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setInventoryItems(prevItems => prevItems.filter(i => i.id !== item.id));
                        Alert.alert('Deleted', `${item.name} has been removed from inventory`);
                    }
                }
            ]
        );
    };

    const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
        <TouchableOpacity style={styles.itemCard} onPress={() => handleEditItem(item)}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.itemSku}>
                <Text style={styles.skuText}>SKU: {item.sku}</Text>
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Inventory Management</Text>
                <TouchableOpacity style={styles.addBtn} onPress={handleAddItem}>
                    <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#673AB7" />
                    <Text style={styles.loaderText}>Loading inventory data...</Text>
                </View>
            ) : (
                <>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search inventory..."
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
                        />
                    </View>

                    {/* Inventory List */}
                    <FlatList
                        data={filteredItems}
                        renderItem={renderInventoryItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />

                    {/* Summary Card */}
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>📦 Inventory Summary</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total Items:</Text>
                            <Text style={styles.summaryValue}>{inventoryItems.length}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>In Stock:</Text>
                            <Text style={styles.summaryValue}>
                                {inventoryItems.filter(item => item.status === 'In Stock').length}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Low Stock:</Text>
                            <Text style={styles.summaryValue}>
                                {inventoryItems.filter(item => item.status === 'Low Stock').length}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Out of Stock:</Text>
                            <Text style={styles.summaryValue}>
                                {inventoryItems.filter(item => item.status === 'Out of Stock').length}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total Value:</Text>
                            <Text style={styles.summaryValue}>
                                ${inventoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </>
            )}
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loaderText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    searchContainer: {
        padding: 8,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 48,
        borderWidth: 1,
        borderColor: '#d8d6d6ff',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginHorizontal: 12
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
    itemCard: {
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
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        flex: 1,
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
    itemSku: {
        marginBottom: 8,
    },
    skuText: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'monospace',
    },
    itemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemCategory: {
        fontSize: 14,
        color: '#666',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2196F3',
    },
    summaryCard: {
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
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
});

export default InventoryScreen; 