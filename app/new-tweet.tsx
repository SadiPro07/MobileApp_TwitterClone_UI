import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { createTweet } from "@/lib/api/tweets";
const user = {
  id: "u1",
  username: "VadimNotJustDev",
  name: "Vadim",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png",
};

export default function Tweet() {
    const [text, setText] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, mutateAsync } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {

      queryClient.setQueriesData(['tweets'], (existingTweets) => {
        return [data, ...existingTweets]
      })
      // queryClient.invalidateQueries({queryKey: ['tweets']})
    }
  });

  
  const onTweetPress = async () => {
    try {

    await mutateAsync({ content: text })
      console.log("Posting tweets ...");
      setText("");
      router.back();
    }
    catch (error) {
      console.log("error", error); 
    }
    };

  return (
      <SafeAreaView style={{
          flex: 1, backgroundColor: "white", marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : 10
      }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Link href="../" style={{ fontSize: 18 }}>
            Cancel
          </Link>
          {isLoading && <ActivityIndicator />}
          <Pressable onPress={onTweetPress} style={styles.button}>
            <Text style={styles.buttonText}>Tweet</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Image src={user.image} style={styles.image} />
          <TextInput
            onChangeText={(newValue) => setText(newValue)}
            placeholder="What's in your mind "
            multiline
            numberOfLines={5}
            style={{ flex: 1 }}
          />
        </View>

        {isError && <Text>Error : {error.message}</Text>}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1C9BF0",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
