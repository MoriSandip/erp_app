import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectEmployees, selectDepartments, selectProjects } from '../store/erpSlice';

const ERPScreen = () => {
    const employees = useSelector(selectEmployees);
    const departments = useSelector(selectDepartments);
    const projects = useSelector(selectProjects);

    const getDepartmentName = (id: number) =>
        departments.find((d: any) => d.id === id)?.name || 'Unknown';
    const getProjectNames = (ids: number[]) =>
        ids.map(id => projects.find((p: any) => p.id === id)?.name || 'Unknown').join(', ');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ERP Sample Data</Text>
            <Text style={styles.section}>Employees</Text>
            <FlatList
                data={employees}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>Department: {getDepartmentName(item.departmentId)}</Text>
                        <Text>Projects: {getProjectNames(item.projectIds)}</Text>
                    </View>
                )}
            />
            <Text style={styles.section}>Departments</Text>
            <FlatList
                data={departments}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                )}
            />
            <Text style={styles.section}>Projects</Text>
            <FlatList
                data={projects}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    section: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
    card: { padding: 12, backgroundColor: '#f2f2f2', borderRadius: 8, marginBottom: 8 },
    name: { fontWeight: 'bold' },
});

export default ERPScreen; 