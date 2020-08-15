import React from 'react';
import { View } from 'react-native';

import PageHeader from '../../components/PageHeader';

import Styles from './styles';


function Favorites() {
 return (
      <View style={Styles.container}>
     <PageHeader title="Meus proffys favoritos" />
    </View>
  ) 
}

export default Favorites;