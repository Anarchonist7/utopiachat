import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { throwError} from 'rxjs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  config: Config;
  headers;
  error;
  list = ['one', 'two', 'banana', 'three', 'mango', 'four'];

  ngOnInit() {
    this.showConfig();
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => {
          console.log('data:' , data);
          this.config = data 
        console.log("yuzza: ", this.config)}, // success path
        error => this.error = error // error path
      );
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }

}

export interface Config {
  id: number;
  title: string;
  body: string;
}
