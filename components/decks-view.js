import React from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
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

    }

    render() {
        DatabaseAPI.getDecks()
            .then((decks) => {
                this.setState({ decks: _.values(decks) });
            });

        const { navigation } = this.props;

        return (
            <View>
                <FlatList
                    data={this.state.decks}
                    renderItem={({item}) => {
                        return (
                            <Deck key={item.title}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Deck', { id: 'particular deck' })}
                                >
                                    <DeckText>{item.title}</DeckText>
                                    <NumCards>{_.size(item.questions)} NumCards</NumCards>
                                </TouchableOpacity>
                            </Deck>
                        );
                    }}
                />
            </View>
        );
    }
}
