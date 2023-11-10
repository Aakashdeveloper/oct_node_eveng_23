// Page1 (Home Page)
> (GET) List Of All Cities 
* http://localhost:8771/location

> (GET) List of All Restaurants
* http://localhost:8771/restaurants

> (GET) Restaurants Wrt City
* http://localhost:8771/restaurants?stateId=1

> (GET) List of all Meals
* http://localhost:8771/mealType

// page2 (Listing Page)
> (GET) Restaurants wrt to mealType
* http://localhost:8771/restaurants?mealId=5

> (GET) Restaurants wrt to mealType + Cuisine
* http://localhost:8771/filters/1?cuisineId=1

> (GET) Restaurants wrt to mealType + Cost
http://localhost:8771/filters/1?lcost=300&hcost=900
> (GET) Sort on basis of Price
> (GET) Pagination

// Page3 (Details Page)
> (GET) Details of Restaurant wrt to Id

> (GET) Menu wrt to Restaurant

// Page4 (Orders page)
> (POST) Details of item selected
> (POST) Place The orders

// Page5 (Final Page)
> (GET) List of orders / order wrt email
> (PUT) Update order status
> (DELETE) Delete Order