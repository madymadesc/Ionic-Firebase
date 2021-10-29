/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import {AngularFireDatabase} from '@angular/fire/compat/database';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public validations_form: FormGroup;
  errorMessage ='';
  successMessage ='';

  validation_messages = {
    // name:[
    //   { type: 'required', message: 'Email is required.' },
    //   { type: 'pattern', message: 'Enter a valid email.' }
    // ],
    // pname:[
    //   { type: 'required', message: 'Email is required.' },
    //   { type: 'pattern', message: 'Enter a valid email.' }
    // ],
    email:[
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    // mobile:[
    //   { type: 'required', message: 'Email is required.' },
    //   { type: 'pattern', message: 'Enter a valid email.' }
    // ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
    // confirmepassword: [
    //   { type: 'required', message: 'Password is required.' },
    //   { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    // ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: ServiceService,
    private formBuilder: FormBuilder,
    private dataBase: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({

      name: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      pname: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      mobile: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      // confirmepassword: new FormControl('', Validators.compose([
      //   Validators.minLength(5),
      //   Validators.required
      // ])),
    });
  }
  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.dataBase.object('utilisateur/' + res.user.uid).set({
          nom: value.name,
          prenom: value.pname,
          email: value.email,
          telephone: value.mobile,
          password: value.password,
          profil: '',
          date_ajout: Date.now(),
        });
        this.errorMessage = '';
        this.successMessage = 'Compte create succeful.';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }


}
