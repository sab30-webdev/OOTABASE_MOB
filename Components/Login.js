import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Zeyada_400Regular, useFonts } from "@expo-google-fonts/zeyada";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [fontsLoaded] = useFonts({
    Zeyada_400Regular,
  });
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  }, [auth]);

  const addUser = async (uid) => {
    try {
      await setDoc(doc(db, `users/${uid}`), {
        booked: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addUser(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          alert("Email already in use");
        } else if (errorCode === "auth/weak-password") {
          alert("Weak Password. Password should be at least 6 characters");
        }
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong Password.Try again");
        } else if (errorCode === "auth/user-not-found") {
          alert("User not found.Please register first");
        } else if (errorCode === "auth/invalid-email") {
          alert("Invalid Email");
        }
      });
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size='large' />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.img}
          source={require("../assets/img6.jpg")}
        >
          <Text style={styles.text}>OOTABASE</Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity>
              <Text onPress={login} style={styles.button}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                onPress={register}
                style={{
                  ...styles.button,
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "black",
                  borderWidth: 2,
                }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.employeeText}>
              Are you a employee? Click below to login
            </Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                navigation.navigate("StaffLogin");
              }}
            >
              <Text style={styles.staffButton}>Staff Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 60,
    fontFamily: "Zeyada_400Regular",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 10,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 15,
    fontSize: 20,
  },
  img: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    padding: 10,
    alignSelf: "center",
    width: 100,
    textAlign: "center",
    backgroundColor: "black",
    borderRadius: 10,
    color: "white",
    fontSize: 20,
    margin: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  employeeText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  staffButton: {
    color: "white",
    fontSize: 13,
  },
});

export default Login;
