import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dummyOrders = [
    { id: '1', orderNo: 'ORD-1001', retailer: 'ABC Mart', date: '2024-06-01', status: 'Pending', amount: 1200 },
    { id: '2', orderNo: 'ORD-1002', retailer: 'Super Store', date: '2024-06-02', status: 'Completed', amount: 850 },
    { id: '3', orderNo: 'ORD-1003', retailer: 'QuickShop', date: '2024-06-03', status: 'Pending', amount: 430 },
    { id: '4', orderNo: 'ORD-1004', retailer: 'Retail Hub', date: '2024-06-04', status: 'Cancelled', amount: 0 },
    { id: '5', orderNo: 'ORD-1005', retailer: 'City Mart', date: '2024-06-05', status: 'Completed', amount: 2100 },
    { id: '6', orderNo: 'ORD-1006', retailer: 'Mega Mart', date: '2024-06-06', status: 'Pending', amount: 670 },
    { id: '7', orderNo: 'ORD-1007', retailer: 'ShopEase', date: '2024-06-07', status: 'Completed', amount: 990 },
    { id: '8', orderNo: 'ORD-1008', retailer: 'Value Store', date: '2024-06-08', status: 'Pending', amount: 540 },
];

const statusColors: { [key: string]: string } = {
    Pending: '#f5a623',
    Completed: '#4caf50',
    Cancelled: '#e94e77',
};

const RetailerOrderScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const openModal = (order: any) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Retailer Orders</Text>
                <View style={{ width: 40 }} />
            </View>
            <FlatList
                data={dummyOrders}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)}>
                        <View style={styles.card}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.orderNo}>{item.orderNo}</Text>
                                <Text style={[styles.status, { color: statusColors[item.status] || '#222' }]}>{item.status}</Text>
                            </View>
                            <Text style={styles.retailer}>{item.retailer}</Text>
                            <View style={styles.rowBetween}>
                                <Text style={styles.date}>{item.date}</Text>
                                <Text style={styles.amount}>₹{item.amount}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            />
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedOrder && (
                            <>
                                <Text style={styles.modalTitle}>Order Details</Text>
                                <Text style={styles.modalLabel}>Order No: <Text style={styles.modalValue}>{selectedOrder.orderNo}</Text></Text>
                                <Text style={styles.modalLabel}>Retailer: <Text style={styles.modalValue}>{selectedOrder.retailer}</Text></Text>
                                <Text style={styles.modalLabel}>Date: <Text style={styles.modalValue}>{selectedOrder.date}</Text></Text>
                                <Text style={styles.modalLabel}>Status: <Text style={[styles.modalValue, { color: statusColors[selectedOrder.status] || '#222' }]}>{selectedOrder.status}</Text></Text>
                                <Text style={styles.modalLabel}>Amount: <Text style={styles.modalValue}>₹{selectedOrder.amount}</Text></Text>
                                <Pressable style={styles.closeBtn} onPress={closeModal}>
                                    <Text style={styles.closeBtnText}>Close</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f9fb' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backBtn: { padding: 8 },
    backIcon: { fontSize: 22, color: '#222' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        borderWidth: 0.7

    },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderNo: { fontWeight: 'bold', fontSize: 16, color: '#1976d2' },
    status: { fontWeight: 'bold', fontSize: 14 },
    retailer: { fontSize: 15, color: '#374151', marginVertical: 6 },
    date: { fontSize: 13, color: '#888' },
    amount: { fontSize: 15, fontWeight: 'bold', color: '#222' },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: 300,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1976d2', marginBottom: 16, alignSelf: 'center', width: '100%', textAlign: 'center' },
    modalLabel: { fontSize: 15, color: '#374151', marginBottom: 6 },
    modalValue: { fontWeight: 'bold', color: '#222' },
    closeBtn: {
        marginTop: 18,
        alignSelf: 'center',
        backgroundColor: '#1976d2',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default RetailerOrderScreen; 