import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import FavoriteScreen from "../Screen/FavoriteScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../Utils";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarActiveTintColor: Colors.primary,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="favorite"
                component={FavoriteScreen}
                options={{
                    tabBarLabel: 'Favorite',
                    tabBarActiveTintColor: Colors.primary,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarActiveTintColor: Colors.primary,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}