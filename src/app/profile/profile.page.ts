import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private name: any;
  private userId: any;
  private pname: any;
  private phone: any;
  private password: any;
  private email: any;
  constructor(
    private navCtrl: NavController,
    private authService: ServiceService,
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {


    this.auth.authState.subscribe(
      (res) =>{
        this.userId = res.uid;
        this.db.list('utilisateur/'+this.userId).valueChanges().subscribe(data =>{
          this.name = data[2];
          this.pname= data[4];
          this.phone= data[6];
          this.password= data[3];
          this.email= data[1];
          console.log('Succes');
        });
    }
    );


  }

  ngOnInit() {


  }


  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    });
  }
}
