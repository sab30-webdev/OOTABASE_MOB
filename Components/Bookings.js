import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import StaffFooter from "./StaffFooter";

const Bookings = ({ navigation, route }) => {
  const { tno } = route.params;

  return (
    <View style={styles.container}>
      {tno === -1 ? (
        <Text style={{ fontSize: 20 }}>Access Denied</Text>
      ) : (
        <Text style={{ fontSize: 20 }}>Direct to table number {tno}</Text>
      )}
      <StaffFooter navigation={navigation} />
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
