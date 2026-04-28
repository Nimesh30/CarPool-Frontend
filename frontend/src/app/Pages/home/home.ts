import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isLoggedIn: boolean = true;
  menuOpen: boolean = false;

  constructor(
    private auth: Authservice,
    private router: Router,
  ) {}

  searchData = {
    startLocation: '',
    destination: '',
    journeyDate: '',
  };

  onSearch() {
    if (
      !this.searchData.startLocation ||
      !this.searchData.destination ||
      !this.searchData.journeyDate
    ) {
      alert('Please fill all fields');
      return;
    }

    this.router.navigate(['/search'], {
      state: { searchData: this.searchData },
    });
  }

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
