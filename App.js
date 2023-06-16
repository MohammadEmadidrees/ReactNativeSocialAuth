//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native-paper';
import {Image, SafeAreaView} from 'react-native';
import Toast from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import reactNativeConfig from './react-native.config';
reactNativeConfig;

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
      }}>
      <Image
        source={require('C:/Users/ASUS/Desktop/SocialAuth/android/app/src/main/res/drawable/redditappicon.png')}
        style={{width: '50%', height: '50%'}}
        resizeMode="contain"
      />
    </View>
  );
};

const App = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const showSuccessToastOnSignIn = () => {
    Toast.show({
      type: 'success',
      text1: 'Sign In Successfully',
      visibilityTime: 2000, // Duration of the toast in milliseconds
    });
  };
  const handleLogin = () => {
    if (userData) {
      navigation.navigate('Details', {useData: userData});
    } else {
      Toast.show({
        type: 'error',
        text1: 'No user registered with this email',
        visibilityTime: 2000,
      });
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '715516115458-cl09hch22eqjh9f9dh4nicv3raomde60.apps.googleusercontent.com',
    });
  }, []);

  const googleSignin = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    showSuccessToastOnSignIn();
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Image
            source={require('C:/Users/ASUS/Desktop/SocialAuth/android/app/src/main/res/drawable/redditappicon.png')}
            style={{width: 100, height: 100}}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 10,
              color: 'red',
            }}>
            Sign In
          </Text>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} sty />
        <View style={{margin: 10}}>
          <TextInput
            style={{marginVertical: 10}}
            label="Email"
            mode="outlined"
          />
          <TextInput
            style={{marginVertical: 10}}
            label="Password"
            mode="outlined"
            secureTextEntry={true}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Pressable
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              backgroundColor: '#FF4400',
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 10,
              height: 45,
              width: '45%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={handleLogin}>
            <Text style={{color: 'white', fontSize: 15}}>Login</Text>
          </Pressable>
          <Pressable
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              backgroundColor: '#FF4400',
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 10,
              height: 45,
              width: '45%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Forget Password</Text>
          </Pressable>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 10,
              color: 'red',
            }}>
            Or Sign in With Google
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          <Pressable
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              backgroundColor: '#FF4400',
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 10,
              height: 45,
              width: '45%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={() =>
              googleSignin()
                .then(res => {
                  setUserData(res.user);
                  navigation.navigate('Details', {useData: res.user});
                })
                .catch(error => console.log(error))
            }>
            <Text style={{color: 'white', fontSize: 15, marginRight: 5}}>
              Sign in Google
            </Text>
            <FontAwesomeIcon icon={faGoogle} size={20} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const MainApp = ({navigation}) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous task, e.g., fetching data or loading resources
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Set the duration for which the splash screen should be shown (in milliseconds)
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <App navigation={navigation} />;
};

export default MainApp;
