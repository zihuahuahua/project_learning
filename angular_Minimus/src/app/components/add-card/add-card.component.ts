import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from '../..//services/ui/ui.services'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.less']
})
export class AddCardComponent implements OnInit {
  darkMode: boolean;
  sub1: Subscription;
  constructor(public ui: UiService) { }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe(isDark=>{
      this.darkMode = isDark
    })
  }
  ngOnDestroy(){
    this.sub1.unsubscribe()
  }

}
