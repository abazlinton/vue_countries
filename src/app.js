import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      countries: [],
      selectedCountry: {
        neighbours: []
      },
      favouriteCountries: [],
      worldPopulation: 0
    },
    mounted(){
      this.getCountries()
    },
    methods: {
      getCountries: function(){
        fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(countries => {
          this.countries = countries
          this.calculateWorldPopulation()
        })
      },
      addToFavourites: function(){
        this.favouriteCountries.push(this.selectedCountry)
      },
      calculateWorldPopulation: function(){
        this.worldPopulation = this.countries.reduce((runningTotal, country) => {
          return runningTotal + country.population
        }, 0)
      },
      setNeighbouringCountries: function(){
        this.selectedCountry.neighbours = this.countries.filter((country) => {
          return this.selectedCountry.borders.includes(country.alpha3Code);
        });
      }
    }
  })
})
