import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../services/User";
import Button from "../components/Button";
import firebase from "../services/Firebase";
import styled from "styled-components";

const CodePage = ({ setGame }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const { user } = useUser();
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("game")
      .where("code", "==", parseInt(code))
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const newData = { ...doc.data() };
          newData.players = [...newData.players, { uid: user.uid, name }];
          firebase
            .firestore()
            .collection("game")
            .doc(doc.id)
            .update(newData);

          firebase
            .firestore()
            .collection("user")
            .doc(user.uid)
            .update({ gameId: doc.id });

          history.push("/wait");
        });
      })
      .catch(console.log);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        name="code"
        placeholder="Ajouter le code de la partie"
        onChange={e => setCode(e.target.value)}
      />
      <input
        type="text"
        name="name"
        placeholder="Ajouter votre nom"
        onChange={e => setName(e.target.value)}
      />
      <Button>Démarrer</Button>
    </Form>
  );
};

const Form = styled.form`
  margin-bottom: 15px;

  input {
    margin-bottom: 20px;
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
`;

export default CodePage;
