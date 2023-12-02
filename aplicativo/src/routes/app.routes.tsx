import { Platform } from 'react-native';
import { Icon, useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { Home } from '@screens/Home';
import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';
import { Profile } from '@screens/Profile';
import { Shopping } from '@screens/Shopping';
import { Product } from '@screens/Product';
import { Alimentacao } from '@screens/Alimentacao';

type AppRoutes = {
  home: undefined;
  exercise: {
    exerciseId: string;
  };
  profile: undefined;
  history: undefined;
  shopping: undefined;
  alimentacao: undefined;
  product: {
    exerciseId: string;
  };
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6]
      }
    }}>
      <Screen 
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color,  }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name='history'
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name='shopping'
        component={Shopping}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon 
              as={MaterialIcons}
              name="shopping-cart"
              color={color}
              size={6}
            />
          )
        }}
      />

      <Screen 
        name='alimentacao'
        component={Alimentacao}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon 
              as={Feather}
              name="coffee"
              color={color}
              size={6}
            />
          )
        }}
      />

      <Screen 
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name='exercise'
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />

      <Screen 
        name='product'
        component={Product}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}