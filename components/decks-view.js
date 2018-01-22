import React from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as DatabaseAPI from '../Database.js';

const Deck = styled.View`
    padding: 30px 0;
    border-bottom-width: 1;
`;

const DeckText = styled.Text`
    font-size: 30px;
    text-align: center;
`;

const NumCards = styled.Text`
    font-size: 22px;
    text-align: center;
    color: gray;
`;



export default class DecksView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            decks: [],
        };
    }

    componentDidMount() {
        DatabaseAPI.getDecks()
            .then((decks) => {
                this.setState({ decks });
            });
    }

    render() {
        const { navigation } = this.props;

        return (
            <View>
                {_.map(this.state.decks, (deck) => {
                    return (
                        <Deck key={deck.title}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Deck', { test: 'hellos' })}
                            >
                                <DeckText>{deck.title}</DeckText>
                                <NumCards>{_.size(deck.questions)} cards</NumCards>
                            </TouchableOpacity>
                        </Deck>
                    );
                })}
            </View>
        );
    }
}
