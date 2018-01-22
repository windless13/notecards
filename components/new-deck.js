import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const TabView = styled.View`
    background-color: green;
`;

const TabText = styled.Text`
    background-color: red;
`;



export default function NewDeck({ navigation }){
    return (
        <TabView>
            <TabText>
                New deck
            </TabText>


        </TabView>
    );
}
