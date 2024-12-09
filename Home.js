import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    SectionList,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    TextInput
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import {datasource} from "./Data";

const styles = StyleSheet.create({
    container: {
        height:'98.5%',
    },
    foodContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 10,
        margin:12,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    foodImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 10,
        marginRight:20,
    },
    foodName: {
        width:"100%",
        fontSize: 20,
        fontWeight: 'bold',

    },
    sectionHeader: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20,
        padding:10,
        borderBottomWidth:5,
        marginHorizontal:20,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    foodContent:{
        width:'60%',
    },
    foodDes:{
        width:200,
        fontSize:15,
        color:'#434343'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    addBtn: {
        flex: 1,
        marginRight: 5,
        backgroundColor: "#007b9f",
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    calcBtn: {
        flex: 1,
        backgroundColor: "#00a7b6",
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    progressBar: {
        marginTop:5,
        backgroundColor:'#dcdcdc',
        height:10,
        width:'100%',
    }

});





const Home = ({navigation}) => {
    const [target , setTarget] = useState(0);
    const [progress, setProgress] = useState(0);
    const calculateProgress = (total, target) => {
        const progressValue = Math.round((total / target) * 100);
        return progressValue;
    };
    const handleProgress = (text) => {
        let total = 0;
        if (!text) {
            setTarget(0);
            setProgress(0);
            return;
        }
        datasource.map((section) => {
            section.data.map((item) => {
                total =total+ Number(item.calorie);
            });
        });
        if (Number(text) >= 0) {
            setTarget(Number(text));
            setProgress(calculateProgress(total, Number(text)));
        } else {
            Alert.alert("Invalid Input", "Please enter a positive number.");
            setProgress(0);
        }
    };

    const handleTotalCalories = () => {
        if (target === 0) {
            Alert.alert(
                "No Calorie Goal Set",
                "Please enter a daily calorie goal before calculating your progress.",
                [{ text: "Ok" }]
            );
            return;
        }
        let total = 0;
        datasource.map((section) => {
            section.data.map((item) => {
                total =total+ Number(item.calorie);
            });
        });
        const progressValue = calculateProgress(total, target);
        setProgress(progressValue);
        let title;
        if (progressValue < 50) {
            title = "Not there Yet, Try to eat more";
        } else if (progressValue === 50) {
            title = "You're Halfway there!";
        } else if (progressValue < 100) {
            title = "Ooh so close!";
        } else if (progressValue === 100) {
            title = "You have reached your calorie goal!";
        } else {
            title = "Went a bit too far, but calorie goal reached!";
        }

        let message;
        if (progressValue <= 100){
            message = `Calorie intake: ${total} kcal\nCalorie goal: ${target} kcal\nYou have completed ${Math.max(0, Math.min(progressValue, 100))}% of your daily calorie goal!`
        } else{
            message = `Calorie intake: ${total} kcal\nCalorie goal: ${target} kcal\nYou have exceeded your daily calorie goal by ${progressValue - 100}%!`
        }

        Alert.alert(title, message, [{ text: 'Ok' }]);
    };

    const renderItem = ({ item,section,index}) => {
        return (
            <View style={styles.foodContainer}>
                <Image source={{ uri: item.img }} style={styles.foodImage} />
                <View style={styles.foodContent}>

                    <Text style={styles.foodName}>{item.key}</Text>
                    <Text style={styles.foodDes}>{item.calorie} kcal</Text>
                    <View>

                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Edit',{index:index,type:section.title,key:item.key,img:item.img,calorie:Number(item.calorie) })}}
                >
                    <Icon name="pen" size={20} color="#454545" />
                </TouchableOpacity>
            </View>
        );
    };
    //const filteredDatasource = datasource.filter((section) => section.data.length > 0);

    return (
        <View >
            <StatusBar hidden={true} />
            <View style={styles.container}>
                <View style={{padding:10, paddingTop:20,borderRadius:15}}>
                    <Text style={{fontWeight:'bold',}}> Daily Calorie Goal:</Text>
                    <TextInput style={{borderWidth:1,}} onChangeText={handleProgress} placeholder="Enter your daily calorie goal"></TextInput>
                    <View style={styles.progressBar}>
                        <View style={{backgroundColor:'#007b9f',height:'100%',width:`${Math.max(0, Math.min(progress, 100))}%`}}/>
                    </View>
                </View>
                {datasource.every((section) => section.data.length === 0) ? (
                    <View style={{ padding: 20, alignItems: 'center',height:'80%',justifyContent:'center'}}>
                        <Text style={{ fontSize: 18, color: '#888' }}>No Food Eaten Yet</Text>
                    </View>
                ) : (
                <SectionList
                    style={{marginBottom:80}}
                    sections={datasource.filter((section) => section.data.length > 0)}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title, bgColor, textColor } }) => (
                        <View style={[{ borderColor: bgColor }, styles.sectionHeader]}>
                            <Text style={[styles.sectionTitle, { color: textColor }]}>
                                {title}
                            </Text>

                        </View>

                    )}
                />
                )}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => navigation.navigate('Add')}
                    >
                        <Text style={styles.btnText}>+ Add Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.calcBtn}
                        onPress={handleTotalCalories}
                    >
                        <Text style={styles.btnText}>Calculate Calorie</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Home;
