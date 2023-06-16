//import liraries
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Image} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

// create a component
const Details = ({route}) => {
  const navigation = useNavigation();
  const { useData} = route.params;
  
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      // setUserData({});
      showSuccessToastOnSignout();
      navigation.navigate('Reddit');
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
    // const [useData, setUserData] = useState({});
    
  };
  const showSuccessToastOnSignout = () => {
    Toast.show({
      type: 'success',
      text1: 'Sign Out Successfully',
      visibilityTime: 2000, // Duration of the toast in milliseconds
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <Image
       source={require('C:/Users/ASUS/Desktop/SocialAuth/android/app/src/main/res/drawable/redditappicon.png')}
        style={{width: 150, height: 150}}
      />
      <Text style={{color: 'red', fontSize: 20, marginVertical: 15}}>
        Sign in Details
      </Text>
      <View style={{width: '80%'}}>
        <Text style={{color: 'black', fontSize: 20}}>
          UID: <Text>{useData.uid}</Text>{' '}
        </Text>
        <Text style={{color: 'black', fontSize: 20}}>
          Name: <Text> {useData.displayName}</Text>{' '}
        </Text>
        <Text style={{color: 'black', fontSize: 20}}>
          Email: <Text> {useData.email}</Text>{' '}
        </Text>
        <Text style={{color: 'black', fontSize: 20}}>
          Provider ID:<Text> {useData.providerId}</Text>{' '}
        </Text>
        <Text style={{color: 'black', fontSize: 20}}>
          Email Verified: <Text> {useData.emailVerified ? 'true' : ''}</Text>{' '}
        </Text>
        {useData.phoneNumber !== null ? (
          <Text style={{color: 'black', fontSize: 20}}>
            Phone Number: {useData.phoneNumber}
          </Text>
        ) : (
          <Text style={{color: 'black', fontSize: 20}}>Phone Number: null</Text>
        )}
        {useData.tenantId !== null ? (
          <Text style={{color: 'black', fontSize: 20}}>
            TenantID: {useData.tenantId}
          </Text>
        ) : (
          <Text style={{color: 'black', fontSize: 20}}>TenantID: null</Text>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          justifyContent: 'space-evenly',
          
        }}>
        <Pressable
          onPress={signOut}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FF4400',
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 20,
            height: 45,
            width: '45%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 15}}>Signout Google </Text>
          <FontAwesomeIcon icon={faGoogle} size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
};
// define your style
//make this component available to the app
export default Details;
