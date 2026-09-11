import { Component } from '@angular/core';
import { Hero } from "../../components/hero/hero";
import { HowItWorks } from "../../components/how-it-works/how-it-works";
import { Testimonials } from "../../components/testimonials/testimonials";

@Component({
  imports: [Hero, HowItWorks, Testimonials],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
