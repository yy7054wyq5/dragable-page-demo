import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments'

@Injectable()
export class SampleService {
	private dynamicContentDemoUrl = environment.dynamicContentDemoUrl;

  	constructor(private http: HttpClient) {
  		
  	}
}
