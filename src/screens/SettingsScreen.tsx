import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SettingItem {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    type: 'toggle' | 'navigate' | 'action';
    value?: boolean;
    action?: string;
}

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState<SettingItem[]>([
        { id: '1', title: 'Push Notifications', subtitle: 'Receive alerts and updates', icon: '🔔', type: 'toggle', value: true },
        { id: '2', title: 'Email Notifications', subtitle: 'Get updates via email', icon: '📧', type: 'toggle', value: false },
        { id: '3', title: 'Dark Mode', subtitle: 'Switch to dark theme', icon: '🌙', type: 'toggle', value: false },
        { id: '4', title: 'Biometric Authentication', subtitle: 'Use fingerprint or face ID', icon: '👆', type: 'toggle', value: true },
        { id: '5', title: 'Two-Factor Authentication', subtitle: 'Add extra security layer', icon: '🔐', type: 'navigate', action: '2FA' },
        { id: '6', title: 'Change Password', subtitle: 'Update your password', icon: '🔑', type: 'navigate', action: 'ChangePassword' },
        { id: '7', title: 'Privacy Settings', subtitle: 'Manage your privacy', icon: '🛡️', type: 'navigate', action: 'Privacy' },
        { id: '8', title: 'Data & Storage', subtitle: 'Manage app data usage', icon: '💾', type: 'navigate', action: 'Storage' },
        { id: '9', title: 'Language', subtitle: 'English (US)', icon: '🌐', type: 'navigate', action: 'Language' },
        { id: '10', title: 'About App', subtitle: 'Version 1.0.0', icon: 'ℹ️', type: 'navigate', action: 'About' },
        { id: '11', title: 'Help & Support', subtitle: 'Get help and contact support', icon: '❓', type: 'navigate', action: 'Support' },
        { id: '12', title: 'Logout', subtitle: 'Sign out of your account', icon: '🚪', type: 'action', action: 'Logout' },
    ]);

    useEffect(() => {
        // Show loader for 2.5 seconds when component mounts
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleToggle = (id: string) => {
        setSettings(prevSettings =>
            prevSettings.map(setting =>
                setting.id === id
                    ? { ...setting, value: !setting.value }
                    : setting
            )
        );
    };

    const handleAction = (item: SettingItem) => {
        switch (item.type) {
            case 'navigate':
                if (item.action) {
                    Alert.alert('Navigate', `Navigate to ${item.action} functionality would go here`);
                }
                break;
            case 'action':
                if (item.action === 'Logout') {
                    Alert.alert(
                        'Logout',
                        'Are you sure you want to logout?',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            {
                                text: 'Logout', style: 'destructive', onPress: () => {
                                    Alert.alert('Logged Out', 'You have been successfully logged out');
                                }
                            },
                        ]
                    );
                } else if (item.action) {
                    Alert.alert('Action', `${item.action} functionality would go here`);
                }
                break;
        }
    };

    const renderSettingItem = ({ item }: { item: SettingItem }) => (
        <TouchableOpacity
            style={styles.settingCard}
            onPress={() => handleAction(item)}
            disabled={item.type === 'toggle'}
        >
            <View style={styles.settingHeader}>
                <View style={styles.settingIcon}>
                    <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                {item.type === 'toggle' ? (
                    <Switch
                        value={item.value}
                        onValueChange={() => handleToggle(item.id)}
                        trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
                        thumbColor={item.value ? '#fff' : '#f4f3f4'}
                    />
                ) : (
                    <Text style={styles.arrowIcon}>›</Text>
                )}
            </View>
        </TouchableOpacity>
    );

    const userInfo = {
        name: 'John Smith',
        email: 'john.smith@company.com',
        role: 'Administrator',
        avatar: '👤',
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings & Authentication</Text>
                <View style={{ width: 40 }} />
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#673AB7" />
                    <Text style={styles.loaderText}>Loading settings...</Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                {/* User Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <View style={styles.profileAvatar}>
                            <Text style={styles.avatarText}>{userInfo.avatar}</Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{userInfo.name}</Text>
                            <Text style={styles.profileEmail}>{userInfo.email}</Text>
                            <Text style={styles.profileRole}>{userInfo.role}</Text>
                        </View>
                        <TouchableOpacity style={styles.editProfileBtn}>
                            <Text style={styles.editProfileText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Settings Sections */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    <FlatList
                        data={settings.filter(item => item.title.includes('Notification'))}
                        renderItem={renderSettingItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Appearance</Text>
                    <FlatList
                        data={settings.filter(item => item.title.includes('Mode'))}
                        renderItem={renderSettingItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Security</Text>
                    <FlatList
                        data={settings.filter(item =>
                            item.title.includes('Authentication') ||
                            item.title.includes('Password') ||
                            item.title.includes('Privacy')
                        )}
                        renderItem={renderSettingItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>General</Text>
                    <FlatList
                        data={settings.filter(item =>
                            !item.title.includes('Notification') &&
                            !item.title.includes('Mode') &&
                            !item.title.includes('Authentication') &&
                            !item.title.includes('Password') &&
                            !item.title.includes('Privacy') &&
                            !item.title.includes('Logout')
                        )}
                        renderItem={renderSettingItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <FlatList
                        data={settings.filter(item => item.title.includes('Logout'))}
                        renderItem={renderSettingItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>

                {/* Bottom spacing for better scroll experience */}
                <View style={styles.bottomSpacing} />
                </ScrollView>
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
    profileCard: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 32,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 2,
    },
    profileEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    profileRole: {
        fontSize: 12,
        color: '#999',
    },
    editProfileBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#2196F3',
        borderRadius: 20,
    },
    editProfileText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        padding: 16,
        paddingBottom: 8,
        backgroundColor: '#f9f9f9',
    },
    settingCard: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    iconText: {
        fontSize: 18,
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#222',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    arrowIcon: {
        fontSize: 20,
        color: '#999',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    bottomSpacing: {
        height: 20,
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

export default SettingsScreen; 