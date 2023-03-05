import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const StaffFooter = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          navigation.navigate("StaffHome");
        }}
      >
        <Icon name='line-scan' size={40} style={{ textAlign: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          navigation.navigate("Scanner");
        }}
      >
        <Icon
          name='database-arrow-down-outline'
          size={40}
          style={{ textAlign: "center" }}
          onPress={() => {
            navigation.navigate("Bookings");
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: "8%",
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 5,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    flex: 1,
    marginTop: 15,
  },
});

export default StaffFooter;
