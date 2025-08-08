import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Report {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: string;
    lastUpdated: string;
    status: 'Available' | 'Generating' | 'Error';
}

const ReportsScreen = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loader for 2.5 seconds when component mounts
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const [reports] = useState<Report[]>([
        { id: '1', title: 'Sales Performance Report', description: 'Monthly sales analysis and trends', category: 'Sales', icon: '📊', lastUpdated: '2024-01-22', status: 'Available' },
        { id: '2', title: 'Inventory Status Report', description: 'Current stock levels and alerts', category: 'Inventory', icon: '📦', lastUpdated: '2024-01-22', status: 'Available' },
        { id: '3', title: 'Employee Productivity Report', description: 'Team performance and metrics', category: 'HR', icon: '👥', lastUpdated: '2024-01-21', status: 'Available' },
        { id: '4', title: 'Financial Summary Report', description: 'Revenue, expenses, and profit analysis', category: 'Finance', icon: '💰', lastUpdated: '2024-01-22', status: 'Generating' },
        { id: '5', title: 'Customer Satisfaction Report', description: 'Feedback and satisfaction scores', category: 'Customer', icon: '😊', lastUpdated: '2024-01-20', status: 'Available' },
        { id: '6', title: 'Marketing Campaign Report', description: 'Campaign performance and ROI', category: 'Marketing', icon: '📢', lastUpdated: '2024-01-19', status: 'Available' },
        { id: '7', title: 'Quality Control Report', description: 'Product quality metrics and issues', category: 'Operations', icon: '✅', lastUpdated: '2024-01-18', status: 'Error' },
        { id: '8', title: 'Supply Chain Report', description: 'Vendor performance and logistics', category: 'Operations', icon: '🚚', lastUpdated: '2024-01-17', status: 'Available' },
    ]);

    const categories = ['All', 'Sales', 'Inventory', 'HR', 'Finance', 'Customer', 'Marketing', 'Operations'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available': return '#4CAF50';
            case 'Generating': return '#FF9800';
            case 'Error': return '#F44336';
            default: return '#757575';
        }
    };

    const filteredReports = reports.filter(report => {
        return selectedCategory === 'All' || report.category === selectedCategory;
    });

    const handleViewReport = (report: Report) => {
        Alert.alert('View Report', `View ${report.title} functionality would go here`);
    };

    const handleGenerateReport = () => {
        Alert.alert('Generate Report', 'Generate new report functionality would go here');
    };

    const renderReportItem = ({ item }: { item: Report }) => (
        <TouchableOpacity style={styles.reportCard} onPress={() => handleViewReport(item)}>
            <View style={styles.reportHeader}>
                <View style={styles.reportIcon}>
                    <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <View style={styles.reportInfo}>
                    <Text style={styles.reportTitle}>{item.title}</Text>
                    <Text style={styles.reportDescription}>{item.description}</Text>
                    <Text style={styles.reportCategory}>{item.category}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.reportFooter}>
                <Text style={styles.lastUpdated}>Last updated: {item.lastUpdated}</Text>
            </View>
        </TouchableOpacity>
    );

    const quickStats = [
        { title: 'Total Reports', value: reports.length, color: '#2196F3' },
        { title: 'Available', value: reports.filter(r => r.status === 'Available').length, color: '#4CAF50' },
        { title: 'Generating', value: reports.filter(r => r.status === 'Generating').length, color: '#FF9800' },
        { title: 'Errors', value: reports.filter(r => r.status === 'Error').length, color: '#F44336' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reports & Analytics</Text>
                <TouchableOpacity style={styles.addBtn} onPress={handleGenerateReport}>
                    <Text style={styles.addIcon}>📊</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#673AB7" />
                    <Text style={styles.loaderText}>Loading reports...</Text>
                </View>
            ) : (
                <>
                    {/* Quick Stats */}
                    <View style={{ height: 120 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
                            {quickStats.map((stat, index) => (
                                <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
                                    <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                                    <Text style={styles.statLabel}>{stat.title}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

            {/* Category Filter */}
            <View style={styles.filterContainer}>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.filterTab,
                                selectedCategory === item && styles.filterTabActive
                            ]}
                            onPress={() => setSelectedCategory(item)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedCategory === item && styles.filterTextActive
                            ]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                />
            </View>

                                {/* Reports List */}
                    <FlatList
                        data={filteredReports}
                        renderItem={renderReportItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
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
        fontSize: 20,
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
    reportCard: {
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
    reportHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    reportIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    iconText: {
        fontSize: 24,
    },
    reportInfo: {
        flex: 1,
    },
    reportTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 4,
    },
    reportDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    reportCategory: {
        fontSize: 12,
        color: '#999',
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
    reportFooter: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    lastUpdated: {
        fontSize: 12,
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

export default ReportsScreen; 