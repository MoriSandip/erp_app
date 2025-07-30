import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard';
import ERPScreen from '../screens/ERPScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import MyDashboardScreen from '../screens/MyDashboardScreen';
import RetailerScreen from '../screens/RetailerScreen';
import RetailerOrderScreen from '../screens/RetailerOrderScreen';
import RetailerStockScreen from '../screens/RetailerStockScreen';
import DistOrderScreen from '../screens/DistOrderScreen';
import DistStockScreen from '../screens/DistStockScreen';
import VisitScreen from '../screens/VisitScreen';
import RouteScreen from '../screens/RouteScreen';
import InventoryScreen from '../screens/InventoryScreen';
import SalesScreen from '../screens/SalesScreen';
import EmployeeScreen from '../screens/EmployeeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DocumentImportScreen from '../screens/DocumentImportScreen';
import LoginScreen from '../screens/auth/login';
import SignupScreen from '../screens/auth/signup';
import ForgotPasswordScreen from '../screens/auth/forgotPassword';
import ResetPasswordScreen from '../screens/auth/resetPassword';

export type RootStackParamList = {
    Dashboard: undefined;
    RoomDetail: undefined;
    ERP: undefined;
    Calendar: undefined;
    Attendance: undefined;
    MyDashboard: undefined;
    Retailer: undefined;
    RetailerOrder: undefined;
    RetailerStock: undefined;
    DistOrder: undefined;
    DistStock: undefined;
    Visit: undefined;
    Route: undefined;
    Inventory: undefined;
    Sales: undefined;
    Employee: undefined;
    Reports: undefined;
    Settings: undefined;
    DocumentImport: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                
                
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="ERP" component={ERPScreen} />
                <Stack.Screen name="Calendar" component={CalendarScreen} />
                <Stack.Screen name="Attendance" component={AttendanceScreen} />
                <Stack.Screen name="MyDashboard" component={MyDashboardScreen} />
                <Stack.Screen name="Retailer" component={RetailerScreen} />
                <Stack.Screen name="RetailerOrder" component={RetailerOrderScreen} />
                <Stack.Screen name="RetailerStock" component={RetailerStockScreen} />
                <Stack.Screen name="DistOrder" component={DistOrderScreen} />
                <Stack.Screen name="DistStock" component={DistStockScreen} />
                <Stack.Screen name="Visit" component={VisitScreen} />
                <Stack.Screen name="Route" component={RouteScreen} />
                <Stack.Screen name="Inventory" component={InventoryScreen} />
                <Stack.Screen name="Sales" component={SalesScreen} />
                <Stack.Screen name="Employee" component={EmployeeScreen} />
                <Stack.Screen name="Reports" component={ReportsScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="DocumentImport" component={DocumentImportScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator; 