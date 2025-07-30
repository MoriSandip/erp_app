import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView, Modal, Image, Platform, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

interface Document {
    id: string;
    name: string;
    type: 'PDF' | 'Excel' | 'Word' | 'CSV' | 'Image';
    size: string;
    uploadDate: string;
    status: 'Uploaded' | 'Processing' | 'Completed' | 'Failed';
    category: string;
    previewUrl?: string;
}

const DocumentImportScreen = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

    const [documents, setDocuments] = useState<Document[]>([
        { id: '1', name: 'Sales_Report_2024.pdf', type: 'PDF', size: '2.5 MB', uploadDate: '2024-01-22', status: 'Completed', category: 'Reports', previewUrl: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=PDF+Preview' },
        { id: '2', name: 'Inventory_Data.xlsx', type: 'Excel', size: '1.8 MB', uploadDate: '2024-01-21', status: 'Completed', category: 'Inventory' },
        { id: '3', name: 'Employee_List.docx', type: 'Word', size: '950 KB', uploadDate: '2024-01-20', status: 'Processing', category: 'HR' },
        { id: '4', name: 'Customer_Data.csv', type: 'CSV', size: '450 KB', uploadDate: '2024-01-19', status: 'Completed', category: 'Customer' },
        { id: '5', name: 'Invoice_Template.pdf', type: 'PDF', size: '3.2 MB', uploadDate: '2024-01-18', status: 'Failed', category: 'Finance', previewUrl: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Invoice+PDF' },
        { id: '6', name: 'Product_Catalog.xlsx', type: 'Excel', size: '2.1 MB', uploadDate: '2024-01-17', status: 'Completed', category: 'Inventory' },
        { id: '7', name: 'Meeting_Notes.docx', type: 'Word', size: '1.2 MB', uploadDate: '2024-01-16', status: 'Uploaded', category: 'General' },
        { id: '8', name: 'Company_Logo.png', type: 'Image', size: '800 KB', uploadDate: '2024-01-15', status: 'Completed', category: 'Marketing', previewUrl: 'https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Company+Logo' },
    ]);

    const categories = ['All', 'Reports', 'Inventory', 'HR', 'Customer', 'Finance', 'General', 'Marketing'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Uploaded': return '#2196F3';
            case 'Processing': return '#FF9800';
            case 'Completed': return '#4CAF50';
            case 'Failed': return '#F44336';
            default: return '#757575';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'PDF': return '📄';
            case 'Excel': return '📊';
            case 'Word': return '📝';
            case 'CSV': return '📋';
            case 'Image': return '🖼️';
            default: return '📄';
        }
    };

    const filteredDocuments = documents.filter(doc => {
        return selectedCategory === 'All' || doc.category === selectedCategory;
    });

    const handleUploadDocument = () => {
        Alert.alert(
            '📤 Upload Document',
            'Choose document type to upload:',
            [
                { text: '🖼️ Image File (JPG, PNG)', onPress: () => selectImage() },
                { text: '📄 PDF Document', onPress: () => selectPDF() },
                { text: '📊 Excel Spreadsheet', onPress: () => simulateUpload('Excel') },
                { text: '📝 Word Document', onPress: () => simulateUpload('Word') },
                { text: '📋 CSV File', onPress: () => simulateUpload('CSV') },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                // Check if permission is already granted
                const hasPermission = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                );

                if (hasPermission) {
                    return true;
                }

                // Request permission
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message: 'This app needs access to your storage to select PDF files and images.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );

                console.log('Permission result:', granted);
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn('Permission error:', err);
                return false;
            }
        }
        return true; // iOS doesn't need explicit permission for file picker
    };

    const selectImage = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            Alert.alert(
                'Permission Denied',
                'Storage permission is required to select images. Please go to Settings > Apps > SmartHome > Permissions and enable Storage access.',
                [
                    { text: 'OK', style: 'default' },
                    { text: 'Try Anyway', onPress: () => selectImageWithoutPermission() }
                ]
            );
            return;
        }

        selectImageWithPermission();
    };

    const selectImageWithPermission = () => {
        const options = {
            mediaType: 'photo' as const,
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                Alert.alert('Error', `Failed to pick image: ${response.errorMessage}`);
            } else if (response.assets && response.assets[0]) {
                const image = response.assets[0];
                addDocumentToState({
                    name: image.fileName || `Image_${Date.now()}.jpg`,
                    type: 'Image',
                    size: `${Math.round((image.fileSize || 0) / 1024)} KB`,
                    category: 'General',
                    previewUrl: image.uri
                });
            }
        });
    };

    const selectImageWithoutPermission = () => {
        // Try to launch image picker without permission (might work on some devices)
        const options = {
            mediaType: 'photo' as const,
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                Alert.alert('Error', 'Permission denied. Please enable storage access in app settings.');
            } else if (response.assets && response.assets[0]) {
                const image = response.assets[0];
                addDocumentToState({
                    name: image.fileName || `Image_${Date.now()}.jpg`,
                    type: 'Image',
                    size: `${Math.round((image.fileSize || 0) / 1024)} KB`,
                    category: 'General',
                    previewUrl: image.uri
                });
            }
        });
    };

    const selectPDF = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Storage permission is required to select PDF files.');
            return;
        }

        // For PDF selection, we'll use a more specific approach
        Alert.alert(
            'Select PDF',
            'Choose how you want to select the PDF:',
            [
                {
                    text: 'From Gallery',
                    onPress: () => selectPDFFromGallery()
                },
                {
                    text: 'From Files',
                    onPress: () => selectPDFFromFiles()
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        );
    };

    const selectPDFFromGallery = () => {
        const options = {
            mediaType: 'mixed' as const,
            includeBase64: false,
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled PDF picker');
            } else if (response.errorCode) {
                Alert.alert('Error', 'Failed to pick PDF');
            } else if (response.assets && response.assets[0]) {
                const file = response.assets[0];
                const fileName = file.fileName || `Document_${Date.now()}.pdf`;

                // Check if it's a PDF file
                if (fileName.toLowerCase().endsWith('.pdf')) {
                    addDocumentToState({
                        name: fileName,
                        type: 'PDF',
                        size: `${Math.round((file.fileSize || 0) / 1024)} KB`,
                        category: 'Reports',
                        previewUrl: file.uri
                    });
                } else {
                    Alert.alert('Error', 'Please select a PDF file');
                }
            }
        });
    };

    const selectPDFFromFiles = () => {
        // This would typically use react-native-document-picker
        // For now, we'll show an alert and simulate the selection
        Alert.alert(
            'File Selection',
            'In a real app, this would open the file picker to select PDF files from your device storage.',
            [
                {
                    text: 'Simulate PDF Selection',
                    onPress: () => {
                        // Simulate adding a PDF document
                        addDocumentToState({
                            name: `Sample_PDF_${Date.now()}.pdf`,
                            type: 'PDF',
                            size: '245 KB',
                            category: 'Reports',
                            previewUrl: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=PDF+Preview'
                        });
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        );
    };

    const addDocumentToState = (documentData: Partial<Document>) => {
        const newDocument: Document = {
            id: Date.now().toString(),
            name: documentData.name || 'Unknown Document',
            type: documentData.type as 'PDF' | 'Excel' | 'Word' | 'CSV' | 'Image',
            size: documentData.size || '0 KB',
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'Uploaded',
            category: documentData.category || 'General',
            previewUrl: documentData.previewUrl
        };

        setDocuments(prevDocs => [newDocument, ...prevDocs]);
        Alert.alert('Success', `${newDocument.type} document uploaded successfully!`);
    };

    const simulateUpload = (type: string) => {
        Alert.alert(
            'Uploading...',
            `Simulating upload of ${type} document. In a real app, this would open file picker.`,
            [
                {
                    text: 'OK', onPress: () => {
                        Alert.alert('Success', `${type} document uploaded successfully!`);
                    }
                }
            ]
        );
    };

    const handleViewDocument = (document: Document) => {
        const actions: Array<{ text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }> = [];

        // Add preview option for images and PDFs
        if (document.previewUrl && (document.type === 'Image' || document.type === 'PDF')) {
            actions.push({
                text: '🖼️ Preview',
                onPress: () => {
                    setSelectedDocument(document);
                    setPreviewModalVisible(true);
                }
            });
        }

        actions.push(
            { text: 'Download', onPress: () => Alert.alert('Download', 'Document download started') },
            { text: '🗑️ Delete', style: 'destructive', onPress: () => handleDeleteDocument(document) },
            { text: 'Close', style: 'cancel' }
        );

        Alert.alert(
            'Document Details',
            `Name: ${document.name}\nType: ${document.type}\nSize: ${document.size}\nCategory: ${document.category}\nStatus: ${document.status}`,
            actions
        );
    };

    const handleDeleteDocument = (document: Document) => {
        Alert.alert(
            '🗑️ Delete Document',
            `Are you sure you want to delete "${document.name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== document.id));
                        Alert.alert('Deleted', `${document.name} has been removed`);
                    }
                }
            ]
        );
    };

    const renderDocumentItem = ({ item }: { item: Document }) => (
        <TouchableOpacity style={styles.documentCard} onPress={() => handleViewDocument(item)}>
            <View style={styles.documentHeader}>
                <View style={styles.documentIcon}>
                    <Text style={styles.iconText}>{getTypeIcon(item.type)}</Text>
                </View>
                <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>{item.name}</Text>
                    <Text style={styles.documentType}>{item.type} • {item.size}</Text>
                    <Text style={styles.documentCategory}>{item.category}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.documentFooter}>
                <Text style={styles.uploadDate}>Uploaded: {item.uploadDate}</Text>
            </View>
        </TouchableOpacity>
    );

    const completedDocuments = documents.filter(doc => doc.status === 'Completed').length;
    const totalDocuments = documents.length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>⬅️</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Document Import</Text>
                <TouchableOpacity style={styles.uploadBtn} onPress={handleUploadDocument}>
                    <Text style={styles.uploadIcon}>📄</Text>
                </TouchableOpacity>
            </View>

            {/* Quick Stats */}
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
                    <View style={[styles.statCard, { borderLeftColor: '#673AB7' }]}>
                        <Text style={[styles.statValue, { color: '#673AB7' }]}>{totalDocuments}</Text>
                        <Text style={styles.statLabel}>Total Documents</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#4CAF50' }]}>
                        <Text style={[styles.statValue, { color: '#4CAF50' }]}>{completedDocuments}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#FF9800' }]}>
                        <Text style={[styles.statValue, { color: '#FF9800' }]}>
                            {documents.filter(doc => doc.status === 'Processing').length}
                        </Text>
                        <Text style={styles.statLabel}>Processing</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#2196F3' }]}>
                        <Text style={[styles.statValue, { color: '#2196F3' }]}>
                            {documents.filter(doc => doc.status === 'Uploaded').length}
                        </Text>
                        <Text style={styles.statLabel}>Uploaded</Text>
                    </View>
                    <View style={[styles.statCard, { borderLeftColor: '#F44336' }]}>
                        <Text style={[styles.statValue, { color: '#F44336' }]}>
                            {documents.filter(doc => doc.status === 'Failed').length}
                        </Text>
                        <Text style={styles.statLabel}>Failed</Text>
                    </View>
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

            {/* Documents List */}
            <FlatList
                data={filteredDocuments}
                renderItem={renderDocumentItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Import Instructions */}
            <View style={styles.instructionsCard}>
                <Text style={styles.instructionsTitle}>📄 Import Instructions</Text>
                <View style={styles.instructionItem}>
                    <Text style={styles.instructionText}>• Supported formats: PDF, Excel, Word, CSV, Images</Text>
                </View>
                <View style={styles.instructionItem}>
                    <Text style={styles.instructionText}>• Maximum file size: 10 MB per document</Text>
                </View>
                <View style={styles.instructionItem}>
                    <Text style={styles.instructionText}>• Documents are automatically categorized</Text>
                </View>
                <View style={styles.instructionItem}>
                    <Text style={styles.instructionText}>• Processing time depends on file size</Text>
                </View>
            </View>

            {/* Preview Modal */}
            <Modal
                visible={previewModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setPreviewModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {selectedDocument?.name}
                            </Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setPreviewModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {selectedDocument?.previewUrl && (
                            <View style={styles.previewContainer}>
                                <Image
                                    source={{ uri: selectedDocument.previewUrl }}
                                    style={styles.previewImage}
                                    resizeMode="contain"
                                />
                            </View>
                        )}

                        <View style={styles.modalFooter}>
                            <Text style={styles.modalInfo}>
                                Type: {selectedDocument?.type} • Size: {selectedDocument?.size}
                            </Text>
                            <TouchableOpacity
                                style={styles.downloadButton}
                                onPress={() => {
                                    Alert.alert('Download', 'Document download started');
                                    setPreviewModalVisible(false);
                                }}
                            >
                                <Text style={styles.downloadButtonText}>Download</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    uploadBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#673AB7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadIcon: {
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
    documentCard: {
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
    documentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    documentIcon: {
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
    documentInfo: {
        flex: 1,
    },
    documentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 2,
    },
    documentType: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    documentCategory: {
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
    documentFooter: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    uploadDate: {
        fontSize: 12,
        color: '#666',
    },
    instructionsCard: {
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
    instructionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 12,
    },
    instructionItem: {
        marginBottom: 8,
    },
    instructionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    // Preview Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 20,
        maxHeight: '80%',
        width: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        flex: 1,
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    previewContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
    },
    previewImage: {
        width: '100%',
        height: 300,
        borderRadius: 8,
    },
    modalFooter: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    modalInfo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        textAlign: 'center',
    },
    downloadButton: {
        backgroundColor: '#673AB7',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DocumentImportScreen; 