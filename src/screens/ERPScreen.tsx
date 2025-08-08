import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { selectEmployees, selectDepartments, selectProjects } from '../store/erpSlice';

const ERPScreen = () => {
    const employees = useSelector(selectEmployees);
    const departments = useSelector(selectDepartments);
    const projects = useSelector(selectProjects);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loader for 2.5 seconds when component mounts
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const getDepartmentName = (id: number) =>
        departments.find((d: any) => d.id === id)?.name || 'Unknown';
    const getProjectNames = (ids: number[]) =>
        ids.map(id => projects.find((p: any) => p.id === id)?.name || 'Unknown').join(', ');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ERP Sample Data</Text>
            
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#673AB7" />
                    <Text style={styles.loaderText}>Loading ERP data...</Text>
                </View>
            ) : (
                <>
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
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    section: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
    card: { padding: 12, backgroundColor: '#f2f2f2', borderRadius: 8, marginBottom: 8 },
    name: { fontWeight: 'bold' },
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

export default ERPScreen; 