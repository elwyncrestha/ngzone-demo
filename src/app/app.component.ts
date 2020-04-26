import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  progress = 0;

  constructor(private zone: NgZone) {}

  processWithinAngularZone() {
    this.progress = 0;
    // this.increaseProgress(() => console.log('Done!'));
    this.processOutsideAngularZone();
  }

  increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);

    if (this.progress < 100) {
      window.setTimeout(() => {
        this.increaseProgress(doneCallback);
      }, 10);
    } else {
      doneCallback();
    }
  }

  processOutsideAngularZone() {
    this.progress = 0;
    this.zone.runOutsideAngular(() => {
      this.increaseProgress(() => {
        this.zone.run(() => {
          console.log('Outside Done!');
        });
      });
    });
  }
}
