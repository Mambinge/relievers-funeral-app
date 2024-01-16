import { Observable } from 'rxjs';
import { FieldOptionData } from './from-forms';
import { PageRequest } from './pagination';

export interface FieldOptionApi {
  url: string;
  name?: string;
  value?: string;
  mapper?: (content: any[]) => FieldOptionData[];
  searcher?: (value: string) => Observable<FieldOptionData[]>;
  pageRequest?: PageRequest;
}
