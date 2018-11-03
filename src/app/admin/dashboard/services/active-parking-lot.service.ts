import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ParkingLot } from '../../parking/models/parking-lot';
import { ParkingLotService } from '../../parking/services/parking-lot.service';

@Injectable()
export class ActiveParkingLotService {

  modelList: ParkingLot[] = [];
  modelChannel = new Subject<Array<ParkingLot>>();

  constructor(private service: ParkingLotService) {
    this.update();
  }

  getActiveContracts(): Observable<Array<ParkingLot>> {
    return this.modelChannel.asObservable();
  }

  update() {
    // console.log('ActiveContractService Update');
    this.service.getAll(`?status=1`).subscribe((result) => {
      this.modelChannel.next(result);
    });
  }

}