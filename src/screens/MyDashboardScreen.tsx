import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dashboardData = [
    {
        key: 'totalQty',
        title: 'Total Qty',
        value: 124,
        change: '+12',
        up: true,
        icon: '📦',
        bgColor: ['#e3eafc', '#b6ccfa'], // Soft blue
    },
    {
        key: 'pendingWorks',
        title: 'Pending Works',
        value: '20 by Me\n10 by Others',
        action: 'Click for all',
        icon: '📝',
        bgColor: ['#fff4e6', '#ffe0b2'], // Soft orange
    },
    {
        key: 'tcsApp',
        title: 'TCS Application',
        value: 7,
        subTitle: 'Expected for TCS',
        subValue: 1,
        icon: '📄',
        bgColor: ['#e6f4ea', '#b2f2d7'], // Soft green
    },
    {
        key: 'dispatchPendings',
        title: 'Dispatch Pendings',
        value: 3,
        oldPending: 12,
        totalPending: 21,
        icon: '🚚',
        bgColor: ['#fde2e4', '#f8bbd0'], // Soft red/pink
    },
];

const CARD_MARGIN = 10;
const CARD_WIDTH = 160;
const CARD_HEIGHT = 220;

function chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

const MyDashboardScreen = () => {
    const navigation = useNavigation();
    const rows = chunkArray(dashboardData, 2);
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Dashboard</Text>
                <View style={{ width: 40 }} />
            </View>
            <ScrollView contentContainerStyle={{ padding: CARD_MARGIN, height: 2 * CARD_HEIGHT + 3 * CARD_MARGIN }}>
                {rows.map((row: any, rowIndex: number) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((item: any, colIndex: number) => (
                            <View
                                key={item.key}
                                style={[
                                    styles.card,
                                    {
                                        backgroundColor: item.bgColor[0],
                                        width: CARD_WIDTH,
                                        height: CARD_HEIGHT,
                                        marginRight: colIndex === 0 ? CARD_MARGIN : 0,
                                    },
                                ]}
                            >
                                <View style={styles.cardTop}>
                                    <Text style={styles.emoji}>{item.icon}</Text>
                                </View>
                                <View style={styles.cardMiddle}>
                                    <Text
                                        style={styles.cardValue}
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        {item.value}
                                    </Text>
                                    {item.key === 'totalQty' && (
                                        <View style={styles.valueRow}>
                                            <Text style={[styles.arrow, { color: item.up ? '#1ecb4f' : '#e94e77' }]}>{item.up ? '⬆️' : '⬇️'}</Text>
                                            <Text style={[styles.change, { color: item.up ? '#1ecb4f' : '#e94e77' }]}>{item.change}</Text>
                                        </View>
                                    )}
                                    {item.key === 'tcsApp' && (
                                        <>
                                            <Text style={styles.subTitle}>{item.subTitle}</Text>
                                            <Text style={styles.subValue}>{item.subValue}</Text>
                                        </>
                                    )}
                                    {item.key === 'dispatchPendings' && (
                                        <>
                                            <Text style={styles.subTitle}>Old pending [{item.oldPending}]</Text>
                                            <Text style={styles.subValue}>Total [{item.totalPending}]</Text>
                                        </>
                                    )}
                                </View>
                                <View style={styles.cardBottom}>
                                    <Text
                                        style={styles.cardLabel}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item.title}
                                    </Text>
                                    {item.key === 'pendingWorks' && (
                                        <TouchableOpacity>
                                            <Text style={styles.actionText}>{item.action}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        ))}
                        {row.length < 2 && <View style={{ width: CARD_WIDTH }} />} {/* Filler for last row if needed */}
                    </View>
                ))}
            </ScrollView>
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
    row: { flexDirection: 'row', marginBottom: CARD_MARGIN },
    card: {
        borderRadius: 18,
        padding: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTop: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
    },
    emoji: { fontSize: 34 },
    cardMiddle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    cardValue: { color: '#1a237e', fontSize: 16, fontWeight: 'bold', marginBottom: 4, textAlign: 'center' },
    valueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 0 },
    arrow: { fontSize: 16, marginLeft: 2 },
    change: { fontSize: 13, fontWeight: 'bold', marginLeft: 3 },
    subTitle: { color: '#607d8b', fontSize: 13, marginTop: 2, textAlign: 'center', fontWeight: '500' },
    subValue: { color: '#1976d2', fontSize: 16, fontWeight: 'bold', marginTop: 2, textAlign: 'center' },
    cardBottom: {
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 6,
    },
    cardLabel: { color: '#374151', fontSize: 14, fontWeight: '600', textAlign: 'center', letterSpacing: 0.2 },
    actionText: { color: '#1976d2', fontSize: 12, marginTop: 6, textDecorationLine: 'underline', fontWeight: '600' },
});

export default MyDashboardScreen;