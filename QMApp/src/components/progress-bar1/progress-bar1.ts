import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar1',
  templateUrl: 'progress-bar1.html'
})
export class ProgressBar1Component {

  @Input('progress') progress;
  constructor() {
  }


}
