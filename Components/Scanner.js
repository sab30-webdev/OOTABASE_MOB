import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  async function checkPermissions(uid) {
    try {
      const access = await getDoc(doc(db, `users/${uid}`));
      return access.data().booked;
    } catch (error) {
      console.log(error);
    }
  }

  const revokeAccess = async (uid, tno) => {
    const access = await checkPermissions(uid, tno);

    if (!access) {
      navigation.navigate("Bookings", {
        tno: -1,
      });
    } else {
      try {
        await setDoc(doc(db, `users/${uid}`), {
          booked: false,
          tno: "",
        });

        navigation.navigate("Bookings", {
          tno: tno,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const extract = (qr) => {
    const str = qr;
    const arr = str.split("_");
    let tno = arr[0];
    let uid = arr[1];

    revokeAccess(uid, tno);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
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
