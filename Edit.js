import React, {useState} from "react";
import {datasource} from "./Data";
import {TextInput, View, Text, Button, Alert, Image, StyleSheet} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Editstyle = StyleSheet.create({

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


});
const Edit = ({navigation,route}) => {
    const [food,setFood] = useState(route.params.key);
    const [calorie, setCalorie] = useState(route.params.calorie);
    const [img,setImg] =useState(route.params.img);
    return (
        <View style={{padding:10}}>
            <View style={{padding:10}}>
                <Text style={{fontWeight:'bold'}}>Food:</Text>
                <TextInput value={food} style={{borderWidth:1}} onChangeText={(text)=>setFood(text)}></TextInput>
            </View>
            <View style={{padding:10}}>
                <Text style={{fontWeight:'bold'}}>Calories:</Text>
                <TextInput  value={String(calorie)} style={{borderWidth:1}} onChangeText={(text)=>setCalorie(text)}></TextInput>
            </View>
            <View style={{padding:10}}>
                <Text style={{fontWeight:'bold'}}>Food Image Link:</Text>
                <TextInput value={img} style={{borderWidth:1}} onChangeText={(text)=>setImg(text)}></TextInput>
            </View>
            <View style={Editstyle.foodImageContainer}>
                <Image source={{ uri: img }} style={Editstyle.foodImage} />
            </View>
            <View style={{padding:10,flexDirection:'row',justifyContent:'space-around'}}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button title="Save"
                            color="#007b9f"
                            onPress={()=>{
                                if (!food || !img || calorie <= 0 || isNaN(calorie)) {
                                    Alert.alert(
                                        "Invalid Input", "Please ensure all fields are filled correctly", [{ text: "Ok" }]
                                    );
                                    return;
                                }


                                let indexNum=0;
                                if (route.params.type==="Dinner"){
                                    indexNum=2;
                                } else  if(route.params.type==="Lunch"){
                                    indexNum=1;
                                }
                                datasource[indexNum].data[route.params.index].key=food;
                                datasource[indexNum].data[route.params.index].img=img;
                                datasource[indexNum].data[route.params.index].calorie=calorie;
                                navigation.navigate('Home');
                            }
                            }

                    />
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button title="Delete"
                            color="#007b9f"
                            onPress={() => {
                                let indexNum=0;
                                if (route.params.type==="Dinner"){
                                    indexNum=2;
                                } else  if(route.params.type==="Lunch"){
                                    indexNum=1;
                                }
                                Alert.alert("Are You Sure?",'',
                                    [{text:'Yes',onPress:()=>{
                                            datasource[indexNum].data.splice(route.params.index,1);
                                            navigation.navigate('Home');
                                        }},
                                        {text:'No'}]
                                )
                            }
                            }
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
