import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Footer from "./Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

const Qr = ({ navigation }) => {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, `users/${user}`), async (doc) => {
        let { tno, booked } = doc.data();
        if (booked) {
          setData(tno + user);
        } else {
          setData("");
        }
      });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {data !== "" ? (
        <QRCode size={200} value={data} />
      ) : (
        <Text>You haven't booked any table!</Text>
      )}

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Qr;
