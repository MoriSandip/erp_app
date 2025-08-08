import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

// Type definitions for user and location
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  status: 'checkin' | 'checkout';
}
interface UserLocation {
  latitude: number;
  longitude: number;
}

const dummyUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600',
    status: 'checkin',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-234-5678',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
    status: 'checkout',
  },
];

const AttendanceScreen = ({ navigation }: { navigation: any }) => {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusImages, setStatusImages] = useState<{ [userId: string]: string }>({});
  const [userLocations, setUserLocations] = useState<{ [userId: string]: UserLocation | null }>({});
  const [locationLoading, setLocationLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2.5 seconds when component mounts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const requestCameraAndLocationPermission = async (): Promise<boolean> => {
    try {
      const cameraPerm = Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
      const locationPerm = Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const cameraStatus = await check(cameraPerm);
      const locationStatus = await check(locationPerm);

      const cameraGranted = cameraStatus === RESULTS.GRANTED
        ? true
        : (await request(cameraPerm)) === RESULTS.GRANTED;

      const locationGranted = locationStatus === RESULTS.GRANTED
        ? true
        : (await request(locationPerm)) === RESULTS.GRANTED;

      return cameraGranted && locationGranted;
    } catch (error) {
      console.warn('Permission error:', error);
      return false;
    }
  };

  // Remove fetchAndSaveUserLocation helper, and use direct logic in handleStatusToggle

  const handleStatusToggle = async (userId: string) => {
    if (locationLoading) return; // Prevent double click
    const hasPermission = await requestCameraAndLocationPermission();
    if (!hasPermission) {
      Alert.alert('Both camera and location permissions are required.');
      return;
    }

    setLocationLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocations((prev) => ({
          ...prev,
          [userId]: { latitude, longitude },
        }));
        setLocationLoading(false);

        // Only after location, open camera
        launchCamera(
          {
            mediaType: 'photo',
            cameraType: 'back',
            quality: 0.7,
            saveToPhotos: true,
          },
          (response) => {
            if (response.didCancel || response.errorCode) {
              console.log('User cancelled or error:', response.errorMessage);
              return;
            }

            const photoUri = response.assets?.[0]?.uri;
            if (!photoUri) return;

            // Toggle status
            const updated = users.map((user) =>
              user.id === userId
                ? {
                  ...user,
                  status: (user.status === 'checkin' ? 'checkout' : 'checkin') as 'checkin' | 'checkout',
                }
                : user
            );
            setUsers(updated);
            setStatusImages((prev) => ({ ...prev, [userId]: photoUri }));
          }
        );
      },
      (error) => {
        setLocationLoading(false);
        Alert.alert('Location Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
    );
  };

  // Modal open: just set selected user and show modal, do NOT fetch location
  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
    setLocationLoading(false);
  };

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity onPress={() => openUserModal(item)} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.statusBtn,
          { backgroundColor: item.status === 'checkin' ? '#28a745' : '#dc3545' },
          locationLoading && { opacity: 0.5 },
        ]}
        onPress={() => handleStatusToggle(item.id)}
        disabled={locationLoading}
      >
        <Text style={styles.statusText}>
          {item.status === 'checkin' ? 'Check Out' : 'Check In'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#673AB7" />
          <Text style={styles.loaderText}>Loading attendance data...</Text>
        </View>
      ) : (
        <>
          <View style={{ padding: 16 }}>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          </View>

          {/* Loader Overlay */}
          {locationLoading && (
            <View style={styles.loaderOverlay} pointerEvents="auto">
              <ActivityIndicator size="large" color="#673AB7" />
            </View>
          )}

          {/* Modal */}
          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedUser && (
                  <>
                    <Image
                      source={{
                        uri: statusImages[selectedUser.id] || selectedUser.image,
                      }}
                      style={styles.modalAvatar}
                    />
                    <Text style={styles.modalName}>{selectedUser.name}</Text>
                    <Text>Email: {selectedUser.email}</Text>
                    <Text>Phone: {selectedUser.phone}</Text>
                    <Text>Status:
                      {selectedUser.status === 'checkin' ? 'Check Out' : 'Check In'}
                    </Text>
                    {/* Location */}
                    {userLocations[selectedUser.id] ? (
                      <Text style={{ marginTop: 6, color: '#444' }}>
                        Lat: {userLocations[selectedUser.id]?.latitude.toFixed(5)}, Long: {userLocations[selectedUser.id]?.longitude.toFixed(5)}
                      </Text>
                    ) : (
                      <Text style={{ marginTop: 6, color: '#f00' }}>Location not available</Text>
                    )}
                    {/* Retry Button */}
                    <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                      <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  backBtn: {  marginRight: 8 },
  backIcon: { fontSize: 20, color: '#222' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222' },
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
  },
  name: { fontSize: 17, fontWeight: 'bold' },
  email: { fontSize: 13, color: '#555' },
  phone: { fontSize: 13, color: '#888' },
  statusBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusText: { color: '#fff', fontWeight: '600' },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  closeBtn: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeText: { color: '#fff', fontWeight: '600' },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
