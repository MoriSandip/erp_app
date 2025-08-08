 import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
 import React, { useState, useEffect } from 'react'
 
 const RouteScreen = () => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     // Show loader for 2.5 seconds when component mounts
     const timer = setTimeout(() => {
       setIsLoading(false);
     }, 2500);

     return () => clearTimeout(timer);
   }, []);

   return (
     <View style={styles.container}>
       {isLoading ? (
         <View style={styles.loaderContainer}>
           <ActivityIndicator size="large" color="#673AB7" />
           <Text style={styles.loaderText}>Loading routes...</Text>
         </View>
       ) : (
         <View style={styles.content}>
           <Text style={styles.text}>RouteScreen</Text>
         </View>
       )}
     </View>
   )
 }
 
 const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: '#f5f5f5' },
   content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
   text: { fontSize: 24, fontWeight: 'bold' },
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

 export default RouteScreen