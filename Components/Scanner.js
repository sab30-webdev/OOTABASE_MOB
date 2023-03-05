import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const storeData = async (tno, uid) => {
    try {
      const jsonValue = JSON.stringify(tno + "_" + uid);
      await AsyncStorage.setItem(`${tno}`, jsonValue);
      navigation.navigate("Bookings");
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
    storeData(data.tno, data.uid);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    extract(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
