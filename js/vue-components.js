//VUE Components\\

//restuarant data shows restaurant name, address, and link to reservation page
Vue.component('restaurant-name', {
    props: ['name', 'address', 'reserve_link'],
    template: '<b-list-group-item id="restaurantData" class="fade-in"> <span id="name">{{ name }} </span><br> {{ address }} <br> <span style="font-weight:bold">Reserve: </span><a v-bind:href="reserve_link">OpenTable</a></p></b-list-group-item>'
});

//footer component displays name and year
Vue.component('main-footer', {
    props: ['year', 'name'],
    template: `<footer class="muted" style="text-align:center">
		   &copy; {{ year }} {{ name }}
		   </footer>`
});

//display number of places (indecies in array)
Vue.component('places-number', {
    props: ['num_places'],
    template: '<p class="in-from-top">Found {{ num_places }} places near you that offer reservations</p>'
})