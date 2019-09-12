		//VUE\\
		//make var to be global
		var app = new Vue({
			el: '#root',
			data: {
				//for footer
				copyrightName: "Claire Koval",
				copyrightYear: "2018",
				num_places: "",

				//for opentable api data
				userZip: "",
				result: {
					restaurants: [{
						name: "Loading...",
						address: "Loading...",
						reserve_link: "Loading..."
					}]
				}
			},
			methods: {
				//check user entered zipcode. if so, get restaurant results near zipcode and drop markers
				search() {
					if (this.userZip == "") {
						this.userZip = 14623;
						alert("Please input a valid zipcode. Defaulting to Henrietta, NY");
					} else if (this.userZip.length > 5) {
						alert("Please shorten zip code");
					}
					let link = "https://opentable.herokuapp.com/api/restaurants?zip=" + this.userZip;

					//store userZip
					const storedZip = localStorage.getItem(this.userZip);

					//FETCH API
					fetch(link)
						// callback function - 2 chained callbacks total
						.then(response => { // response property
							if (!response.ok) { //ok property to throw an error if the response is bad
								throw Error(`ERROR: ${response.statusText}`);
							}
							// if it's good, return the json got back
							return response.json();
						})
						// goes to this json if everything works
						.then(json => {
							this.result = json;
							this.restaurants = this.result.restaurants;

							//itterate through loop of restuarants and add marker at lat, lng
							let r;
							for (r = 0; r < this.result.restaurants.length; r++) {
								var closeRestaurant = this.result.restaurants[r];
								var lat = closeRestaurant.lat;
								var long = closeRestaurant.lng;
								var title = closeRestaurant.name;
								addMarker(lat, long, title);
							}

							//add marker with title at lat and lng of restaurant
							function addMarker(latitude, longitude, title) {
								let position = {
									lat: latitude,
									lng: longitude
								};
								let marker = new google.maps.Marker({
									position: position,
									map: map
								});
								marker.setTitle(title);

								//add a listener for the click event, make info window at spot clicked with same title as restaurant
								google.maps.event.addListener(marker, 'click', function (e) {
									makeInfoWindow(this.position, this.title);
								})
								map.panTo(position);
							}

							//make info windows at spot of restuarant/clicked with name of restaurant as title (passed in)
							function makeInfoWindow(position, msg) {
								//Close old infowindow if it exists
								if (this.infowindow) this.infowindow.close();

								this.infowindow = new google.maps.InfoWindow({
									map: map,
									position: position,
									content: "<b>" + msg + "</b>"
								})
							}

						})
				},
				//map function to make new map centered at user location
				myMap(userLat, userLng) {
					const userLoc = new google.maps.LatLng(userLat, userLng);
					const mapProp = {
						center: userLoc,
						zoom: 8,
					};
					map = new google.maps.Map(document.getElementById("map"), mapProp);
					const marker = new google.maps.Marker({
						position: {
							lat: userLat,
							lng: userLng
						},
						map,
						title: 'You are here!'
					});
				},
				//get user location and drop pin at location if service enabled
				getLocation() {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(app.showPosition);
					} else {
						alert("Geolocation is not supported by this browser.");
					}
				},
				//show map centered at user location
				showPosition(position) {
					app.myMap(position.coords.latitude, position.coords.longitude);
				}
			}
		});