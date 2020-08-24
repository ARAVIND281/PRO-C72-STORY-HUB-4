import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Header } from 'react-native-elements';
import * as firebase from 'firebase';
import db from '../config'




export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      data: [],
      search: ''
    }
  }
  componentDidMount() {
    this.retrieveStories()
  }

  updateSearch = search => {
    this.setState({ search });
  };


  retrieveStories=()=>{
    
      var allStories= []
      var stories = db.collection("stories")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              allStories.push(doc.data())
          })
          this.setState({allStories})
        })
  };

  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
      search: text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#6200EE'}
          centerComponent={{
            text: 'Bed Time Stories',
            style: { color: 'white', fontSize: 20 }
          }}
        />
        <View styles={{ height: 20, width: '100%' }}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction('')}
            value={this.state.search}
          />
        </View>


        <View>
          {
            this.state.search === "" ?
              this.state.allStories.map((item) => (
                <View style={{ borderColor: "#6200EE", borderWidth: 2, padding: 10, alignItems: 'center', margin: 30 }}>
                  <Text>
                    Title : {item.title}
                  </Text>
                  <Text>
                    Author : {item.author}
                  </Text>
                </View>
              ))
              :
              this.state.data.map((item) => (
                <View style={{ borderColor: "#6200EE", borderWidth: 2, padding: 10, alignItems: 'center', margin: 30 }}>
                  <Text>
                    Title : {item.title}
                  </Text>
                  <Text>
                    Author : {item.author}
                  </Text>
                </View>
              ))
          }
        </View>



      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#6200EE',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width: '100%',
    borderWidth: 2,
    borderColor: '#6200EE',
    justifyContent: 'center',
    alignSelf: 'center',
  }
});