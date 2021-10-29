import { Injectable } from '@angular/core';
import{ AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  registerUser(value) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email,value.password,)
      .then(
        res =>resolve(res),
        err => reject(err));

    });
  }
  loginUser(value) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return new Promise<any>((resolve, reject) =>{
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err));
    });
  }
  logoutUser() {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return new Promise<void>((resolve, reject) =>{
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(()=>{
            console.log('Deconnexion reusie');
            resolve();
          }).catch((erro) =>{
            reject();
          });
      }
    });
  }
  logout() {
    this.afAuth.signOut();
  }
  userDetail() {
    return this.afAuth.user;
  }
}
