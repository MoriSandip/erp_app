import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number) {
    return new Date(year, month, 1).getDay();
}

const CalendarScreen = () => {
    const navigation = useNavigation();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show loader for 2.5 seconds when component mounts
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const datesArray = [];
    for (let i = 0; i < firstDay; i++) {
        datesArray.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        datesArray.push(d);
    }
    // Pad the end of the array so the last row always has 7 items
    while (datesArray.length % 7 !== 0) {
        datesArray.push(null);
    }

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDate(1);
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDate(1);
    };

    const isToday = (date: number | null) => {
        return (
            date === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    const isSelected = (date: number | null) => date === selectedDate;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Calendar</Text>
                <View style={{ width: 40 }} />
            </View>
            
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#673AB7" />
                    <Text style={styles.loaderText}>Loading calendar...</Text>
                </View>
            ) : (
                <>
                    {/* Calendar Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handlePrevMonth} style={styles.navBtn}>
                            <Text style={styles.navText}>{'<'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>
                            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </Text>
                        <TouchableOpacity onPress={handleNextMonth} style={styles.navBtn}>
                            <Text style={styles.navText}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.daysRow}>
                        {daysShort.map((day) => (
                            <Text key={day} style={styles.dayShort}>{day}</Text>
                        ))}
                    </View>
                    <FlatList
                        data={datesArray}
                        numColumns={7}
                        keyExtractor={(_, idx) => idx.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                disabled={item === null}
                                style={[
                                    styles.dateCell,
                                    isToday(item) && styles.todayCell,
                                    isSelected(item) && styles.selectedCell,
                                ]}
                                onPress={() => item && setSelectedDate(item)}
                            >
                                <Text
                                    style={[
                                        styles.dateText,
                                        isToday(item) && styles.todayText,
                                        isSelected(item) && styles.selectedText,
                                    ]}
                                >
                                    {item ? item : ''}
                                </Text>
                            </TouchableOpacity>
                        )}
                        scrollEnabled={false}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff',  },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 12,
    },
    backBtn: { padding: 0 },
    backIcon: { fontSize: 22, color: '#222' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222' },
    headerText: { fontSize: 22, fontWeight: 'bold', color: '#222' },
    navBtn: { padding: 8, borderRadius: 8, backgroundColor: '#f0f0f0' },
    navText: { fontSize: 20, color: '#333' },
    daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    dayShort: { flex: 1, textAlign: 'center', fontWeight: '600', color: '#888' },
    dateCell: {
        flex: 1,
        aspectRatio: 1,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    todayCell: {
        backgroundColor: '#e0f7fa',
        borderColor: '#673AB7',
        borderWidth: 2,
    },
    selectedCell: {
        backgroundColor: '#673AB7',
    },
    dateText: { fontSize: 16, color: '#222' },
    todayText: { fontWeight: 'bold', color: '#673AB7' },
    selectedText: { color: '#fff', fontWeight: 'bold' },
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

export default CalendarScreen;