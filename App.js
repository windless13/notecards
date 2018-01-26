import React from 'react';
import _ from 'lodash';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as DatabaseAPI from './Database.js';
import { StackNavigator, TabNavigator } from 'react-navigation';
import DecksView from './components/decks-view.js';
import NewDeck from './components/new-deck.js';
import Quiz from './components/quiz.js';
import Deck from './components/deck.js';
import NewQuestion from './components/new-question.js';
import InitialDecks from './InitialDecks.json';

// //              tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />

const Tabs = TabNavigator({
    Decks: {
        screen: DecksView,
    },
    New: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add New Deck',
        },
    }
}, {
    tabBarPosition: 'top',
    tabBarOptions: {
        labelStyle: {
            fontSize: 20,
        },
        tabStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        style: {
            height: 56,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1,
            zIndex: 10,
        }
    }
});

const Stack = StackNavigator({
    Home: {
        screen: Tabs,
    },
    Deck: {
        screen: Deck,
    },
    Quiz: {
        screen: Quiz,
    },
    NewQuestion: {
        screen: NewQuestion,
    },
});


const loadJsonDecks = () => {
    for (var key in InitialDecks) {
        if (InitialDecks.hasOwnProperty(key)) {
            const deck = InitialDecks[key];
            DatabaseAPI.saveDeckTitle(deck.title);

            _.forEach(deck.questions, (question) => {
                DatabaseAPI.addCardToDeck(deck.title, question);
            });
        }
    }
};

export default class App extends React.Component {
    componentDidMount() {
        loadJsonDecks();
        console.disableYellowBox = true;
    }

    render() {
        return (
            <View style={styles.container}>
                <Stack />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
