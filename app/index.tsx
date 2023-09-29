import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, useRouter, router } from 'expo-router'

// import { router } from "expo-router";



const index = () => {
            return  <Redirect href={'/feed'} />;
}

export default index