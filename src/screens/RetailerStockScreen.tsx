import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RetailerStockScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loader for 2.5 seconds when component mounts
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Retailer Stock</Text>
                <View style={{ width: 40 }} />
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#673AB7" />
                    <Text style={styles.loaderText}>Loading retailer stock...</Text>
                </View>
            ) : (
                <View style={styles.content}>
                    <Text style={styles.text}>Retailer Stock Page</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
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
    content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 24, fontWeight: 'bold' },
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

export default RetailerStockScreen; 