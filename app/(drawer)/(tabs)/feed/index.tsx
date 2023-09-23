import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import tweets from '../../../../assets/data/tweets'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Tweet from '@/components/Tweet';
import { useEffect, useState } from 'react';
import { listTweets } from '@/lib/api/tweets';
import { useQuery } from '@tanstack/react-query';

export default function TabOneScreen() {
  const [tweet, setTweets] = useState([]);

  const {data,error, isLoading, } = useQuery({
    queryKey: ['tweet'],
    queryFn:listTweets,
  })

  //   useEffect(() => {
//       const fetchTweets = async () => {
//           const data = await listTweets();
//           data && setTweets(data);
//       }
//       fetchTweets();
// }, []);
  console.log(data);

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error.message}</Text>
}


  return (
    <View style={styles.page}>
      <FlatList data={data} renderItem={({ item }) => <Tweet tweet={item} />} />
      
      <Link href="/new-tweet" asChild>
        <Entypo
          name="plus"
          size={24}
          color="white"
          style={styles.floatingButton}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  floatingButton: {
    backgroundColor: '#1C9BF0',

    borderRadius: 25,
    padding: 15,

    position: 'absolute',
    right: 15,
    bottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    overflow: 'hidden',
  },
});
