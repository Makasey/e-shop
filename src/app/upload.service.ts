import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: AngularFireStorage) {}

  public uploadFile(
    folder: string,
    file: File,
  ): [percent: Observable<number>, link: Observable<any>] {
    const { name } = file;
    const filePath = `${folder}/${new Date().getTime()}_${name}`;
    const task: AngularFireUploadTask = this.storage.upload(filePath, file);
    return [task.percentageChanges(), this.getLink(task, filePath).pipe(startWith(null))];
  }

  private getLink(task: AngularFireUploadTask, filePath: string): Observable<any> {
    return from(task).pipe(switchMap(() => this.storage.ref(filePath).getDownloadURL()));
  }
}
