import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { View, Button, Text, StyleSheet, ActivityIndicator, Image, Linking} from 'react-native';
import { FlatList} from 'react-native-gesture-handler';

function Home({navigation}){
  return(
    
    <View style = {styles.container}>
     <Button
    title="Go to News List"
    onPress={() => navigation.navigate('News List')}
    />
    </View>
  );
}
function NewsList(){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://newscatcher.p.rapidapi.com/v1/latest_headlines?lang=en&media=True", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "9bbc9326d3msha21930f500bfb76p19b110jsn3e0b091908ad",
		"x-rapidapi-host": "newscatcher.p.rapidapi.com"
	}})
    .then((response) => response.json())
    .then((json) => setData(json.articles))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);
    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator/> : (
         <FlatList
         data={data}
         keyExtractor={({ id }, _id) => id}
         renderItem={({ item }) => (

           <View style={{marginBottom:15, backgroundColor: "#ccc"}}>
            <Image source={{uri : item.urlToImage}} style = {styles.image}/>
            <Text style = {styles.headline}>{item.title}</Text>
         <Text>{item.summary}</Text>
            <Button
              title="Go to Article"
              onPress={() => Linking.openURL(item.link)}
            />
           </View>
          )}
        />
      )}

      </View>
    );
  
}
const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options= {{title: 'Home'}}
                   
        />
        <Stack.Screen name="News List"
        component={NewsList}
        options= {{title: 'News List'}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
      alignItems: 'stretch',
      justifyContent: 'flex-start'
  },
  headline: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 0
  },
  image: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 150,
  },
});

