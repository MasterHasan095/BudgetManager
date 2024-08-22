import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  expenses: any[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseService.getAllExpenses().subscribe(
      (data: any) => {
        this.expenses = data;
      },
      (error: any) => {
        alert('Failed to load expenses');
      }
    );
  }

  deleteExpense(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe(
        () => {
          this.expenses = this.expenses.filter(exp => exp.id !== id);
          alert('Expense deleted successfully');
        },
        (error: any) => {
          alert('Failed to delete expense');
        }
      );
    }
  }
}
