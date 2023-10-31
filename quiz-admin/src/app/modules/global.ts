import { Injectable } from "@angular/core";
import { SweetAlertOptions } from "sweetalert2";

@Injectable()
export class Global {

  audienceList: any[] = [];
  contactList: any[] = [];
  currentBusiness: any = [];
  currentRecipients: any = [];
  recipientLists: any[];
  senderList: any[] = [];
  selectedBusiness: string;
  templateList: any[] = [];
  template: any[] = [];

  async getAudiences(api: any) {
    this.audienceList = await api.then((res: any) => res.data).catch(() => []);
    return this.audienceList;
  }

  async getContacts(api: any) {
    this.contactList = await api.then((res: any) => res.data).catch(() => []);
    return this.contactList;
  }

  async getRecipients(api: any) {
    this.contactList = await api.then((res: any) => res.data).catch(() => []);
    return this.recipientLists;
  }

  async getSenders(api: any) {
    this.senderList = await api.then((res: any) => res.data).catch(() => []);
    return this.senderList;
  }

  async getTemplates(api: any) {
    this.templateList = await api
      .then((res: any) => {
        res.data.filter((q) => q.status === "active");
      })
      .catch(() => []);
    return this.templateList;
  }

  filterSortByEmail(data: any[], array: any[]) {
    return this.sortByEmail(this.filterByID(data, array));
  }

  filterByID(data: any[], array: any[]) {
    return [
      ...data.filter(
        (item) => array.findIndex((e) => e._id === item._id) === -1
      ),
    ];
  }

  sortByEmail(data: any[]) {
    return [
      ...data.sort((a, b) =>
        a.email > b.email ? 1 : b.email > a.email ? -1 : 0
      ),
    ];
  }

  sortByName(data: any[]) {
    return [
      ...data.sort((a, b) =>
        a.email > b.email ? 1 : b.name > a.name ? -1 : 0
      ),
    ];
  }

  popDelete(message: string, confirmButtonText: string): SweetAlertOptions {
    return {
      title: "Are you sure?",
      text: `You want to delete ${message}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    };
  }

  popSubscribe(message: string, confirmButtonText: string): SweetAlertOptions {
    return {
      title: "Are you sure?",
      text: `You want to subscribe this ${message}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    };
  }

  popUnsubscribe(
    message: string,
    confirmButtonText: string
  ): SweetAlertOptions {
    return {
      title: "Are you sure?",
      text: `You want to unsubscribe this ${message}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    };
  }

  setCurrentBusiness(business: any) {
    this.currentBusiness = business;
  }
}
