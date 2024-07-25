import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  @Input() public title: string = '';

  @Input() public description: string = '';
  
  @Input() public isBackButton: boolean = false;

  constructor(private router: Router) {}

  public navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
