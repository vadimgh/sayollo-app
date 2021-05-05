import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionData } from '../../types/transaction-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();
  transactionData: TransactionData = null;

  private _getTransactionData() {
    this._subscriptions.add(
      this.transactionsService
        .getTransactionsData()
        .pipe(
          map((data) => {
            this.transactionData = data;
          })
        )
        .subscribe()
    );
  }

  constructor(
    private transactionsService: TransactionsService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this._getTransactionData();
  }

  // event handlers (strart)
  onCancelTransaction(transaction) {
    this._subscriptions.add(
      this.transactionsService
        .cancelTransaction(transaction)
        .pipe(
          map((res) => {
            if (res.success) {
              this.toasterService.popAsync(
                'success',
                'cancel transaction',
                'Transaction canceled'
              );
            }
          }),
          catchError(() => {
            this.toasterService.popAsync(
              'error',
              'cancel transaction',
              'Cannot cancel transaction at the moment. Please, try later'
            );
            return of({});
          })
        )
        .subscribe()
    );
  }
  // event handlers (end)

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
