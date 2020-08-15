import React from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
//BorderlessButton  e um botao sem fundo

import backIcon from '../../assets/images/icons/back.png'
import logoImg from "../../assets/images/logo.png";

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface PageHeaderProps{
  title: string;

}

const PageHeader: React.FC<PageHeaderProps> = ({ title } ) => {
  const {navigate} = useNavigation();


  function handlerGoBack() {
    navigate('Landing'); // ele força voltar pra landing
  }

  return (
  <View  style={styles.container}>
    <View style={styles.topBar}>
      <BorderlessButton onPress={handlerGoBack}>
        <Image source={backIcon}  resizeMode="contain" />
      </BorderlessButton>

      <Image source={logoImg} resizeMode="contain" />
    </View>

    <Text style={styles.title}>{title}</Text>
  </View>
  )
}

export default PageHeader;