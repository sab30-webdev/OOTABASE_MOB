import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { doc, getFirestore, onSnapshot, collection } from "firebase/firestore";
import Footer from "./Footer";

const Menu = ({ navigation }) => {
  const db = getFirestore();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "menu"), async (docsSnap) => {
      let arr = [];
      docsSnap.forEach((doc) => {
        arr.push(doc.data().item);
      });
      setMenu(arr);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.items}>
        <View style={[styles.item]}>
          <Text style={styles.heading}>Dish</Text>
        </View>
        <View style={[styles.item]}>
          <Text style={styles.heading}>Price</Text>
        </View>
      </View>
      {menu.map((item, idx) => (
        <View key={idx} style={styles.items}>
          <View style={[styles.item]}>
            <Text>{item[0]}</Text>
          </View>
          <View style={[styles.item]}>
            <Text>₹ {item[1]}</Text>
          </View>
        </View>
      ))}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold",
  },
  items: {
    flexDirection: "row",
  },
  item: {
    flex: 1,
    marginBottom: 10,
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Menu;
