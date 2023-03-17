import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const Bookings = ({ navigation, route }) => {
  const { tno } = route.params;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("StaffHome");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Direct to table number {tno}</Text>
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

export default Bookings;
