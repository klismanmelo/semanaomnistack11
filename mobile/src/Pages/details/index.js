import React from 'react';
import {View, Image, Text,  TouchableOpacity, Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import style from './style';
import logoImg from '../../assets/logo.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailCompose from 'expo-mail-composer';


export default function Details(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incidents;
    const massege = `Olá ${incident.name}, estou entrnado em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}`;

    function navigatBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailCompose.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: massege,
        })

    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${massege}`);
    }

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigatBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={style.incidents}>
                <Text style={[style.incidentsProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={style.incidentsValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentsProperty}>CASO:</Text>
                <Text style={style.incidentsValue}>{incident.title}</Text>

                <Text style={style.incidentsProperty}>VALOR:</Text>
                <Text style={style.incidentsValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value) }</Text>

            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja um herói desse caso.</Text>

                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}