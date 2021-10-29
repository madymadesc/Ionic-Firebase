/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private name: any;
  private userId: any;
  private pname: any;
  public userList: any;
  userEmail: string;
  userName: string;
  userPname: string;
  constructor(
    private navCtrl: NavController,
    private authService: ServiceService,
    private dataBase: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe(
      (res) =>{
        this.userId = res.uid;
        this.dataBase.list('utilisateur/'+this.userId).valueChanges().subscribe(data =>{
          this.name = data[2];
          this.pname= data[4];
          console.log('Succes');
        });
    }
    );
  }

  ngOnInit(){


    this.authService.userDetail().subscribe(res =>{
      console.log('res', res);
      if (res !== null){
        this.userEmail =res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err',err);
    });


    this.dataBase.list('utilisateur/').valueChanges().subscribe(
      (res)=>{
        this.userList = res;
      }
    );


  }
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error =>{
      console.log(error);
    });
  }

}
