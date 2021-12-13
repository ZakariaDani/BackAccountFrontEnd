import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Page2() {
  let [info, setInfo] = useState([]);
  const styles = StyleSheet.create({
    container: {
      fontFamily: "verdana",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      height: "100vh",
    },
    container2: {
      display: "grid",
      margin: "10px",
    },
    inputs: {
      fontSize: "20pt",
      textAlign: "center",
      margin: "5px",
      borderRadius: "5px",
      boxShadow: "0px 2px 4px black",
    },
    titre: {
      color: "red",
      fontWeight: "500",
    },
  });
  axios
    .get("http://localhost:8080/api/bank/Clients")
    .then((response) => {
      console.log(response);
      setInfo(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <View style={styles.container}>
      {info.map((info) => {
        return (
          <View style={styles.container2}>
            <Text
              style={{ fontSize: "20pt", fontWeight: "600", color: "#0a4" }}
            >
              Clients {info.id} :
            </Text>

            <Text style={{ fontSize: "16pt" }}>
              <Text style={styles.titre}>Nom :</Text> {info.nom}
            </Text>
            <Text style={{ fontSize: "16pt" }}>
              <Text style={styles.titre}>Prenom :</Text> {info.prenom}
            </Text>
            <Text style={{ fontSize: "16pt" }}>
              <Text style={styles.titre}>Adress :</Text> {info.adress}
            </Text>
          </View>
        );
      })}
      <Text style={{ fontSize: "20pt", textAlign: "center" }}></Text>
      <StatusBar style={styles.inputs} style="auto" />
    </View>
  );
}
