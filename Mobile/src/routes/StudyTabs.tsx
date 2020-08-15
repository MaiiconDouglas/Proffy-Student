import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs(){
  return (
    <Navigator
      tabBarOptions={{  // remove a sombra no IOS
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {  // eu quero que tenho um Icone e um texto do lado do outro
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        //A cor de fundo quando ela não está selecionada
        inactiveBackgroundColor: '#FAFaFC',
        // E a cor de fundo quando a aba estiver ativa
        activeBackgroundColor: '#EBEBF5',
        // E a cor do texto quando a aba não está selecionada
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264D',
      }}
    >
      <Screen       
      name="TeacherList" 
      component={TeacherList}
      options={{
        tabBarLabel: 'Proffys',
        tabBarIcon: ({ color, size, focused }) => {
          return (
            <Ionicons name="ios-easel"  size={size} color={focused ? '#8257e5' : color} />
          );
        }
      }}
      />

      <Screen 
      name="Favorites" 
      component={Favorites} 
      options={{
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({ color, size, focused }) => {
          return (
            <Ionicons name="ios-heart"  size={size} color={focused ? '#8257e5' : color} />
          );
        }
      }}
      />

    </Navigator>
  );
  }
export default StudyTabs;