import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post, Posts } from '../../../core/services/posts';

@Component({
  selector: 'app-service-demo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-demo.html',
  styleUrl: './service-demo.scss',
})
export class ServiceDemo implements OnInit {
  private postsService = inject(Posts);

  // service signal read directly — auto-updates when service mutates it
  books = this.postsService.books;
  posts = signal<Post[]>([]);

  bookForm = new FormGroup({
    title:  new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    year:   new FormControl<number | null>(null, [Validators.required, Validators.min(1000)]),
  });

  ngOnInit() {
    this.postsService.getPosts().subscribe(data => this.posts.set(data));
  }

  // helper for clean template access
  get f() { return this.bookForm.controls; }

  isInvalid(control: keyof typeof this.bookForm.controls): boolean {
    const c = this.f[control];
    return c.invalid && c.touched;
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    // component → service data flow
    this.postsService.addBook({
      title:  this.f.title.value!,
      author: this.f.author.value!,
      year:   this.f.year.value!,
    });

    this.bookForm.reset();
  }
}