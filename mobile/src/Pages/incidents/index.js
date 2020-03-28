import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';

import logoImg from '../../assets/logo.png';

import api from '../../services/api';

import style from './style';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    function navigationToDetail(incidents){
        navigation.navigate('Details', {incidents});
    }

    async function loadincidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);
        
        const response = await api.get('incidents', {
            params: {page}
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+ 1);
        setLoading(false);

    }

    useEffect(()=> {
        loadincidents();
    }, []);

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}/>
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.subTitle}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={style.incidentsList}
                keyExtractor={incidents => String(incidents.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadincidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incidents})=>(
                    <View style={style.incidents}>
                    <Text style={style.incidentsProperty}>ONG:</Text>
                    <Text style={style.incidentsValue}>{incidents.name}</Text>

                    <Text style={style.incidentsProperty}>CASO:</Text>
                    <Text style={style.incidentsValue}>{incidents.title}</Text>

                    <Text style={style.incidentsProperty}>VALOR:</Text>
                    <Text style={style.incidentsValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value) }</Text>

                    <TouchableOpacity 
                        style={style.detailsButton}
                        onPress={() => navigationToDetail(incidents)}
                    >
                        <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>
                )}
            />

        </View>    
    );
}