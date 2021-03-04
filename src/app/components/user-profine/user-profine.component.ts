import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-profine',
  templateUrl: './user-profine.component.html',
  styleUrls: ['./user-profine.component.css']
})
export class UserProfineComponent implements OnInit {
  user : any;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    const userStrored = JSON.parse(localStorage.getItem('user'));
    this.user = userStrored
  }
  signOut()
  {
    this.authService.signOut();
  }
}
