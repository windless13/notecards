import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const APP = 'notecard-app-decks';

export const getDecks = async () => {
    try {
        return JSON.parse(await AsyncStorage.getItem(APP));
    } catch (error) {
        console.log(error);
    }
}

export const getDeck = async (title) => {
    try {
        const decks = await getDecks();
        return decks[title];
    } catch (error) {
        console.log(error);
    }

}

export const saveDeckTitle = (title) => {
    try {
        return AsyncStorage.mergeItem(APP, JSON.stringify({
            [title]: {
                title,
                questions: [],
            },
        }));
    } catch (error) {
        console.log(error);
    }

}

export const addCardToDeck = async (title, card) => {
    try {
        const decks = JSON.parse(await AsyncStorage.getItem(APP));
        if (!_.has(decks, title)) {
            throw new Error(`${title} does not exist in deck`);
        }
        const cardSet = _.concat(decks[title].questions, card);

        return AsyncStorage.mergeItem(APP, JSON.stringify({
            [title]: {
                questions: cardSet,
            },
        }));
    } catch (error) {
        console.log(error);
    }

}

export const test = async () => {
    await saveDeckTitle('alabama');
    await addCardToDeck('nope', 'card3');
    // const decks = await getDecks();
    console.log(await getDecks());

    // const decks = getDecks();
    // decks.then((result) => {
    //     console.log('inside promise');
    //     console.log(result);
    // });
    // console.log('done with test');
}
