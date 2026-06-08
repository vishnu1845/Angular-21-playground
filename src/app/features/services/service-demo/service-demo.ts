import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, Post, Posts } from '../../../core/services/posts';

@Component({
  selector: 'app-service-demo',
  imports: [CommonModule],
  templateUrl: './service-demo.html',
  styleUrl: './service-demo.scss',
})
export class ServiceDemo implements OnInit {
  private postsService = inject(Posts);

  books: Book[] = this.postsService.getBooks();
  posts = signal<Post[]>([]);

  ngOnInit() {
    this.postsService.getPosts().subscribe(data => {
      this.posts.set(data);
      console.log(this.posts());
    });
  }
}