import { Component } from '@angular/core';
import { SampleService } from './sample.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  providers: [ SampleService ],
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
    
}
