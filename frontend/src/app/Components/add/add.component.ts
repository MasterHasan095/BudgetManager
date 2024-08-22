import { Component } from '@angular/core';
import { ExpenseService } from '../../Services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  name = '';
  category = '';
  amount = 0;
  comment = '';

  constructor(private expenseService: ExpenseService, private router: Router) { }

  addExpense(): void {
    const expense = { name: this.name, category: this.category, amount: this.amount, comment: [this.comment] };
    this.expenseService.addExpense(expense).subscribe(
      () => {
        alert('Expense added successfully');
        this.router.navigate(['/reports']);
      },
      (error: any) => {
        alert('Failed to add expense');
      }
    );
  }
}
