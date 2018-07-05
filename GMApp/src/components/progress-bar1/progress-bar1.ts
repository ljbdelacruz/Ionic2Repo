import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProgressBar1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar1',
  templateUrl: 'progress-bar1.html'
})
export class ProgressBar1Component {

  @Input('progress') progress;
  constructor() {
  }

}
