import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Footer from "./Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const Qr = ({ navigation }) => {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const [isOnline, setIsOnline] = useState(true);

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
  }, []);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, `users/${user}`), async (doc) => {
        let { tno, booked } = doc.data();
        if (booked) {
          setData(tno + "_" + user);
        } else {
          setData("");
        }
      });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {isOnline ? (
        <View style={styles.container1}>
          {data !== "" ? (
            <View style={styles.scanner}>
              <Text style={styles.scanText}>Scan Me </Text>
              <QRCode size={200} value={data} />
            </View>
          ) : (
            <Text style={{ fontSize: 20 }}>You haven't booked any table!</Text>
          )}
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
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanText: {
    fontSize: 52,
    marginBottom: 20,
    textAlign: "center",
  },
  offlineText: {
    textAlign: "center",
    color: "black",
    fontSize: 25,
    marginBottom: 20,
  },
  img: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Qr;
