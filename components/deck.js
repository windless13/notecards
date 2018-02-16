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
    constructor(props) {
        super(props);

        this.state = {
            numCards: 0,
            deck: null,
        };
    }

    render() {
        const { navigation } = this.props;
        const { id: cardId } = navigation.state.params;

        DatabaseAPI.getDeck(cardId)
            .then((deck) => {
                this.setState({
                    numCards: _.size(deck.questions),
                    deck,
                });
            });

        const { numCards, deck } = this.state;

        return (
            <Container>
                <View>
                    <View style={styles.header}>
                        <Title>{cardId}</Title>
                        <SubTitle>{numCards} cards</SubTitle>
                    </View>
                    <ButtonWrapper>
                        <StyledButton
                            style={styles.button}
                            onPress={() => navigation.navigate('NewQuestion', { id: cardId })}
                        >
                            <ButtonText> Add Card </ButtonText>
                        </StyledButton>
                        <StyledButton
                            inverse
                            disabled={numCards <= 0}
                            style={styles.button}
                            onPress={() => navigation.navigate('Quiz', { deck })}
                        >
                            <ButtonText inverse> Start Quiz </ButtonText>
                        </StyledButton>
                    </ButtonWrapper>
                </View>
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
