import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dummyDistOrders = [
    { id: 'D1', orderNo: 'DST-2001', distributor: 'Dist A', date: '2024-06-10', status: 'Pending', amount: 1800 },
    { id: 'D2', orderNo: 'DST-2002', distributor: 'Dist B', date: '2024-06-11', status: 'Completed', amount: 950 },
    { id: 'D3', orderNo: 'DST-2003', distributor: 'Dist C', date: '2024-06-12', status: 'Cancelled', amount: 0 },
    { id: 'D4', orderNo: 'DST-2004', distributor: 'Dist D', date: '2024-06-13', status: 'Pending', amount: 1260 },
    { id: 'D5', orderNo: 'DST-2005', distributor: 'Dist E', date: '2024-06-14', status: 'Completed', amount: 1500 },
];

const statusColors: { [key: string]: string } = {
    Pending: '#f5a623',
    Completed: '#4caf50',
    Cancelled: '#e94e77',
};

const DistOrderScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loader for 2.5 seconds when component mounts
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

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
                <Text style={styles.headerTitle}>Distributor Stock</Text>
                <View style={{ width: 40 }} />
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#1976d2" />
                    <Text style={styles.loaderText}>Loading distributor stock...</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={dummyDistOrders}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ padding: 16 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => openModal(item)}>
                                <View style={styles.card}>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.orderNo}>{item.orderNo}</Text>
                                        <Text style={[styles.status, { color: statusColors[item.status] || '#222' }]}>{item.status}</Text>
                                    </View>
                                    <Text style={styles.retailer}>{item.distributor}</Text>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.date}>{item.date}</Text>
                                        <Text style={styles.amount}>₹{item.amount}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                    />

                    <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeModal}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                {selectedOrder && (
                                    <>
                                        <Text style={styles.modalTitle}>Order Details</Text>
                                        <Text style={styles.modalLabel}>
                                            Order No: <Text style={styles.modalValue}>{selectedOrder.orderNo}</Text>
                                        </Text>
                                        <Text style={styles.modalLabel}>
                                            Distributor: <Text style={styles.modalValue}>{selectedOrder.distributor}</Text>
                                        </Text>
                                        <Text style={styles.modalLabel}>
                                            Date: <Text style={styles.modalValue}>{selectedOrder.date}</Text>
                                        </Text>
                                        <Text style={styles.modalLabel}>
                                            Status:{' '}
                                            <Text style={[styles.modalValue, { color: statusColors[selectedOrder.status] || '#222' }]}>
                                                {selectedOrder.status}
                                            </Text>
                                        </Text>
                                        <Text style={styles.modalLabel}>
                                            Amount: <Text style={styles.modalValue}>₹{selectedOrder.amount}</Text>
                                        </Text>
                                        <Pressable style={styles.closeBtn} onPress={closeModal}>
                                            <Text style={styles.closeBtnText}>Close</Text>
                                        </Pressable>
                                    </>
                                )}
                            </View>
                        </View>
                    </Modal>
                </>
            )}
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
    backBtn: { padding: 0 },
    backIcon: { fontSize: 22, color: '#222' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        borderWidth: 0.7,
        borderColor: '#ddd',
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
});

export default DistOrderScreen;
