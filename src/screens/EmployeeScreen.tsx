import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    status: 'Active' | 'Inactive' | 'On Leave';
    avatar: string;
}

const EmployeeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const [employees] = useState<Employee[]>([
        { id: '1', name: 'John Smith', position: 'Software Engineer', department: 'Engineering', email: 'john.smith@company.com', phone: '+1-555-0123', status: 'Active', avatar: '👨‍💻' },
        { id: '2', name: 'Sarah Johnson', position: 'Product Manager', department: 'Product', email: 'sarah.johnson@company.com', phone: '+1-555-0124', status: 'Active', avatar: '👩‍💼' },
        { id: '3', name: 'Mike Davis', position: 'Sales Representative', department: 'Sales', email: 'mike.davis@company.com', phone: '+1-555-0125', status: 'Active', avatar: '👨‍💼' },
        { id: '4', name: 'Lisa Wilson', position: 'HR Specialist', department: 'Human Resources', email: 'lisa.wilson@company.com', phone: '+1-555-0126', status: 'On Leave', avatar: '👩‍💼' },
        { id: '5', name: 'David Brown', position: 'Marketing Manager', department: 'Marketing', email: 'david.brown@company.com', phone: '+1-555-0127', status: 'Active', avatar: '👨‍💼' },
        { id: '6', name: 'Emma Taylor', position: 'UX Designer', department: 'Design', email: 'emma.taylor@company.com', phone: '+1-555-0128', status: 'Active', avatar: '👩‍🎨' },
        { id: '7', name: 'James Miller', position: 'Data Analyst', department: 'Analytics', email: 'james.miller@company.com', phone: '+1-555-0129', status: 'Inactive', avatar: '👨‍💻' },
        { id: '8', name: 'Olivia Garcia', position: 'Customer Support', department: 'Support', email: 'olivia.garcia@company.com', phone: '+1-555-0130', status: 'Active', avatar: '👩‍💼' },
    ]);

    const filters = ['All', 'Active', 'Inactive', 'On Leave'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return '#4CAF50';
            case 'Inactive': return '#F44336';
            case 'On Leave': return '#FF9800';
            default: return '#757575';
        }
    };

    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'All' || employee.status === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const handleAddEmployee = () => {
        Alert.alert('Add Employee', 'Add new employee functionality would go here');
    };

    const handleViewEmployee = (employee: Employee) => {
        Alert.alert('View Employee', `View details for ${employee.name} functionality would go here`);
    };

    const renderEmployeeItem = ({ item }: { item: Employee }) => (
        <TouchableOpacity style={styles.employeeCard} onPress={() => handleViewEmployee(item)}>
            <View style={styles.employeeHeader}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatar}>{item.avatar}</Text>
                </View>
                <View style={styles.employeeInfo}>
                    <Text style={styles.employeeName}>{item.name}</Text>
                    <Text style={styles.employeePosition}>{item.position}</Text>
                    <Text style={styles.employeeDepartment}>{item.department}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.employeeContact}>
                <Text style={styles.contactText}>{item.email}</Text>
                <Text style={styles.contactText}>{item.phone}</Text>
            </View>
        </TouchableOpacity>
    );

    const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
    const totalEmployees = employees.length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Employee Management</Text>
                <TouchableOpacity style={styles.addBtn} onPress={handleAddEmployee}>
                    <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Quick Stats */}
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
                    <View style={[styles.statCard, { borderLeftColor: '#FF9800' }]}>
                        <Text style={[styles.statValue, { color: '#FF9800' }]}>{totalEmployees}</Text>
                        <Text style={styles.statLabel}>Total Employees</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#4CAF50' }]}>
                        <Text style={[styles.statValue, { color: '#4CAF50' }]}>{activeEmployees}</Text>
                        <Text style={styles.statLabel}>Active</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#FF9800' }]}>
                        <Text style={[styles.statValue, { color: '#FF9800' }]}>{employees.filter(emp => emp.status === 'On Leave').length}</Text>
                        <Text style={styles.statLabel}>On Leave</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#F44336' }]}>
                        <Text style={[styles.statValue, { color: '#F44336' }]}>{employees.filter(emp => emp.status === 'Inactive').length}</Text>
                        <Text style={styles.statLabel}>Inactive</Text>
                    </View>
                    <View
                        style={{
                            height: 10,
                            width: 30,
                        }}
                    />
                </ScrollView>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search employees..."
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

            {/* Employees List */}
            <FlatList
                data={filteredEmployees}
                renderItem={renderEmployeeItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
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
        padding: 8,
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
        backgroundColor: '#f5f5f5',
        borderRadius: 24,
        paddingHorizontal: 16,
        fontSize: 16,
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
        borderRadius: 20,
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
    employeeCard: {
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
    employeeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatar: {
        fontSize: 24,
    },
    employeeInfo: {
        flex: 1,
    },
    employeeName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 2,
    },
    employeePosition: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    employeeDepartment: {
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
    employeeContact: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    contactText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
});

export default EmployeeScreen; 