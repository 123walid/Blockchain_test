import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
    return (
      <main role="main" className="col-lg-1 ml-auto mr-auto" style={{maxWidth: '500px'}}>
      <div className="content mr-auto ml-auto">
        <section className="signup">
            <div className="container">
              <div className="signup-content">
                <div className="signup-form">
                  <h2 className="form-title">Sign up</h2>
                  <form method="POST" className="register-form" id="register-form" onSubmit={(event)=>{
                    event.preventDefault()
                    const cin=this.cinv.value
                    const name=this.namev.value
                    const prenom=this.prenomv.value
                    const phone = this.phonev.value
                    const sn= this.snv.value
                    this.props.ajoutTransport(cin,name,prenom,phone,sn,5)
                  }}>
                    <div className="form-group">
                      <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                      <input type="number" name="cin" ref={(input)=>{this.cinv=input}} id="cin" placeholder="CIN" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                      <input type="text" name="name" id="nom" ref={(input)=>{this.prenomv=input}} placeholder=" First Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                      <input type="text" name="name" id="prenom" ref={(input)=>{this.namev=input}} placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                      <input type="number" name="tel" id="phone"ref={(input)=>{this.phonev=input}} placeholder="Phone" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                      <input type="number" name="esp" id="sn" ref={(input)=>{this.snv=input}} placeholder="Serial number" />
                    </div>
                   
                    <div className="form-group form-button">
                      <input style={{backgroundColor: 'green'}} type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
                    </div>
                  </form>
                </div>
               
              </div>
            </div>
          </section>
        {this.props.list.map((transporteur,key)=>{
          return(
            <div className="card mb-4" key={key}>
              <div className="card-header">
              <p> CIN : {transporteur.cin.toString()}</p>
                <small className="text-muted">{transporteur.account}</small>
                </div>
                <ul id="postList" className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p> Nom : {transporteur.nom}</p>
                  </li>
                  <li className="list-group-item">
                    <p> Prenom : {transporteur.prenom}</p>
                  </li>
                  <li className="list-group-item">
                    <p> Tel : {transporteur.tel.toString()}</p>
                  </li>
                  <li className="list-group-item">
                    <p> vehicle_number : {transporteur.vehicle_number.toString()}</p>
                  </li>
                  <li className="list-group-item">
                    <p> Score : {transporteur.score.toString()}</p>
                  </li>
                </ul>
              </div>
          )
        })}
      </div>
      </main>
    );
  }
}

export default Main;