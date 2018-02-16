import React from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native';
import * as DatabaseAPI from '../Database.js';

const Container = styled.View``;

const Title = styled.Text`
    padding-top: 30px;
    text-align: center;
    font-size: 60px;
`;

const SubTitle = styled.Text`
    text-align: center;
    font-size: 40px;
    color: gray;
`;

const StyledButton = styled.TouchableOpacity`
    margin-top: 10px;
    padding-vertical: 20px;
    border: 1px solid black;

    ${props => props.inverse && `
        background-color: black;
        border: 1px solid white;
    `}
`;

const ButtonWrapper = styled.View`
    padding-horizontal: 50px;
`;

const ButtonText = styled.Text`
    font-size: 24px;
    text-align: center;
    color: black;

    ${props => props.inverse && `
        color: white;
    `}
`;

export default class Deck extends React.Component {
    constructor() {
        super();

        this.state = {
            decks: {},
        };

        DatabaseAPI.getDecks()
            .then((decks) => {
                this.setState({decks});
            });
    }


    render() {
        const { navigation } = this.props;
        const { id } = navigation.state.params;
        const deck = this.state.decks[id];

        return (
            <Container>
                {deck && <View>
                    <View style={styles.header}>
                        <Title>{deck.title}</Title>
                        <SubTitle>{_.size(deck.questions)} cards</SubTitle>
                    </View>
                    <ButtonWrapper>
                        <StyledButton
                            style={styles.button}
                            onPress={() => navigation.navigate('NewQuestion', { id: deck.id })}
                        >
                            <ButtonText> Add Card </ButtonText>
                        </StyledButton>
                        <StyledButton
                            inverse
                            disabled={_.size(deck.questions) <= 0}
                            style={styles.button}
                            onPress={() => navigation.navigate('Quiz', { id: deck.id })}
                        >
                            <ButtonText inverse> Start Quiz </ButtonText>
                        </StyledButton>
                    </ButtonWrapper>
                </View>}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 100,
        paddingHorizontal: 20,
    },
    button: {
        borderRadius: 20,
    }
});
