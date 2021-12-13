import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native";
export default function Form({ navigation }) {
  let [color, setColor] = useState("#0a4");
  let [Bcolor, setBcolor] = useState("rgba(0,0,0,0.05)");
  let [nom, setNom] = useState("");
  let [prenom, setPrenom] = useState("");
  let [adress, setAdress] = useState("");
  let [phone, setPhone] = useState("");
  let [cin, setCin] = useState("");
  let [isEmpty, setIsEmpty] = useState({
    nom: true,
    prenom: true,
    adress: true,
    phone: true,
    cin: true,
  });
  const setBorderColor = () => {
    setBcolor("green");
  };
  const pressHandler = (event) => {
    if (
      !(
        isEmpty.nom ||
        isEmpty.prenom ||
        isEmpty.phone ||
        isEmpty.cin ||
        isEmpty.adress
      )
    ) {
      event.preventDefault();
      setColor("#0a0");
      const information = {
        nom: nom,
        prenom: prenom,
        adress: adress,
        phone: phone,
        cin: cin,
      };
      console.log(information);
      axios
        .post("http://localhost:8080/api/bank/", information)
        .then((responce) => {
          console.log(responce);
        })
        .catch((err) => {
          console.log(err);
        });
      navigation.navigate("Information :", information);
    } else Alert.alert("champ vide ! veuillez remplir tous les champs", [
      {text: 'Understood', onPress: () => console.log('alert closed')}
    ]);
  };
  let BORDER = {
    nom: isEmpty.nom ? "2px solid red" : "2px solid green",
    prenom: isEmpty.prenom ? "2px solid red" : "2px solid green",
    adress: isEmpty.adress ? "2px solid red" : "2px solid green",
    phone: isEmpty.phone ? "2px solid red" : "2px solid green",
    cin: isEmpty.cin ? "2px solid red" : "2px solid green",
  };
  let inputs = {
    fontSize: "20pt",
    textAlign: "center",
    margin: "5px",
    backgroundColor: Bcolor,
    borderRadius: "5px",
    boxShadow: "0px 2px 4px black",
  };
  const styles = StyleSheet.create({
    container: {
      fontFamily: "verdana",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#fff",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      height: "100vh",
    },
    button: {
      display: "flex",
      margin: "10px",
      borderRadius: "5px",
      boxShadow: "0px 2px 4px black",
      backgroundColor: color,
      height: "45px",
      width: "170px",
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...inputs, border: BORDER.nom }}
        placeholder="Nom"
        textContentType="name"
        onTextInput={setBorderColor}
        onChangeText={(nom) => {
          setNom(nom);
          if (nom.trim().length > 0) setIsEmpty({ ...isEmpty, nom: false });
          else setIsEmpty({ ...isEmpty, nom: true });
        }}
      />
      <TextInput
        style={{ ...inputs, border: BORDER.prenom }}
        placeholder="Prénom"
        textContentType="middleName"
        onChangeText={(prenom) => {
          setPrenom(prenom);
          if (prenom.trim().length > 0)
            setIsEmpty({ ...isEmpty, prenom: false });
          else setIsEmpty({ ...isEmpty, prenom: true });
        }}
      />
      <TextInput
        style={{ ...inputs, border: BORDER.adress }}
        placeholder="Adress"
        textContentType="addressCity"
        onChangeText={(adress) => {
          setAdress(adress);
          if (adress.trim().length > 0)
            setIsEmpty({ ...isEmpty, adress: false });
          else setIsEmpty({ ...isEmpty, adress: true });
        }}
      />
      <TextInput
        style={{ ...inputs, border: BORDER.phone }}
        placeholder="Phone"
        textContentType="telephoneNumber"
        keyboardType="number-pad"
        onChangeText={(phone) => {
          setPhone(phone);
          if (phone.trim().length > 0) setIsEmpty({ ...isEmpty, phone: false });
          else setIsEmpty({ ...isEmpty, phone: true });
        }}
      />
      <TextInput
        style={{ ...inputs, border: BORDER.cin }}
        placeholder="CIN"
        onChangeText={(cin) => {
          setCin(cin);
          if (cin.trim().length > 0) setIsEmpty({ ...isEmpty, cin: false });
          else setIsEmpty({ ...isEmpty, cin: true });
        }}
      />
      <Pressable style={styles.button} onPress={pressHandler}>
        <Text style={{ color: "white", fontSize: "20pt", textAlign: "center" }}>
          Submit
        </Text>
      </Pressable>
      <StatusBar style={styles.inputs} style="auto" />
    </View>
  );
}
