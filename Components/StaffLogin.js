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
import { useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const StaffLogin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [fontsLoaded] = useFonts({
    Zeyada_400Regular,
  });
  const db = getFirestore();

  const login = async () => {
    const ref = doc(db, `staffUsers/${username}`);
    try {
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        let { pass } = docSnap.data();
        if (pass === password) {
          navigation.navigate("StaffHome");
        } else {
          alert("Wrong password");
        }
      } else {
        alert("User doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
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
          <Text style={styles.text}>OOTABASE Staff</Text>
          <TextInput
            style={styles.input}
            placeholder='Username'
            onChangeText={(text) => setUsername(text)}
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
    borderWidth: 1,
  },
});

export default StaffLogin;
