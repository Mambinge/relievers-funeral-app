import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);

  getNotification(): Observable<Notification | null> {
    return this.notificationSubject.asObservable();
  }

  showNotification(notification: Notification): void {
    this.notificationSubject.next(notification);
  }

  clearNotification(): void {
    this.notificationSubject.next(null);
  }
}
