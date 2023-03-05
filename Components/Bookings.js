import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import StaffFooter from "./StaffFooter";

const Bookings = ({ navigation }) => {
  // const [state, setState] = useState([
  //   { tno: "1", uid: "eXrFiIaPsUgTUaC6FEUtxDbYTtL2" },
  //   { tno: "2", uid: "VxCmK2iZAgNSEctYHMOVy1gWNnD2" },
  // ]);
  const [state, setState] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    getAllKeys();
  }, [state]);

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log(e);
    }

    let promises = [];

    keys.forEach((key) => {
      if (key >= 0 || key < 0) {
        promises.push(getData(key));
      }
    });

    Promise.all(promises)
      .then((values) => {
        values.forEach((value) => {
          let d = extract(value);
          let newState = state;
          newState.push(d);
          setState(newState);
        });
      })
      .then(() => {
        setRefresh(!refresh);
      });
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const extract = (qr) => {
    const str = qr;
    const arr = str.split("_");
    const data = {
      tno: arr[0],
      uid: arr[1],
    };
    return data;
  };

  const clearTable = async (Tno) => {
    try {
      await updateDoc(doc(db, "tables/JV5rJ9L66JFo7KSQdagD"), {
        [Tno]: "",
      });

      await AsyncStorage.removeItem(Tno);

      navigation.navigate("StaffHome");
    } catch (error) {
      console.log(error);
    }
  };

  const clearUser = async (uid) => {
    try {
      await setDoc(doc(db, `users/${uid}`), {
        booked: false,
        tno: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = (item) => {
    let { uid, tno } = item;
    Alert.alert("Alert", `Do you want to clear table ${tno}`, [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          clearUser(uid);
          clearTable(tno);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookings</Text>
      {state.length === 0 ? (
        <View style={styles.nobookText}>
          <Text>No bookings</Text>
        </View>
      ) : (
        <View style={styles.items}>
          {state.map((item, idx) => (
            <View key={idx} style={styles.item}>
              <Text>Table No : {item.tno}</Text>
              <Text style={styles.itemUser}>User : {item.uid}</Text>
              <Button
                color='#f36565'
                title='Clear'
                onPress={() => handleClear(item)}
              />
            </View>
          ))}
        </View>
      )}

      <StaffFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  items: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    marginTop: 40,
  },
  nobookText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  itemUser: {
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Bookings;
