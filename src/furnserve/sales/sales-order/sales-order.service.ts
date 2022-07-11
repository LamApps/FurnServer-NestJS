import { Injectable } from '@nestjs/common';
import { searchDto } from './dto/search-sales-order.dto';
import { detailsDto } from './dto/details-sales-order.dto';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class SalesOrderService {

  constructor(private httpService: HttpService) {}

  search(dto: searchDto): Observable<AxiosResponse<any>> {
    const company = dto.company;
    let apiURL = this.getUrlFromCompanyId(company);
    apiURL+= '/getSalesOrder/rest/getSalesOrder/SalesOrderlkup';

    // context1 – this is the username for the user calling the webservice
    // context2 – this is the password for the user calling the webservice
    // begDate – Begin Sales Order Date
    // endDate – End Sales Order Date
    // inso – Single Sales order number
    // ingov – Your # (not really sure what this is but it is here)
    // incustno – Customer Number
    // inname – Last Name
    // inloc – Sales Order Location
    // inphone –Phone Number
    // inacct –Account Type
    // doopen – Show Open for Delivery SOs Only
    // inslsprn – Sales Person
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'context1': 'app',
      'context2': 'app123',
      'begDate': dto.data.begindate || '',
      'endDate': dto.data.enddate || '',
      'inso': dto.data.so,
      'ingov': dto.data.your,
      'incustno': dto.data.customer,
      'inname': dto.data.lastname,
      'inloc': dto.data.location,
      'inphone': dto.data.phone,
      'inacct': dto.data.accounttype,
      'doopen': dto.data.showOpen,
      'inslsprsn': dto.data.person,
    };

    return this.httpService.get(apiURL, {headers: headersRequest}).pipe(map((res:any)=>res.data));
  }

  getDetail(dto: detailsDto) {
    const company = dto.company;
    let apiURL = this.getUrlFromCompanyId(company);

    apiURL+= '/getSalesOrder/rest/getSalesOrder/getSalesOrder';

    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'context1': 'app',
      'context2': 'app123',
      'so_no': dto.sa_no,
    };

    return this.httpService.get(apiURL, {headers: headersRequest}).pipe(map((res:any)=>res.data));
  }

  getUrlFromCompanyId(id: number) {
    switch(id) {
      case 1:
        return 'http://star.furnserve.com:8980';
      case 2:
        return 'http://74.84.202.118:8981';
      case 4:
        return 'http://74.84.202.117:7070';
      case 5:
        return 'http://74.84.202.117:7075';
      case 6:
        return 'http://74.84.202.117:7080';
      case 7:
        return 'http://74.84.202.117:7085';
      case 26:
        return 'http://74.84.202.117:7090';
      default:
        return 'http://star.furnserve.com:8980';
    }
  }
}
