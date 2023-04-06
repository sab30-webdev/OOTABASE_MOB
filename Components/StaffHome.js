import { Button, StyleSheet, View } from "react-native";
import StaffFooter from "./StaffFooter";

const StaffHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title='open Qr Scanner'
        onPress={() => {
          navigation.navigate("Scanner");
        }}
      />
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

export default StaffHome;
