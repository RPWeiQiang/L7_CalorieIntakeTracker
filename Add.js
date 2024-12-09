import React, {useState} from "react";
import {datasource} from "./Data";
import {TextInput, View, Text, Button, Image, StyleSheet,Alert} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Addstyle = StyleSheet.create({
    container: {
        padding: 10,
    },
    foodImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    foodImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    select:{
        margin: 10,
        borderWidth:1,
    },
    selectText:{
        fontWeight:"bold",
        paddingHorizontal:10,
        paddingTop:10
    }

});

const Add = ({navigation}) => {
    const [food,setFood] = useState('');
    const [calorie,setCalorie] = useState(0);
    const [type, setType] = useState('Breakfast');
    const [img,setImg] = useState('');
    return (
        <View style={Addstyle.container}>
            <View style={{padding:10}}>
                <Text style={{fontWeight:'bold',paddingBottom:10}}>Food:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setFood(text)}></TextInput>
            </View>
            <View style={{padding:10}}>
                <Text style={{fontWeight:'bold',paddingBottom:10}}>Calories:</Text>
                <TextInput  style={{borderWidth:1}} onChangeText={(text) => setCalorie(Number(text))} ></TextInput>
            </View>
            <Text style={Addstyle.selectText}>Food Eaten during:</Text>
            <View style={Addstyle.select} >
                <RNPickerSelect
                    value={type}
                    onValueChange={(value)=>setType(value)}
                    items={[
                        {label:'Breakfast', value:'Breakfast'},
                        {label:'Lunch', value:'Lunch'},
                        {label:'Dinner', value:'Dinner'},

                    ]}
                />
            </View>
            <View style={{padding:10}}>
                <Text style={{fontWeight:'bold',paddingBottom:10}}>Food Image Link:</Text>
                <TextInput style={{borderWidth:1,}} onChangeText={(text)=>setImg(text)} ></TextInput>
            </View>
            <View style={Addstyle.foodImageContainer}>
                <Image source={{ uri: img }} style={Addstyle.foodImage} />
            </View>
            <Button title="Add"
                    color="#007b9f"
                onPress={() => {
                    if (!food || !img || calorie <= 0 || isNaN(calorie)) {
                        Alert.alert(
                            "Invalid Input", "Please ensure all fields are filled correctly", [{text: "Ok"}]
                        );
                        return;
                    }

                    let item = {key: food, img: img, calorie: calorie};
                    let indexNum = 0;
                    if (type === "Dinner") {
                        indexNum = 2;
                    } else if (type === "Lunch") {
                        indexNum = 1;
                    }
                    datasource[indexNum].data.push(item);
                    navigation.navigate('Home')
                }
            }
            >SUBMIT</Button>
        </View>
    );
};

export default Add;
