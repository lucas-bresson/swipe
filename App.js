import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/components/Deck';
import data from './src/data';

const App = () => {
  const renderCard = item => (
    <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
      <Text style={{ marginBottom: 10 }}>Lorem ipsum</Text>
      <Button
        icon={{ name: 'code' }}
        backgroundColor="#03A9F4"
        title="View now"
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Deck
        data={data}
        renderCard={renderCard}
        onSwipeLeft={() => console.log('swiped left')}
        onSwipeRight={() => console.log('swiped right')}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
