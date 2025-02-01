import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import Logo from '../assets/Logo.png';
import Profile from "../screens/Profile"
const Tab = createBottomTabNavigator();

const tabData = [
    {
        name: 'Home',
        component: Profile,
        icons: {
            inactive: Logo,
            active: Logo,
        },
    },
    {
        name: 'Logout',
        component: Profile,
        icons: {
            inactive: Logo,
            active: Logo,
        },
    },
    
    {
        name: 'AI Chat',
        component: Profile,
        icons: {
            inactive: Logo,
            active: Logo,
        },
    },
    {
        name: 'Profile',
        component: Profile,
        icons: {
            inactive: Logo,
            active: Logo,
        },
    },
];

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff', // Clean white background
                    borderTopWidth: 0, // No border line
                    height: 60, // Compact size
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                },
                tabBarActiveTintColor: '#f3765f', // Active icon color
                tabBarInactiveTintColor: '#6c757d', // Inactive icon color
                tabBarLabelStyle: {
                    fontSize: 10, // Smaller labels
                    fontWeight: '500', // Lighter font weight for minimalism
                    marginBottom: 7
                },
                tabBarIconStyle: {
                    width: 24,
                    height: 24,
                    margin: 0,
                },
            }}
        >
            {tabData.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? tab.icons.active : tab.icons.inactive}
                                style={{
                                    width: 24,
                                    height: 24,
                                    
                                }}
                            />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default TabNavigation;