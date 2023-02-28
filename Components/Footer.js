import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { getAuth, signOut } from "firebase/auth";
import Icon1 from "react-native-vector-icons/AntDesign";

const Footer = ({ navigation }) => {
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Icon name='home' size={40} style={{ textAlign: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          navigation.navigate("Qr");
        }}
      >
        <Icon1 name='qrcode' size={40} style={{ textAlign: "center" }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={logout}>
        <Icon name='log-out' size={40} style={{ textAlign: "center" }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: "10%",
    backgroundColor: "aliceblue",
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

export default Footer;
