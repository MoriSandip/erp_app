import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const initialVisits = [
    { id: '1', date: '2025-07-29', location: 'Mumbai', note: 'Visited client A' },
    { id: '2', date: '2025-07-28', location: 'Pune', note: 'Site inspection' },
    { id: '3', date: '2025-07-01', location: 'Delhi', note: 'Meeting with vendor' },
];

const filterOptions = ['All', 'Today', 'Yesterday', 'This Month', 'Last Month', 'This Year', 'Last Year'];

const VisitScreen = () => {
    const navigation = useNavigation();
    const [visits, setVisits] = useState(initialVisits);
    const [filteredVisits, setFilteredVisits] = useState(initialVisits);
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [editVisit, setEditVisit] = useState<any>(null);

    useEffect(() => {
        applyFilters();
    }, [search, selectedFilter, visits]);

    const applyFilters = () => {
        let filtered = [...visits];

        if (search) {
            filtered = filtered.filter(v =>
                v.location.toLowerCase().includes(search.toLowerCase()) ||
                v.note.toLowerCase().includes(search.toLowerCase())
            );
        }

        filtered = filtered.filter(v => {
            const visitDate = moment(v.date);

            switch (selectedFilter) {
                case 'Today':
                    return visitDate.isSame(moment(), 'day');
                case 'Yesterday':
                    return visitDate.isSame(moment().subtract(1, 'day'), 'day');
                case 'This Month':
                    return visitDate.isSame(moment(), 'month');
                case 'Last Month':
                    return visitDate.isSame(moment().subtract(1, 'month'), 'month');
                case 'This Year':
                    return visitDate.isSame(moment(), 'year');
                case 'Last Year':
                    return visitDate.isSame(moment().subtract(1, 'year'), 'year');
                default:
                    return true;
            }
        });

        setFilteredVisits(filtered);
    };

    const handleAddOrEdit = (newVisit: any) => {
        if (editVisit) {
            setVisits(prev => prev.map(v => (v.id === editVisit.id ? { ...newVisit, id: editVisit.id } : v)));
        } else {
            setVisits(prev => [{ ...newVisit, id: Date.now().toString() }, ...prev]);
        }
        setModalVisible(false);
        setEditVisit(null);
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Visit',
            'Are you sure you want to delete this visit?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setVisits(prev => prev.filter(v => v.id !== id));
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Visits</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => { setEditVisit(null); setModalVisible(true); }}>
                    <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Quick Stats */}
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
                    <View style={[styles.statCard, { borderLeftColor: '#673AB7' }]}>
                        <Text style={[styles.statValue, { color: '#673AB7' }]}>{visits.length}</Text>
                        <Text style={styles.statLabel}>Total Visits</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#4CAF50' }]}>
                        <Text style={[styles.statValue, { color: '#4CAF50' }]}>{filteredVisits.length}</Text>
                        <Text style={styles.statLabel}>Filtered</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#FF9800' }]}>
                        <Text style={[styles.statValue, { color: '#FF9800' }]}>
                            {visits.filter(v => moment(v.date).isSame(moment(), 'day')).length}
                        </Text>
                        <Text style={styles.statLabel}>Today</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#2196F3' }]}>
                        <Text style={[styles.statValue, { color: '#2196F3' }]}>
                            {visits.filter(v => moment(v.date).isSame(moment(), 'month')).length}
                        </Text>
                        <Text style={styles.statLabel}>This Month</Text>
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
                    placeholder="Search visits..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <FlatList
                    data={filterOptions}
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

            {/* Visits List */}
            <FlatList
                data={filteredVisits}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.emptyText}>No visits found</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.visitCard}
                        onPress={() => { setEditVisit(item); setModalVisible(true); }}
                    >
                        <View style={styles.visitHeader}>
                            <Text style={styles.visitLocation}>{item.location}</Text>
                            <TouchableOpacity
                                onPress={() => handleDelete(item.id)}
                                style={styles.deleteBtn}
                            >
                                <Text style={styles.deleteIcon}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.visitDetails}>
                            <Text style={styles.visitNote}>{item.note}</Text>
                            <Text style={styles.visitDate}>{moment(item.date).format('YYYY-MM-DD')}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Modal for Add/Edit Visit */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <VisitForm
                    defaultData={editVisit}
                    onSave={handleAddOrEdit}
                    onCancel={() => { setModalVisible(false); setEditVisit(null); }}
                />
            </Modal>
        </View>
    );
};

const VisitForm = ({ defaultData, onSave, onCancel }: any) => {
    const [location, setLocation] = useState(defaultData?.location || '');
    const [note, setNote] = useState(defaultData?.note || '');
    const [date, setDate] = useState(defaultData?.date || moment().format('YYYY-MM-DD'));

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>{defaultData ? 'Edit Visit' : 'Add Visit'}</Text>
                <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
                <TextInput placeholder="Note" value={note} onChangeText={setNote} style={styles.input} />
                <TextInput placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} style={styles.input} />
                <View style={styles.rowBetween}>
                    <Pressable onPress={onCancel}><Text style={styles.cancelBtn}>Cancel</Text></Pressable>
                    <Pressable onPress={() => onSave({ location, note, date })}><Text style={styles.saveBtn}>Save</Text></Pressable>
                </View>
            </View>
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
    visitCard: {
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
    visitHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    visitLocation: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    deleteBtn: {
        padding: 8,
    },
    deleteIcon: {
        fontSize: 18,
        color: '#F44336',
    },
    visitDetails: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    visitNote: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    visitDate: {
        fontSize: 12,
        color: '#999',
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '85%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        padding: 8,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    cancelBtn: {
        color: '#e53935',
        fontWeight: 'bold'
    },
    saveBtn: {
        color: '#1976d2',
        fontWeight: 'bold'
    },
});

export default VisitScreen;
