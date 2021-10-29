import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-renitialise',
  templateUrl: './renitialise.page.html',
  styleUrls: ['./renitialise.page.scss'],
})
export class RenitialisePage implements OnInit {
  private name: any;
  private userId: any;
  private pname: any;

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
          console.log('success');
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
