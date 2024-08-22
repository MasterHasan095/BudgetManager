import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number = 0;
  name = '';
  category = '';
  amount = 0;
  comment = '';

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.expenseService.getExpenseById(this.id).subscribe(
      (expense: any) => {
        this.name = expense.name;
        this.category = expense.category;
        this.amount = expense.amount;
        this.comment = expense.comment;
      },
      (error: any) => {
        alert('Failed to load expense');
      }
    );
  }

  editExpense(): void {
    const updatedExpense = { name: this.name, category: this.category, amount: this.amount, comment: [this.comment] };
    this.expenseService.editExpense(this.id, updatedExpense).subscribe(
      () => {
        alert('Expense updated successfully');
        this.router.navigate(['/reports']);
      },
      (error: any) => {
        alert('Failed to update expense');
      }
    );
  }
}
