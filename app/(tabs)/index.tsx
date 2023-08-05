import { FlatList, StyleSheet } from 'react-native';
import tweets from '../../assets/data/tweets';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Tweet from '@/components/Tweet';

export default function TabOneScreen() {
  return (
    <View style={styles.page}>
          <FlatList data={tweets} renderItem={({ item }) => <Tweet tweet={item} />} />
    </View>
  );
}

const styles = StyleSheet.create({

    page: {
      flex: 1,
      backgroundColor: 'white',
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
