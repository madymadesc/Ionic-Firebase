/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public liste: any;
  public listes: any;

  constructor(
    private dataBase: AngularFireDatabase
  ) { }

  ngOnInit() {

    this.dataBase.list('utilisateur/').valueChanges().subscribe(
      (res)=>{
        this.liste = res;
      }
    );
  }

}
