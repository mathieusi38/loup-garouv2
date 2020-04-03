# Loup Garou

Ce code reprend le jeu du loup garou pour la dernière séance de cours avec les L2 de l'UGA.

## Déroulement de la séance

- Etant donné que le serveur Discord principal n'a pas de salon pour React, je vous invite sur un [autre serveur](https://discord.gg/qk3TzeV).
- Je suis également disponible toute la journée sur skype -- mon identifiant est pl.guhur.
- Pendant la séance, nous allons travailler sur Material UI et Styled components
- Puis un TP noté va reprendre l'ensemble des notions vues en cours.
- Pensez à cloner ce repo et à répondre aux questions en modifiant directement ce README.

## Sass

Au cas où vous avez un trou de mémoire sur Sass, voici un [rappel de la syntaxe](https://devhints.io/sass).

## Material UI

Je vous invite à regarder la vidéo de [Human Talks Paris](https://www.youtube.com/watch?v=D3tB_DGgICE).

Quelques petites questions :

- Résumer en une phrase l'intérêt de Material UI
  Une librairie qui contient plusieurs composant pour désigner une application web.
- Comment importer `material-ui` dans un fichier ?
  import Button from ‘@material_ui/core/Button’
- Comment une application peut utiliser un thème à travers l'ensemble d'un projet ?
  il faut importer MuiThemeProvider de material-Ui et encapsuler le projet avec et définir un objet thème.
- A quoi sert `createMuiTheme` ?
  Permet de personnaliser une partie des composants importer de material-UI
- A quoi correspond `palette` ?
  Il correspond aux couleurs utilisées par l'application
- Comment re-définir des propriétés ?
  I faut utilser la classe MuiButton dans la clé overrides
- A quoi vous fait penser `withStyle` ? Comment l'utiliser ?
  IL faut fournir un fichier style à l'application, on définit une const styles et ajoute des propriétés souhaitées et on ajoute la class au bouton.
- Reproduire les deux boutons rouge et bleu présentées dans la vidéo.
  import React, { Component } from "react";

import {
MuiThemeProvider,
createMuiTheme,
withStyles
} from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import blue from "@material-ui/core/colors/blue";

class BoutonTest extends Component {
render() {
return (
<MuiThemeProvider theme={theme}>

<div>
<Button className={this.props.classes.myleftButton}>Bouton1</Button>
<Button>Bouton2</Button>
</div>
</MuiThemeProvider>
);
}
}
const styles = {
myleftButton: {
backgroundColor: "Blue"
}
};
const theme = createMuiTheme({

overrides: {
MuiButton: {
root: {
backgroundColor: "red"
}
}
}
});

export default withStyles(styles)(BoutonTest);

## Styled Components

De la même manière, voici une [vidéo](https://www.youtube.com/watch?v=mS0UKNBh-Ig) pour introduire le sujet.

Quelques petites questions :

- Qu'est-ce que le CSS-in-JS ?
  CSS-in-JS va permette de générer des classes dynamiques et permet d'imbriquer le code css directement dans le js.
- Qu'est-ce que sont les tagged templates (délimitées par des backticks) ?
  Permet d'insérer directement du css et de transformer les parenthèses, le tableau et la chaine de caractères avec des backticks
- Donner un exemple d'un bouton personnalisé avec et sans les tagged templates ?

Avec tagged templates :

import React, { Component } from "react";

import styled from "styled-components";

class BoutonTest extends Component {
render() {
return (

<div>
<Button>test1</Button>
</div>
);
}
}

const Button = styled.button`color: white; background-color: red;`;

export default BoutonTest;

Sans tagged templates :

class BoutonTest extends Component {
render() {
return (

<div>
<Button>test1</Button>
</div>
);
}
}

const Button = styled.button([" color: white; background-color: red;"]);

- Comment utilise-t-on les props dans cette librarie ?
  On doit ajouter attrs qui prend en paramère une arraw function avec props et l'objet à retourner et on peut donc ensuite utiliser props.l'objet
- Reprendre l'exemple du Material UI avec styled-components; l'écrire avec la composition et avec l'héritage.

Avec composition :

import React, { Component } from "react";

import styled from "styled-components";

class BoutonTest extends Component {
render() {
return (

<div>
<Button1>test1</Button1>
<Button2>test2</Button2>
</div>
);
}
}

const GlobalStyle = `color: white; border-radius: 20px; padding: 8px 25px; font-size: 20px;`;

export const Button1 = styled.button`${GlobalStyle}; background-color: red;`;

export const Button2 = styled.button`${GlobalStyle}; background-color: blue;`;

export default BoutonTest;

Avec héritage :

export const Button1 = styled.button`color: white; border-radius: 20px; padding: 8px 25px; font-size: 20px; background-color: Green;`;

export const Button2 = styled(Button1)`background-color: orange;`;

- Quelles sont les fonctions du contexte de styled-components ?

## Mise en place du design

Pour mettre en pratique ces notions, je vous propose de designer une application reprenant le principe de jeu du loup garou.

Cette plateforme est entièrement numérique, ce qui permet de s'affranchir d'un maître du jeu, et donc d'avoir un joueur supplémentaire.

A l'initialisation de la partie, un joueur démarre une partie. Un court identifiant est alors communiqué aux autres joueurs, qui doivent rejoindre la partie.
Lorsque tous les joueurs ont rejoint la partie, la partie peut démarrer. Chaque joueur joue à tour de rôle depuis son téléphone.

Une contrainte importante est la synchronisation des joueurs : chaque joueur utilise son propre téléphone. Il reçoit un message lorsque c'est à son tour de jouer, ou attend autrement. Pour résoudre techniquement cette contrainte, tout en évitant d'écrire une application en backend, on utilise Firebase. Firebase permet d'utiliser des observateurs, qui réagissent lors d'un appel extérieur, ce qui donne une impression de temps réel.

Une partie du code vous est fournie, afin de faciliter la mise en place de Firebase et des context providers. Il vous est demandé d'explorer le code, d'y apporter un design responsive, et de compléter l'application pour ajouter les différentes étapes de jeu.

Copier .env dans .env.local et remplir de dernier à l'aide de ses identifiants Firebase.
Activer l'authentification anonyme dans la console de Firebase.

### Découverte du code

- Le code utilise des fonctions plutôt que des classes. Ecrire un bouton sous la forme d'une classe et d'une fonction. Retrouver les équivalences entre les méthodes des composants (telles que setState) et celles des fonctions ?

Classe :

class BoutonTest extends Component {
render() {
return (

<div>
<Button1>test1</Button1>
</div>
);
}
}

Fonction :

function Bouton() {

return <Button1>test1</Button1>;
}

Pour utiliser le state au lieu d'utiliser setState on utilise les hooks:

const [val, setVal] = React.useState(false)

Pour setState on va utiliser la fonciton setVal.

Pour les fonctions ComponentDidMount et DidUpdate on utilise la fonction useEffect:

React.useEffect(() => {
// contenu de componentDidMount
})

- Comment récupérer les props dans une fonction ?
  Il faut passer en paramètre " (props) " de la fonction et uilise utiler ensuite : props.blabla

- Dans `App.js`, identifier les différents producteurs de données. Retrouver leur définition. Quelles données partagent-ils à l'ensemble de l'application ?
  Il y a UserProvider, MasterGameProvider et GameProvider et BrowserRouter .

* BrowserRouter : Partage les fonctions utilisées dans les Routes.
* UserProvider: Permet à l'application d'accéder aux informations sur l'utilisateur actuellement connecté.
* MasterGameProvider: Donne les fonctions pour créer une partie.
* GameProvider: fournit les fonctions pour les éléments du jeu.

- Identifier les différentes pages de l'application. Décrire à l'aide d'une phrase le rôle de chacune d'entre elles.
  StartPage : La page d'accueil qui permet d'accéder à la page de création de partie ou pour rejoindre une partie.
  EndPage : La page s'affiche en fin de partie et permet d'afficher les gagnants.
  CodePage : Permet à l'utilisateur d'entrer le code de la partie et son nom d'utilisateur.
  CreatePage : Permet de fournir le code de la partie à l'utilisateur, d'ajouter un nom et de lancer la partie.
  ResultsPage : Affiche les morts et fin de phase.
  AlivePage : Affiche le rôle de l'utilisateur.
  DeadPage : Affiche que l'utilisateur est mort.
  SpellPage : Affiche les différentes actions que l'utilisateur peut faire.

- Pourquoi voit-on sur plusieurs pages "Chargement du master game en cours" ?
  Parce que ces pages utilisent le provider MasterGame
- Avec les classes, nous utilisions `withMyContext` pour s'inscrire aux données d'un provider. Identifier dans services/Game.js la fonction qui joue désormais ce rôle.
  La fonction est : useGame
- Dans `CodePage`, rappeler comment un formulaire gère les champs de remplissage des données.o
  Il faut d'abord utilser un élément onChange qui récupère les entrés clavier avec : e.target.value et la fonction va recevoir les données de l'événement.

### Reprise du design

- En utilisant styled-components, reprendre le design du composant Button.
- Votre nouveau bouton peut alors être utilisé pour améliorer l'affichage de la page `StartPage`.
- Ajouter un header et un footer sur toutes les pages de l'application.
- Réaliser le design du formulaire de de `CodePage`, utilisé pour rejoindre l'application.
- Faire de même avec `CreatePage`.

### Utilisation de Firebase

- Dans 'User.js', comment fait-on pour garder une trace persistente de l'application, même lorsqu'on rafraichit la page ? Comment reconnait-on l'utilisateur lorsqu'il revient dans l'application ?

On utilise l'objet Auth de FireBase qui permet de garder l'utilisateur connecté avec un cookie. Pour reconnaitre l'utilisateur on utilise La fonction useSession() qui fournit l'utilisateur connecté à Firebase.

- Dans Firebase, nous ne pouvons pas ajouter des champs à un utilisateur. Par conséquent, nous devons créer une collection d'utilisateurs et synchroniser les utilisateurs avec cette table. Expliquer où est-ce que cette synchronisation a lieu.

Cette synchronisation a lieu dans useUser

- A votre avis, à quoi sert useEffect ?
- A quoi sert la fonction `unsubscribe` utilisée dans les `useEffect` de `User.js` ?

La fonction Unsubscribe permet de stopper l'attente d'update de la part de firebase.

- Décrire les trois valeurs de retour de `UseUser`.

* error: Permet de contenir les infos informations d'erreur si il y a une erreur.
* loading: Permet de vérifier si les informations sont en cours de chargmenet
* user: Contient les infos de l'utilisteur

- Combien de collections dans Firebase pouvez-vous identifier ? A quoi correspondent les `doc` ?

On identifie 2 collections dans Firebase : "users" et " game "
"users " correspond aux utilisateurs et " game " aux parties

### Contribuer à l'application

- Lors du lancement du jeu, ajouter l'attribution des rôles à chaque joueur : loup-garou, villageois, petite fille ou sorcier. Le nombre de loup-garou est calculé en fonction du nombre de joueurs.
- Chaque joueur reçoit alors une image de son rôle. Partager cette information depuis /wait.
- Lorsque la nuit tombe, la liste des joueurs encore vivants est proposée aux loups garous, qui doivent se mettre d'accord. Réaliser cette fonction.
- Lorsque le jour arrive, tous les joueurs reçoivent une notification indiquant la cible des loups garous. Cette dernière est redirigée vers DeadPage.
- Les joueurs vivant votent pour éliminer un joueur, suspecté d'être un loup garou. Réaliser cette fonction.

### Rapport

Rédiger un court rapport -- inférieur à une page, expliquant les modifications apportées au projet. Motiver ses choix. Expliquer les difficultés rencontrées.
