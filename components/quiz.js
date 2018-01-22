import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, Button } from 'react-native';




export default function Deck({ navigation }){
    const deckId = navigation.state.params.deck;
    return (
        <View>
            <Text>
                This is a quiz view for {deckId}
            </Text>
        </View>
    );
}
