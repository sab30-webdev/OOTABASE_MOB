import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import Footer from "./Footer";
import Animated, {
  BounceInLeft,
  BounceInRight,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";

const Menu = ({ navigation }) => {
  const db = getFirestore();
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      <Text style={styles.title}>Our Menu</Text>
      <Animated.View
        entering={BounceInRight.duration(2000)}
        style={styles.searchArea}
      >
        <TextInput
          placeholder='Search Menu'
          style={styles.input}
          onChangeText={(text) => setSearchTerm(text.toLowerCase())}
        />
      </Animated.View>
      <View style={styles.items}>
        <View style={[styles.item, styles.itemTitle]}>
          <Text style={styles.heading}>Dish</Text>
        </View>
        <View style={[styles.item, styles.itemTitle]}>
          <Text style={styles.heading}>Price</Text>
        </View>
      </View>
      {menu
        .filter((val) => val[0].toLowerCase().includes(searchTerm))
        .map((item, idx) => (
          <Animated.View entering={SlideInLeft} key={idx} style={styles.items}>
            <View style={[styles.item, styles.itemContent]}>
              <Text style={{ fontSize: 15, color: "white" }}>{item[0]}</Text>
            </View>
            <View style={[styles.item, styles.itemContent]}>
              <Text style={{ fontSize: 15, color: "white" }}>₹ {item[1]}</Text>
            </View>
          </Animated.View>
        ))}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 40,
    fontWeight: "bold",
  },
  items: {
    flexDirection: "row",
    marginTop: 10,
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
  input: {
    width: "50%",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#142850",
  },
  searchArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  itemTitle: {
    backgroundColor: "#619ed3",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemContent: {
    backgroundColor: "#142850",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default Menu;
