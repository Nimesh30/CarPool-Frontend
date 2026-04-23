import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Authservice } from '../services/authservice';
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  isLoggedIn: boolean = true;
  menuOpen: boolean = false;
  
  constructor(private auth: Authservice, private router: Router) { }
 
  logout(): void {

    this.auth.logout();
    this.router.navigate(['']);
    this.isLoggedIn = false;

  }
 
  login(): void {
    this.isLoggedIn = true;
  }

   isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
