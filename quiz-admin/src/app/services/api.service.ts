import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  public get(url: string, responseType = null) {
    const headers = this.authorization();
    if (responseType) {
      headers["responseType"] = responseType;
    }
    return this.promiseResponse(this.http.get(this.setURL(url), headers));
  }

  public post(url: string, body: any = {}) {
    return this.promiseResponse(
      this.http.post(this.setURL(url), body, this.authorization())
    );
  }

  public patch(url: string, body: any = {}) {
    return this.promiseResponse(
      this.http.patch(this.setURL(url), body, this.authorization())
    );
  }
  public delete(url: string) {
    return this.promiseResponse(
      this.http.delete(this.setURL(url), this.authorization())
    );
  }

  private authorization() {
    const local = localStorage.getItem("es-token");
    return { headers: { Authorization: local ? local : "" } };
  }

  private setURL(url: string) {
    return env.API_URL + url;
  }

  private promiseResponse(res: any) {
    return new Promise((resolve, reject) => {
      res.pipe(catchError(this.handleError)).subscribe(
        (data: any) => resolve(data),
        (err: any) => reject(err)
      );
    });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      error.error ? { ...error.error, statusText: error.statusText } : error
    );
  }

  public authValidate() {
    const authToken = localStorage.getItem("es-token");
    if (authToken) {
      this.post("/users/token/refresh", { token: authToken })
        .then((res: any) => {
          localStorage.setItem("es-token", res.data.token);
        })
        .catch((error) => {
          this.logout();
        });
      return true;
    } else {
      this.router.navigate([""]);
      return false;
    }
  }

  public renewToken() {
    const renewToken = localStorage.getItem("es-token");
    return this.http
      .post("/users/token/refresh", { token: renewToken })
      .pipe(catchError(this.handleError));
  }

  public logout() {
    localStorage.removeItem("es-token");
    return "/" + localStorage.getItem("logout");
  }
}
