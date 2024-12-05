import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../Firebase/FirebaseConfig";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { navbtn, navbtnin, navbtnout, colors } from "../globals/style";

const Userprofile = ({ navigation }) => {
  const [userloggeduid, setUserLoggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const checkLogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user);
          setUserLoggeduid(user.uid);
        } else {
          setUserLoggeduid(null);
        }
      });
    };
    checkLogin();
  }, []);
  //console.log(userloggeduid);
  useEffect(() => {
    const getuserData = async () => {
      const docRef = firebase
        .firestore()
        .collection("UserData")
        .where("uid", "==", userloggeduid);
      const doc = await docRef.get();
      if (!doc.empty) {
        doc.forEach((doc) => {
          setUserdata(doc.data());
        });
      } else {
        //navigation.navigate('Login');
        console.log("No such document");
      }
    };
    getuserData();
  }, [userloggeduid]);
  //console.log(userdata);
  return (
    <View style={styles.containerout}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={navbtnout}
      >
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.head1}>Your Profile</Text>
        <View style={styles.containerin}>
          <Text style={styles.head2}>
            Name:{" "}
            {userdata ? (
              <Text style={styles.head2in}>{userdata.name}</Text>
            ) : (
              "loading"
            )}
          </Text>
          <Text style={styles.head2}>
            Email:{" "}
            {userdata ? (
              <Text style={styles.head2in}>{userdata.email}</Text>
            ) : (
              "loading"
            )}
          </Text>
          <Text style={styles.head2}>
            Phone:{" "}
            {userdata ? (
              <Text style={styles.head2in}>{userdata.phone}</Text>
            ) : (
              "loading"
            )}
          </Text>
          <Text style={styles.head2}>
            Address:{" "}
            {userdata ? (
              <Text style={styles.head2in}>{userdata.address}</Text>
            ) : (
              "loading"
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Userprofile;
const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    //alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  head1: {
    fontSize: 40,
    color: colors.text1,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    marginVertical: 50,
  },
  containerin: {
    backgroundColor: "#fff",
    width: "90%",
    alignItems: "center",
    borderWidth: 4,
    borderColor: colors.text1,
    borderRadius: 20,
    padding: 10,
  },
  head2: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    marginVertical: 15,
  },
  head2in: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
  },
});
