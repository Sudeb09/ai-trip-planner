export const SelectTravelesList = [
    {
        id:1,
        title:'Just Me',
        desc:'A solo traveles in exploration',
        icon:'✈︎',
        people:'1 People'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏠',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'🧑🏽‍🤝‍🧑🏻',
        people:'5 to 10 People'
    },
]


export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]


// export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {noOfDays} Days for {traveler} with a {budget} budget. Give me 4 Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions based on the budget and suggest best itinerary options with placeName, place Details, place image url, geo cocordinates, ticket pricing, time to travel each of the location for {noOfDays} days with each day plan with best time to visit.Itinerary list in JSON format.'

export const AI_PROMPT = 'Generate a JSON representation of a {noOfDays} day travel plan for {traveler} visiting {location}, on a {budget} budget.The JSON should include a list of four hotel_options, each with the following details: name,address,price,imageUrl,rating, and description.The JSON should include a list of four food_places, each with the following details: name,address,imageUrl,rating, and description.The JSON should also contain a detailed itinerary, structured as a JSON array. Each element of the itinerary array should represent a day and include the day number,a theme for the day, and a plan field.  The plan field must also be a JSON array,containing a list of activities for that day. Each activity object in the plan array should have the following fields: time,placeName,placeActivity,description,imageURL,tricketPricing,travelTime_from_the_previous_location, and best_time_to_visit.Ensure all image URLs are placeholders (e.g., "") that can be replaced later.'
