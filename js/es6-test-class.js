//ES6 class for testing\\
class Restaurant {
	constructor(userZip) {
		this.zip = userZip; //call setter
	}
	get zip() {
		return this._zip;
	}
	set zip(userZip) {
		//shorten if it's too long
		if (userZip.length > this.constructor.maxLength) {
			userZip = userZip.slice(0, this.constructor.maxNameLength);
		}
		this._zip = userZip;
	}
}
Restaurant.maxLength = 5; //class vairable to determine how long input is