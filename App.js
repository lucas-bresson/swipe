import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Linking } from 'expo';
import { useFetch } from './src/hooks';
import Deck from './src/components/Deck';

function App() {
  const stories = useFetch('https://news-proxy-server.appspot.com/topstories', []);

  const renderCard = ({ id, by, title, url }) => {
    return (
      <Card
        key={id}
        title={title}
        titleNumberOfLines={1}
        image={{
          uri: 'https://avatars1.githubusercontent.com/u/4703068?s=400&v=4',
        }}
      >
        <Text style={styles.text}>author: {by}</Text>
        <Button
          icon={{ name: 'link' }}
          backgroundColor="#03A9F4"
          title="Open in browser"
          onPress={() => Linking.openURL(url)}
        />
      </Card>
    );
  };

  const renderNoMoreCards = () => (
    <Card title="All done!">
      <Text style={styles.text}>There's no more content here</Text>
      <Button backgroundColor="#03A9F4" title="Get more" />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Deck data={stories} renderCard={renderCard} renderNoMoreCards={renderNoMoreCards} />
    </SafeAreaView>
  );
}

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
