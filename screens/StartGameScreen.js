import React, {useState, useEffect} from 'react'
import {View, StyleSheet,
        Text, Button, 
        TouchableWithoutFeedback, Keyboard, 
        Alert, Dimensions, ScrollView, KeyboardAvoidingView} 
    from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';

import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue,setEnteredValue] = useState('');
    const [confirmed,setConfirmed] = useState(false);
    const [selectedNum, setSelectedNum] = useState()

    const [buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 4);
    
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, '')) 
        //თუ შეტანილი ინფუთი რიცხვი არაა (ყველა სიმბოლოში = g(lobally)) ცვლის ცარიელი სტრინგით
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);
         //ეკრანის გადაბრუნება-გადმობრუნებისსას თავიდან გამოიანგარიშოს ხელმისსწვდომი სივრცე
         return () => {
             Dimensions.removeEventListener('change', updateLayout); 
         }
    })

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue);
        if ( isNaN(choseNumber) || choseNumber <=0 || choseNumber > 99){
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99.',
                    [{text:'Okay', style:'destructive',onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNum(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss()
    };

    let confirmedOutput;
    if(confirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNum}</NumberContainer>
                <MainButton 
                    title="START GAME" 
                    onPress={() => props.onStartGame(selectedNum)}>
                        START GAME
                </MainButton>
            </Card> 
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }} >
                <View style={styles.screen}>
                    <TitleText style={styles.title}>Start a New Game</TitleText>
                    <Card style={styles.inputContainer}>
                        <BodyText>Select a Number</BodyText>
                        <Input style={styles.input} 
                            blurOnSubmit 
                            autoCapitalize='none' 
                            autoCorrect={false} 
                            keyboardType="numeric" 
                            maxLength={2}
                            onChangeText={numberInputHandler}
                            value={enteredValue} />
                        <View style={styles.buttonContainer}>
                        <View style={{ width: buttonWidth}}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                        </View>
                        <View style={{ width: buttonWidth}}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                        </View>
                        </View>
                    </Card>
                    {confirmedOutput}
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding:10,
        alignItems:'center'
    },
    title: {
        fontSize: 20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    },
    inputContainer: {
        width:"80%",
        maxWidth:'95%',  
        minWidth:300,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // buttonItself: {
    //     width:Dimensions.get('window').width / 4,
    //      //API იმის გასაგებად თუ რამდენი პიქსელი გაქვს 'ხელმისაწვდომი
    // },
    input: {
        width: 50,
        textAlign:'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems:'center' 
    },
    text: {
        fontFamily:'open-sans'
    }
 
})
export default StartGameScreen