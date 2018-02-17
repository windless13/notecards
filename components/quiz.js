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
            total: _.size(this.questions),
            answerShown: false,
            totalCorrect: 0,
        };

        this.advanceQuestion = _.bind(this.advanceQuestion, this);
        this.finishedScreen = _.bind(this.finishedScreen, this);
    }

    finishedScreen() {
        const { navigation } = this.props;
        const { total, totalCorrect } = this.state;
        const percentage = Math.round((totalCorrect / total) * 100);

        return (
            <Wrapper>
                <Body>
                    You got {percentage}% question correct!
                </Body>
                <Buttons>
                    <StyledButton
                        style={styles.button}
                        onPress={()=>{
                            this.setState({
                                current: 1,
                                totalCorrect: 0,
                            });
                        }}
                    >
                        <ButtonText> Start Over </ButtonText>
                    </StyledButton>
                    <Text
                        onPress={() => navigation.navigate('Home')}
                    >
                        Go back to other decks
                    </Text>
                </Buttons>
            </Wrapper>
        );
    }

    advanceQuestion(isCorrect) {
        this.setState((prevState => ({
            current: prevState.current + 1,
            totalCorrect: isCorrect ? (prevState.totalCorrect + 1) : prevState.totalCorrect,
        })));
    }

    render() {
        const { current, total, answerShown } = this.state;
        if (current > total) {
            return this.finishedScreen();
        } else {
            const { question, answer } = this.questions[(current) - 1];

            return (
                <View style={{flex: 1}}>
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
                            onPress={()=>{
                                this.advanceQuestion(true);
                            }}
                        >
                            <ButtonText> Correct </ButtonText>
                        </StyledButton>
                        <StyledButton
                            color="red"
                            style={styles.button}
                            onPress={()=>{
                                this.advanceQuestion(false);
                            }}
                        >
                            <ButtonText inverse> Incorrect </ButtonText>
                        </StyledButton>
                    </Buttons>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
    }
});
