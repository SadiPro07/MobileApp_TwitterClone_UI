import { withLayoutContext } from 'expo-router';
import {
    DrawerContentScrollView,
    DrawerItemList,
    createDrawerNavigator,
  } from '@react-navigation/drawer';
  import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    initialRouteName: '(tabs)',
}


function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            
        <Text style={{ alignSelf: 'center', fontSize: 20 }}>Saad</Text>
                <DrawerItemList {...props} />
            
      </DrawerContentScrollView>
    );
  }

export default function DrawerLayout() {
  const { authToken } = useAuth();

  if (!authToken) {
    return <ActivityIndicator />;
  }

    return <Drawer  drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name='(tabs)' options={{ headerShown: false, title:"Home" }}
        ></Drawer.Screen>

        <Drawer.Screen name='bookmarks' options={{ headerShown: false, title: "Bookmarks" }}></Drawer.Screen>

        
        <Drawer.Screen name='twitter-blue' options={{ headerShown: false, title: "TwitterBlue" }}></Drawer.Screen>



    </Drawer>
}