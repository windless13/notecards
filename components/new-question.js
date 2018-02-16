import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, TextInput, View, Button } from 'react-native';

const SubmitWrapper = styled.View`
    padding-vertical: 20px;
    flex-direction: row;
    justify-content: center;
`;

const Submit = styled.TouchableOpacity`
    background-color: black;
    padding-vertical: 20px;
    flex: 0.5;
`;

const SubmitText = styled.Text`
    color: white;
    font-size: 32px;
    text-align: center;
`;

const InputContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export default class NewQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answer: '',
        };
    }

    render() {
        return (
            <View>
                <InputContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={(question) => this.setState({ question })}
                        value={this.state.question}
                        placeholder="Question"
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={(answer) => this.setState({ answer })}
                        value={this.state.questio}
                        placeholder="Answer"
                    />
                </InputContainer>
                <SubmitWrapper>
                    <Submit style={styles.button}>
                        <SubmitText>Submit</SubmitText>
                    </Submit>
                </SubmitWrapper>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
    },
    input: {
        marginVertical: 10,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 28,
        flex: 0.8,
    },
});
