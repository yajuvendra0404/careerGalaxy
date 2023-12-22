import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  PATH: String = `${environment.ASSETS_PATH}`;
}
