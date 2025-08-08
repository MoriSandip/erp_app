import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    Image,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';

const sampleRetailers = [
    {
        id: '1',
        name: 'John Retailer',
        email: 'john@example.com',
        phone: '+91 1234567890',
        address: '123 Market Street, Mumbai',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60',
        moreDetails: 'This retailer specializes in FMCG goods and electronics.',
    },
    {
        id: '2',
        name: 'Aarti Traders',
        email: 'aarti@example.com',
        phone: '+91 9876543210',
        address: '456 Bazaar Road, Delhi',
        img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000',
        moreDetails: 'Known for seasonal goods and clothing distribution.',
    },
];

const RetailerScreen = () => {
    const navigation = useNavigation();

    const [selectedRetailer, setSelectedRetailer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loader for 2.5 seconds when component mounts
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const openModal = (retailer: any) => {
        setSelectedRetailer(retailer);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedRetailer(null);
        setModalVisible(false);
    };

    const renderRetailerItem = ({ item }: any) => (
        <TouchableOpacity style={styles.card} onPress={() => openModal(item)} activeOpacity={0.8}>
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>📧 {item.email}</Text>
                <Text style={styles.detail}>📞 {item.phone}</Text>
                <Text style={styles.detail}>📍 {item.address}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Retailers</Text>
                <View style={{ width: 40 }} />
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#673AB7" />
                    <Text style={styles.loaderText}>Loading retailers...</Text>
                </View>
            ) : (
                <FlatList
                    data={sampleRetailers}
                    keyExtractor={(item) => item.id}
                    renderItem={renderRetailerItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
                            <Text style={styles.closeX}>×</Text>
                        </TouchableOpacity>

                        {selectedRetailer && (
                            <>
                                <Image source={{ uri: selectedRetailer.img }} style={styles.modalImage} />
                                <Text style={styles.modalTitle}>{selectedRetailer.name}</Text>

                                <View style={styles.modalContent}>
                                    <Text style={styles.modalDetail}>📧 {selectedRetailer.email}</Text>
                                    <Text style={styles.modalDetail}>📞 {selectedRetailer.phone}</Text>
                                    <Text style={styles.modalDetail}>📍 {selectedRetailer.address}</Text>
                                    <Text style={styles.modalDetail}>📝 {selectedRetailer.moreDetails}</Text>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default RetailerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    backBtn: { padding: 0, marginRight: 8 },
    backIcon: { fontSize: 20, color: '#222' },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222' },

    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 12,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 12,
        marginRight: 12,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    detail: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        width: '85%',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    modalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 14,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
    },
    modalContent: {
        alignItems: 'flex-start',
        width: '100%',
    },
    modalDetail: {
        fontSize: 14,
        color: '#444',
        marginTop: 6,
    },
    closeIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 10,
    },
    closeX: {
        fontSize: 26,
        color: '#999',
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
});
