import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Global } from "../../../modules/global";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userBusinesses: any[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    public global: Global,
    private api: ApiService
  ) {}

  ngOnInit() {
    
  }

  logout() {
    this.router.navigate([this.api.logout()]);
  }
}
