import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  BackHandler,
  Alert,
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Cards from "./Cards";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const Home = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore();
  const [user, setUser] = useState("");
  const [Tno, setTno] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to quit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        navigation.navigate("Login");
      }
    });
  }, [user]);

  const bookTable = async () => {
    setTno(0);
    try {
      await setDoc(doc(db, `users/${user}`), {
        booked: true,
        tno: Tno,
      });
      await updateDoc(doc(db, "tables/JV5rJ9L66JFo7KSQdagD"), {
        [Tno]: "C",
      });
    } catch (error) {
      console.log(error);
    }

    navigation.navigate("Qr");
  };

  const booked = () => {
    setTno(-1);
  };

  return (
    <View style={styles.container}>
      {isOnline ? (
        <View style={styles.container}>
          {Tno !== 0 ? (
            <View style={styles.top}>
              {Tno === -1 ? (
                <Text style={styles.title}>
                  Table booked already!. Please choose a different table
                </Text>
              ) : (
                <Text style={styles.title}>
                  Would you like to book table no {Tno}?
                </Text>
              )}

              {Tno !== -1 && (
                <View style={styles.booleanView}>
                  <TouchableOpacity style={styles.bool} onPress={bookTable}>
                    <Text style={{ color: "white" }}>Yes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.bool, styles.noText]}
                    onPress={() => setTno(0)}
                  >
                    <Text>No</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <Text style={styles.title}>Choose your table {user}</Text>
          )}

          <Cards setTno={setTno} booked={booked} />
          <Footer navigation={navigation} />
        </View>
      ) : (
        <View style={styles.container}>
          <ImageBackground
            style={styles.img}
            source={require("../assets/img2.jpg")}
          >
            <Text style={styles.offlineText}>You are offline!</Text>
            <Text style={styles.offlineText}>
              Check your internet connection
            </Text>
            <ActivityIndicator size='large' />
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },
  booleanView: {
    flexDirection: "row",
  },
  bool: {
    flex: 1,
    backgroundColor: "#142850",
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  top: {
    backgroundColor: "white",
  },
  noText: {
    backgroundColor: "#619ed3",
  },
  offlineText: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    marginBottom: 20,
  },
  img: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Home;
