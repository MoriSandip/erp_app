import React, { useState } from 'react';
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
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

const dummyUsers = [
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

const AttendanceScreen = ({ navigation }) => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusImages, setStatusImages] = useState({});
  const [userLocations, setUserLocations] = useState({});

  const requestCameraAndLocationPermission = async () => {
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

  const handleStatusToggle = async (userId) => {
    const hasPermission = await requestCameraAndLocationPermission();
    if (!hasPermission) {
      Alert.alert('Both camera and location permissions are required.');
      return;
    }

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

        // Get location after image is taken
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocations((prev) => ({
              ...prev,
              [userId]: { latitude, longitude },
            }));
          },
          (error) => {
            console.warn('Location error:', error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        // Toggle status
        const updated = users.map((user) =>
          user.id === userId
            ? {
              ...user,
              status: user.status === 'checkin' ? 'checkout' : 'checkin',
            }
            : user
        );
        setUsers(updated);
        setStatusImages((prev) => ({ ...prev, [userId]: photoUri }));
      }
    );
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
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
        ]}
        onPress={() => handleStatusToggle(item.id)}
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

      <View style={{ padding: 16 }}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>

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
                {userLocations[selectedUser.id] && (
                  <Text style={{ marginTop: 6, color: '#444' }}>
                    Lat: {userLocations[selectedUser.id].latitude.toFixed(5)}, Long: {userLocations[selectedUser.id].longitude.toFixed(5)}
                  </Text>
                )}

                <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  backBtn: { padding: 8, marginRight: 8 },
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
});
