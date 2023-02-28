import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

const QrData = ({ route }) => {
  const [data, setData] = useState();
  const { qr } = route.params;

  const extract = () => {
    const str = qr;
    const arr = str.split("_");
    const data = {
      tno: arr[0],
      uid: arr[1],
    };
    setData(data);
  };

  useEffect(() => {
    extract();
  }, [qr]);

  return (
    <View>
      <Text>Table No : {data?.tno}</Text>
      <Text>User : {data?.uid}</Text>
      <Button title='OK' />
    </View>
  );
};

export default QrData;
