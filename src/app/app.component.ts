import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private url = "https://weatherapi-com.p.rapidapi.com/current.json?";
  private key = "64e90bbfb3msh3e1a137ffaf8c25p15700fjsnbb66b815b2bb";

  title = 'weather-app';
  data: any;

  inputData = "Cairo";
  cityName = "None";
  degrees = "0";
  degreesInF = "0";
  clouds = "0";
  humidity = "0";
  wind = "0";
  date:Date = new Date();
  imagePath = "../assets/morning.jpg";
  errorMessage = "";

  constructor(private weatherApi: WeatherApiService, private http: HttpClient) { }

  ngOnInit()
  {
    this.searchForCity();
  }
  
  async searchForCity()
  {
    await this.http.get(this.url + "q=" + this.inputData + "&rapidapi-key=" + this.key).subscribe(
      {
        next: (v) => {
          this.data = v;
          console.log(this.data);
          this.cityName = this.data.location.name;
          this.degrees = this.data.current.feelslike_c;
          this.degreesInF = this.data.current.feelslike_f;
          this.clouds = this.data.current.cloud;
          this.humidity = this.data.current.humidity;
          this.wind = this.data.current.wind_kph;
          this.date = new Date(this.data.location.localtime);
          var hours = this.date.getHours();
          console.log(hours);
          this.imagePath = (hours > 6 && hours < 18) ? "../assets/morning.jpg" : "../assets/night.jpg";
          this.errorMessage = "";
          return v;
        },
        error: (e) => {
           console.error(e);
           this.errorMessage = "City not found, Try again.";
          },
        complete: () => console.info("complete")
      }
    );
  }
}
