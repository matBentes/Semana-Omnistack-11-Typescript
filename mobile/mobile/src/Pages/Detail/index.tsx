import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute, /* RouteProp */ } from "@react-navigation/native";
import * as MailComposer from 'expo-mail-composer'

import styles from './style'
import logoImg from "./../../assets-app/logo.png";
 
interface Incident {
  city: string,
  description: string,
  email: string,
  id: number,
  name: string,
  ong_id: string,
  title: string,
  uf: string,
  value: number,
  whatsapp: string,
}

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Profile: { incident: Incident };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

export default function Detail() {
  const navigation = useNavigation()
  
  // const route = useRoute<RouteProp<{incident: {incident: Incident}}, 'incident'>>();
  const route = useRoute<ProfileScreenRouteProp>();
  const incident = route.params.incident
  
  const message = `Ola, ${incident.name}. Estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de `

  function navigateBack() {
    navigation.goBack()
  }
 
  function sendEmail() {
    MailComposer.composeAsync({
      subject: 'Heroi do caso: Cadelinha atropelada',
      recipients: [`${incident.email}`],
      body: message
    })
  }

  function sendWhatspp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041"  />      
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>

        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>Descricao</Text>
        <Text style={styles.incidentProperty}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR</Text>
        <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format(incident.value)}
        </Text>      

      </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

          <Text>Entre em contato: </Text>

          <View style={styles.action}>
            <TouchableOpacity
              style={styles.actions} 
              onPress={sendWhatspp}
            >
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actions}
              onPress={sendEmail}
            >
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}