import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Zeyada_400Regular, useFonts } from "@expo-google-fonts/zeyada";
// import GradientText from "../Modules/Gradient";
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
        console.log(error);
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          console.log("Email already in use");
        } else if (errorCode === "auth/weak-password") {
          console.log(
            "Weak Password. Password should be at least 6 characters"
          );
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
          console.log("Wrong Password.Try again");
        } else if (errorCode === "auth/user-not-found") {
          console.log("User not found.Please register first");
        }
      });
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.img}
          source={require("../assets/img1.jpg")}
        >
          {/* <GradientText colors={["#5DA7DB", "white"]} style={styles.text}>
            OOTABASE
          </GradientText> */}
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
                  borderColor: "#5DA7DB",
                  borderWidth: 3,
                }}
              >
                Signup
              </Text>
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
    color: "black",
    alignSelf: "center",
    width: 100,
    textAlign: "center",
    backgroundColor: "#5DA7DB",
    borderRadius: 10,
    color: "white",
    fontSize: 20,
    margin: 10,
  },
});

export default Login;
