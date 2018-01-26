import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import * as DatabaseAPI from '../Database.js';

const Container = styled.View`
`;

const InputContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const Title = styled.Text`
    font-size: 50px;
    text-align: center;
    padding: 50px 10px;
    backgroundColor: transparent;
`;

const ButtonText = styled.Text`
    font-size: 36px;
    color: white;
    text-align: center;
`;

export default class NewDeck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
        };
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <View>
                    <Title>
                        What is the title of your new deck?
                    </Title>
                </View>
                <InputContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}
                        placeholder="Enter New Title"
                    />
                </InputContainer>

                <ButtonContainer>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            DatabaseAPI.saveDeckTitle(this.state.title);
                            navigation.navigate('Decks');
                            navigation.navigate('Deck', { id: this.state.title });
                        }}
                    >
                        <ButtonText>
                            Submit
                        </ButtonText>
                    </TouchableOpacity>
                </ButtonContainer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 50,
        backgroundColor: 'black',
        paddingHorizontal: 50,
        paddingVertical: 30,
        width: 50,
        flex: 0.5,
        borderRadius: 20,
    },
    input: {
        flex: 0.8,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 28,    },
});
