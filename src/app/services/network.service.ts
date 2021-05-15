import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  startListening(){
    let handler = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
    });

    return handler;
  }

  stopListening(){
    // let handler.remove();
  }

  async getStatus(){
    let status = await Network.getStatus();
    return status;
  }

  constructor() { }


}
