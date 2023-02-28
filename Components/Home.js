import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Cards from "./Cards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

const Home = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore();
  const [user, setUser] = useState("");
  const [Tno, setTno] = useState(0);

  const bookTable = async () => {
    //Close Modal
    setTno(0);

    //Store in firebase
    try {
      await setDoc(doc(db, `users/${user}`), {
        booked: true,
        tno: Tno,
      });
    } catch (error) {
      console.log(error);
    }

    navigation.navigate("Qr");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        console.log(user);
      } else {
        navigation.navigate("Login");
      }
    });
  }, [user]);

  return (
    <View style={styles.container}>
      {Tno !== 0 ? (
        <View style={styles.top}>
          <Text style={styles.title}>
            Would you like to book table no {Tno}?
          </Text>

          <View style={styles.booleanView}>
            <TouchableOpacity style={styles.bool} onPress={bookTable}>
              <Text>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bool} onPress={() => setTno(0)}>
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.title}>Choose your table {user}</Text>
      )}

      <Cards setTno={setTno} />
      <Footer navigation={navigation} />
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
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  booleanView: {
    flexDirection: "row",
  },
  bool: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  top: {
    backgroundColor: "white",
  },
});

export default Home;
