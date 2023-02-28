import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

const Cards = ({ setTno }) => {
  const [state, setState] = useState([
    1, 2, 3, 4, 5, 6, 7, 9, 9, 9, 1, 2, 3, 4, 5, 6,
  ]);
  const [tables, setTables] = useState({});

  const db = getFirestore();

  //   useEffect(() => {
  //     onSnapshot(doc(db, "tables/JV5rJ9L66JFo7KSQdagD"), async (doc) => {
  //       setTables(Object.keys(doc.data()));
  //     });
  //   }, []);

  return (
    <FlatList
      style={styles.flatList}
      numColumns={2}
      data={state}
      renderItem={({ item }) => (
        <ScrollView>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setTno(item);
            }}
          >
            <View style={styles.card}>
              <Text style={{ fontSize: 70 }}>{item}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aliceblue",
    margin: 10,
    elevation: 5,
    borderRadius: 10,
  },
  flatList: {
    marginBottom: "20%",
  },
});

export default Cards;
