import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { Subscription  } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Subscription;
  gridx = "10";
  gridy = "10";
  playerx = 0;
  playery = 0;
  setGridx = [];
  setGridy = [];
  randomnum = [];
  ngAfterContentInit() {
    this.taketheGrids();
  }
  ngOnInit() {
    this.subscription = fromEvent(document, 'keypress').subscribe(e => {
      // w,a,s,d keys working on the dashboard
      if(e['key'] === 'w'){
        console.log("up");
      }
      if(e['key'] === 'a'){
        console.log("left");
      }
      if(e['key'] === 's'){
        console.log("down");
      }
      if(e['key'] === 'd'){
        console.log("right");
      }
    })
  }

  taketheGrids() {
    this.gridx = prompt("enter the width of the grid");
    this.gridy = prompt("enter the height of the grid");
    let a = 0;
    // Considering the highest of them all
    for (let i = 0; i < Number(this.gridx); i++) {
      this.setGridx.push(i + 1);
    }
    for (let j = 0; j < Number(this.gridy); j++) {
      this.setGridy.push(j + 1);
    }
    if (Number(this.gridx) > Number(this.gridy)) {
      a = Number(this.gridx);
    } else {
      a = Number(this.gridy);
    }
    // setting an array of random numbers to display
    while(this.randomnum.length != a) {
      this.randomnum.filter((x, i, a) => a.indexOf(x) == i);
      this.randomnum.push(Number((Math.floor(Math.random() * Number(this.gridx)) + 1) + '' + (Math.floor(Math.random() * Number(this.gridy)) + 1 )));
    }
    this.playerx = Math.floor(Math.random() * Number(this.gridx)) + 1;
    this.playery = Math.floor(Math.random() * Number(this.gridy)) + 1;
  }

  setRandomBlob(x, y) {
    // iterating and setting the random objects along with green hero
    let c = Number(x+''+y);
    // for enemies
    if (this.randomnum.includes(c) && c !== Number(this.playerx+''+this.playery)) {
      return {
        'active': true
      }
    } 
    // for hero
    else if(x== Number(this.playerx) && y == Number(this.playery)){
      return {
        'activePlayer': true
      }
    }
    
  }

}
