import React from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
`;

const Buttons = styled.View`

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

const Body = styled.Text`
    padding: 40px 10px;
    font-size: 48px;
`;

const Header = styled.Text`
`;

const ButtonText = styled.Text`
    font-size: 24px;
    text-align: center;
    color: black;

    ${props => props.color && `
        color: ${props.color};
    `}
`;

export default class Deck extends React.Component {
    constructor(props) {
        super(props);

        const { deck } = props.navigation.state.params;

        this.questions = deck.questions;

        this.state = {
            current: 1,
            total: 1,
            answerShown: false,
        };
    }
    render() {
        const { current, total, answerShown } = this.state;
        const { question, answer } = this.questions[(current) - 1];

        return (
            <View style={{ flex: 1 }}>
                <Header>
                    {current}/{total}
                </Header>
                <Wrapper>
                    <Body>
                        { answerShown
                            ? answer
                            : question
                        }
                    </Body>
                </Wrapper>
                <Buttons>
                    <StyledButton
                        style={styles.button}
                        onPress={_.noop}
                    >
                        <ButtonText> Correct </ButtonText>
                    </StyledButton>
                    <StyledButton
                        color="red"
                        style={styles.button}
                        onPress={_.noop}
                    >
                        <ButtonText inverse> Incorrect </ButtonText>
                    </StyledButton>
                </Buttons>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
    }
});
