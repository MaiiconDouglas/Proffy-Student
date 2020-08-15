import React from 'react';
import { View } from 'react-native';

import PageHeader from '../../components/PageHeader'

import Styles from './styles';

function TeacherList() {
  return (
  <View style={Styles.container}>
    <PageHeader title="Proffys Disponíveis" />
  </View>
  );
}

export default TeacherList;