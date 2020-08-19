import { Subject } from 'rxjs';

export class UIService {
    loadingStateSubject = new Subject<boolean>();
}