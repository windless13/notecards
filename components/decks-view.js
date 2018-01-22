import React from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as DatabaseAPI from '../Database.js';

const Deck = styled.View`
    padding: 10px 0;
`;

const DeckText = styled.Text`
    font-size: 30px;
    text-align: center;
`;

const TabText = styled.Text`
    font-size: 18px;
    text-align: center;
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
                <TabText>Pick a deck to get started:</TabText>

                {_.map(this.state.decks, (deck) => {
                    return (
                        <Deck key={deck.title}>
                            <DeckText>{deck.title}</DeckText>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Deck', { test: 'hellos' })}
                            >
                                <Text style={styles.startButton}> Start! </Text>
                            </TouchableOpacity>
                        </Deck>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    startButton: {
        textAlign: 'center',
    },
});
