import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoginForm from '../../Components/LoginForm';
import styles from './signIn.styles';
import {setUser} from '../../Management/Features/userSlice';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {doc, onSnapshot} from 'firebase/firestore';
import {auth, db} from '../../../config';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const signInButton = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword).then(
      async response => {
        fetchMyInfo(response.user.uid);
      },
    );
  };

  const fetchMyInfo = myId => {
    // eslint-disable-next-line
    const unSub = onSnapshot(doc(db, 'users', myId), (doc) => {
      doc.exists() && dispatch(setUser(doc.data()));
    });
    return () => {
      unSub();
    };
  };

  const signUpButton = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <LoginForm
        brandName={require('../../Assets/brandName.png')}
        holder1="E-mail"
        holder2="Password"
        name1="Sign In"
        name2="Sign Up"
        value1={userEmail}
        value2={userPassword}
        emailFormTask={value => setUserEmail(value)}
        passwordFormTask={value => setUserPassword(value)}
        task1={signInButton}
        task2={signUpButton}
        securityFalse={false}
        securityTrue={true}
        slogan="Dive into deep talk with friends!"
      />
    </SafeAreaView>
  );
};

export default SignIn;
