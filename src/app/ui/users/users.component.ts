import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  products = [
    { name: 'Product 1', color: 'Red', category: 'Electronics', price: '$100' },
    { name: 'Product 2', color: 'Blue', category: 'Clothing', price: '$50' },
    { name: 'Product 3', color: 'Green', category: 'Home & Garden', price: '$75' },
  ];  showListUsers = true;

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
