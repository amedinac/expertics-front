import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{


  ngOnInit(): void {
    initFlowbite();
  }

  getUserPayload(){
    const token = localStorage.getItem('token') || '';
    var payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }

}
