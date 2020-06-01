// 29.05.2020 Firebase pela primeira vez!

import React, { Component } from 'react';
import 'firebase/database';
import firebase from './firebaseConnection';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nomeInput: '',
      idadeInput: '',
      token: 'Carregando...',
      nome: '',
      idade: '',
      lista: [],
      email: '',
      senha: '',
      emailE: '',
      senhaE: ''
    };
    
    this.cadastrar = this.cadastrar.bind(this);
    this.cadastrarE = this.cadastrarE.bind(this);
    this.logar = this.logar.bind(this);
    this.sair = this.sair.bind(this);   
    
    
    // Olheiro realtime = on()
    firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });

    /* Olheiro única vez = once()
    firebase.database().ref('token').once('value').then((snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });
    */

    firebase.database().ref('user').child(1).on('value', (snapshot) => {
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    })

    firebase.database().ref('user').on('value', (snapshot) => {
      let state = this.state;
      this.state.lista = [];

      snapshot.forEach((childItem) => {
        state.lista.push({
          key: childItem.key,
          nome: childItem.val().nome,
          idade: childItem.val().idade
        })
      })

      this.setState(state);
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        alert('Usuario logado com sucesso!');
      }
    })

  }

  cadastrar(e) {

    // inserindo, criando(caso não exista) e atualizando dados (qnd for somente um)
    // firebase.database().ref('token').set(this.state.tokenInput);

    // atualizando
    // firebase.database().ref('user').child(1).child('idade').set(this.state.tokenInput);

    // criando
    // firebase.database().ref('user').child('cargo').set(this.state.tokenInput);

    // deletando
    // firebase.database().ref('user').child('cargo').remove();

    // criando usuário
    let user = firebase.database().ref('user');
    let chave = user.push().key;
    user.child(chave).set({
      nome: this.state.nomeInput,
      idade: this.state.idadeInput
    })

    e.preventDefault();
  }

  cadastrarE(e) {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          alert('Email inválido!');
        }
        if (error.code === 'auth/weak-password') {
          alert('Senha fraca!');
        } else {
          alert('Código de erro: ' + error.code)
        }
      })
  }

  logar(e) {
    firebase.auth().signInWithEmailAndPassword(this.state.emailE, this.state.senhaE)
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          alert('Senha incorreta!');
        } else {
          alert('Código de erro: ' + error.code)
        }
      })
  }

  sair(){
    firebase.auth().signOut();
    alert('Deslogado com sucesso!')
  }

  render() {
    // descontruído: const {token, nome, idade} = this.state;
    // então no h1 so chamaria {token}
    return (
      <div>

        <form onSubmit={this.cadastrar}>
          <input type="text" value={this.state.nomeInput}
            onChange={(e) => this.setState({ nomeInput: e.target.value })} /> <br />

          <input type="text" value={this.state.idadeInput}
            onChange={(e) => this.setState({ idadeInput: e.target.value })} /> <br />

          <button type="submit">Cadastrar</button>
        </form>
        <hr />

        <form onSubmit={this.cadastrarE}>
          <h2>Cadastrar Email e Senha</h2>
          <input type="text" value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })} /> <br />

          <input type="password" value={this.state.senha}
            onChange={(e) => this.setState({ senha: e.target.value })} /> <br />
          <button type="submit">Cadastrar</button>
        </form>
        <hr/>

        <form onSubmit={this.logar}>
          <h2>Entrar</h2>
          <input type="text" value={this.state.emailE}
            onChange={(e) => this.setState({ emailE: e.target.value })} /> <br />

          <input type="password" value={this.state.senhaE}
            onChange={(e) => this.setState({ senhaE: e.target.value })} /> <br />
          <button type="submit">Entrar</button>
        </form><br/>

        <button onClick={this.sair}>Sair</button>

        <h1>Token: {this.state.token} </h1>
        <h1>Nome: {this.state.nome}</h1>
        <h1>Idade: {this.state.idade}</h1>

        <hr />

        {this.state.lista.map((item) => {
          return (
            <div>
              <h3>ID: {item.key}</h3>
              <h1>Olá, {item.nome} </h1>
              <h2>Idade: {item.idade} anos </h2>
            </div>
          )
        })}
      </div>
    )
  }
}


