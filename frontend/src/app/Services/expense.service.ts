import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:5500/api/expense';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, expense, { headers: this.getAuthHeaders() });
  }

  editExpense(id: number, expense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, expense, { headers: this.getAuthHeaders() });
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  getAllExpenses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`, { headers: this.getAuthHeaders() });
  }

  getExpenseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll/${id}`, { headers: this.getAuthHeaders() });
  }
}
