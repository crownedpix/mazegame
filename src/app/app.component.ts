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
  steps = 0;
  playerx = 0;
  playery = 0;
  setGridx = [];
  setGridy = [];
  randomnum = [];
  ngAfterContentInit() {
    
    this.taketheGrids();
    
  }
  ngOnChange(){
    if(this.randomnum.length == 0){
      alert("You completed with "+ this.steps + "steps.")
    }
  }
  ngOnInit() {
    console.log("init");
    this.subscription = fromEvent(document, 'keypress').subscribe(e => {
      // w,a,s,d keys working on the dashboard
      console.log(e['key']);
      if(e['key'] === 'w'){
        this.playerx--;
      }
      if(e['key'] === 'a'){
        this.playery--;
      }
      if(e['key'] === 's'){
        this.playerx++;
      }
      if(e['key'] === 'd'){
        this.playery++;
      }
      if(this.playerx > Number(this.gridx)){
        this.playerx = 1;
      }
      if(this.playery > Number(this.gridy)){
        this.playery = 1;
      }
      if(this.playerx < 1){
        this.playerx = Number(this.gridx);
      }
      if(this.playery < 1){
        this.playery = Number(this.gridy);
      }
      let c = Number(this.playerx+''+this.playery);
      this.steps++;
      if(this.randomnum.includes(c)){
        this.randomnum.splice(this.randomnum.indexOf(c),1);
        setTimeout(()=>{if(this.randomnum.length == 0){
          alert("You completed with "+ this.steps + "steps.")
        }},100);
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
    // create random player placement
    this.playerx = Math.floor(Math.random() * Number(this.gridx)+1);
    this.playery = Math.floor(Math.random() * Number(this.gridy)+1);
    // push to random array store
    this.randomnum.push(Number(this.playerx+''+this.playery));
    // setting an unique array of random numbers along with player data to display
    while(this.randomnum.length != a+1) {
      if(this.randomnum.length > 0)
      this.randomnum = this.randomnum.filter((x, i, a) => a.indexOf(x) === i);
      console.log(this.randomnum);
      this.randomnum.push(Number((Math.floor(Math.random() * Number(this.gridx)) + 1) + '' + (Math.floor(Math.random() * Number(this.gridy)) + 1 )));
    }
    // remove player data
    this.randomnum.shift();
    console.log("contnet");
  }

  setRandomBlob(x, y) {
    console.log("random");
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
