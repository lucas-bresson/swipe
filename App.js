import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/components/Deck';
import data from './src/data';

const App = () => {
  const renderCard = item => (
    <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
      <Text style={styles.text}>Lorem ipsum</Text>
      <Button
        icon={{ name: 'code' }}
        backgroundColor="#03A9F4"
        title="View now"
      />
    </Card>
  );

  const renderNoMoreCards = () => (
    <Card title="All done!">
      <Text style={styles.text}>There's no more content here</Text>
      <Button backgroundColor="#03A9F4" title="Get more" />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Deck
        data={data}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  text: {
    marginBottom: 10,
  },
});
