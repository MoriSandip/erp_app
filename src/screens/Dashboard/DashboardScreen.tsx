import React, { useEffect, useRef } from 'react';
import {
    View,
    StatusBar,
    Animated,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWeatherAsync, loadPersistedState } from '../../store/smartHomeSlice';
import { styles, HEADER_SCROLL_DISTANCE } from './styles';
import { DashboardHeader } from './components';
import WeatherCard from './components/WeatherCard';

const DashboardScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { selectedRoomId } = useAppSelector(
        (state) => state.smartHome
    );

    // Animation values
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [200, 80],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.8, 0.6],
        extrapolate: 'clamp',
    });

    const greetingOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const greetingScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });

    const titleOpacity = scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const titleTranslateY = scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [20, 0],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        dispatch(loadPersistedState());
        dispatch(fetchWeatherAsync());
    }, [dispatch]);

    // Navigate to room detail when a room is selected
    useEffect(() => {
        if (selectedRoomId) {
            navigation.navigate('RoomDetail' as never);
        }
    }, [selectedRoomId, navigation]);

    const erpFeatures = [
        { key: 'MyDashboard', label: 'My Dashboard', icon: '📊', screen: 'MyDashboard' },
        { key: 'Calendar', label: 'Calendar', icon: '📅', screen: 'Calendar' },
        { key: 'Attendance', label: 'Attendance', icon: '📝', screen: 'Attendance' },
        { key: 'DocumentImport', label: 'Document Import', icon: '📄', screen: 'DocumentImport' },
        { key: 'Retailer', label: 'Retailer', icon: '🏪', screen: 'Retailer' },

        { key: 'RetailerOrder', label: 'Retailer Order', icon: '🛒', screen: 'RetailerOrder' },
        { key: 'RetailerStock', label: 'Retailer Stock', icon: '📦', screen: 'RetailerStock' },

        { key: 'DistOrder', label: 'Dist Order', icon: '🚚', screen: 'DistOrder' },
        { key: 'DistStock', label: 'Dist Stock', icon: '📦', screen: 'DistStock' },

        { key: 'Visit', label: 'Visit', icon: '👤', screen: 'Visit' },
        { key: 'Route', label: 'Route', icon: '🗺️', screen: 'Route' },

        { key: 'Inventory', label: 'Inventory Management', icon: '📋', screen: 'Inventory' },
        { key: 'Sales', label: 'Sales & Orders', icon: '💰', screen: 'Sales' },

        { key: 'Employee', label: 'Employee Management', icon: '👥', screen: 'Employee' },
        { key: 'Reports', label: 'Reports', icon: '📈', screen: 'Reports' },

        { key: 'Settings', label: 'Settings & Authentication', icon: '⚙️', screen: 'Settings' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" />

            {/* Animated Header */}
            <DashboardHeader
                headerHeight={headerHeight}
                headerOpacity={headerOpacity}
                greetingOpacity={greetingOpacity}
                greetingScale={greetingScale}
                titleOpacity={titleOpacity}
                titleTranslateY={titleTranslateY}
            />

            {/* Scrollable Content */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {/* Weather and Energy Cards */}
                <View style={styles.cardsContainer}>
                    <WeatherCard scrollY={scrollY} />
                </View>
                {/* ERP Features FlatList */}
                <Animated.View style={{ opacity: scrollY.interpolate({ inputRange: [0, 100], outputRange: [1, 0.9], extrapolate: 'clamp' }), transform: [{ scale: scrollY.interpolate({ inputRange: [0, 100], outputRange: [1, 0.97], extrapolate: 'clamp' }) }] }}>
                    <FlatList
                        data={erpFeatures}
                        keyExtractor={item => item.key}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 8 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    margin: 8,
                                    borderRadius: 16,
                                    padding: 24,
                                    alignItems: 'center',
                                    minWidth: 140,
                                    backgroundColor: "#fff",
                                    borderBlockColor: '#fafafa'
                                }}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate(item.screen as never)}
                            >
                                <Text style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</Text>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 16, fontWeight: '600', color: '#222' }}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Animated.View>

                <View style={styles.bottomSpacing} />
            </Animated.ScrollView>
        </View>
    );
};

export default DashboardScreen; 