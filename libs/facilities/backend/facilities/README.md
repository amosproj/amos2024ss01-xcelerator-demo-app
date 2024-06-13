# facilities-backend-facilities

This is the backend service for the facilities service. It contains the business logic for the facilities service. It is responsible for handling the requests from the frontend service and interacting with the database. It also provides an endpoint to seed the database with initial data. It Uses the IotHub service to interact with the IoT Api.

it exposes 3 different endpoints:

### GET /facilities/seed

-   This endpoint seeds the database with initial data. It is used to populate the database with initial data. It seeds assets in the database, which are shown in the frontend as facilities. It also seeds the database with the initial data for the sensors (Aspects), which are needed to query the time series data from the IoT Api.

### GET /facilities

-   This endpoint returns all the facilities in the database. It is used to get the list of all the facilities in the database.

### GET /facilities/{facilityId}

-   This endpoint returns the facility with the given facilityId. It is used to get the details of a particular facility.
