import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const TabView = styled.View`
    background-color: green;
`;

const TabText = styled.Text`
    background-color: red;
`;



export default class Deck extends React.Component {
    constructor() {
        super();

    }


    render() {
        const { navigation } = this.props;
        const { id } = navigation.state.params;

        return (
            <TabView>
                <TabText>
                    This is a deck view for id: {id}
                </TabText>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Quiz', { deck: 'my deck id' })}
                >
                    <Text style={styles.startButton}> Start! </Text>

                </TouchableOpacity>
            </TabView>
        );
    }
}

const styles = StyleSheet.create({
    startButton: {
        textAlign: 'center',
    },
});
