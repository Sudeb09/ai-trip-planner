// Generate Travel Plan for Location : Kolkata, for 2 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place Details, place image url, geo cocordinates, ticket pricing, time to travel each of the location for 2 days with each day plan with best time to visit in JSON format

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location : Kolkata, for 2 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place Details, place image url, geo cocordinates, ticket pricing, time to travel each of the location for 2 days with each day plan with best time to visit in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"location\": \"Kolkata\",\n  \"duration\": \"2 Days\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Couple\",\n  \"hotel_options\": [\n    {\n      \"hotelName\": \"Hotel Park Victoria\",\n      \"hotelAddress\": \"12A, Sudder Street, Kolkata, West Bengal 700016, India\",\n      \"price\": \"₹800 - ₹1500 per night\",\n      \"hotel_image_url\": \"https://example.com/hotel_park_victoria.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 22.5500,\n        \"longitude\": 88.3544\n      },\n      \"rating\": 3.5,\n      \"descriptions\": \"A budget-friendly hotel in a central location. Offers basic amenities and comfortable rooms.\"\n    },\n    {\n      \"hotelName\": \"Hotel Galaxy\",\n      \"hotelAddress\": \"1A, Kyd Street, Kolkata, West Bengal 700016, India\",\n      \"price\": \"₹900 - ₹1600 per night\",\n      \"hotel_image_url\": \"https://example.com/hotel_galaxy.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 22.5528,\n        \"longitude\": 88.3556\n      },\n      \"rating\": 3.8,\n      \"descriptions\": \"Located close to the city center, this hotel offers clean rooms and good service at an affordable price.\"\n    },\n    {\n      \"hotelName\": \"Hotel Monalisa International\",\n      \"hotelAddress\": \"1/1, Sarat Bose Road, Kolkata, West Bengal 700020, India\",\n      \"price\": \"₹1000 - ₹1800 per night\",\n      \"hotel_image_url\": \"https://example.com/hotel_monalisa.jpg\",\n      \"geo_coordinates\": {\n        \"latitude\": 22.5340,\n        \"longitude\": 88.3520\n      },\n      \"rating\": 4.0,\n      \"descriptions\": \"Offers comfortable rooms and essential amenities. Good for budget travelers seeking a decent stay.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Historical Kolkata\",\n      \"best_time_to_visit\": \"Morning and Late Afternoon\",\n      \"places\": [\n        {\n          \"placeName\": \"Victoria Memorial\",\n          \"placeDetails\": \"A grand marble building dedicated to Queen Victoria. Houses a museum with artifacts from the British Raj.\",\n          \"place_image_url\": \"https://example.com/victoria_memorial.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 22.5448,\n            \"longitude\": 88.3426\n          },\n          \"ticket_pricing\": \"₹30 for Indians, ₹500 for Foreign Nationals\",\n          \"time_to_travel\": \"20 minutes from Sudder Street (by taxi/auto)\",\n          \"best_time\": \"10:00 AM - 12:00 PM (less crowded)\"\n        },\n        {\n          \"placeName\": \"Indian Museum\",\n          \"placeDetails\": \"One of the oldest museums in India, with a vast collection of artifacts, including ancient sculptures, fossils, and Mughal paintings.\",\n          \"place_image_url\": \"https://example.com/indian_museum.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 22.5478,\n            \"longitude\": 88.3476\n          },\n          \"ticket_pricing\": \"₹75 for Indians, ₹500 for Foreign Nationals\",\n          \"time_to_travel\": \"5 minutes from Victoria Memorial (by taxi/auto)\",\n          \"best_time\": \"2:00 PM - 4:00 PM (after lunch)\"\n        },\n        {\n          \"placeName\": \"Howrah Bridge\",\n          \"placeDetails\": \"A cantilever bridge over the Hooghly River, an iconic symbol of Kolkata.\",\n          \"place_image_url\": \"https://example.com/howrah_bridge.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 22.5865,\n            \"longitude\": 88.3482\n          },\n          \"ticket_pricing\": \"Free\",\n          \"time_to_travel\": \"30 minutes from Indian Museum (by taxi/bus)\",\n          \"best_time\": \"Late Afternoon/Evening (for the view)\"\n        },\n        {\n          \"placeName\": \"Prinsep Ghat\",\n          \"placeDetails\": \"A beautiful ghat along the Hooghly River, perfect for a romantic evening stroll.\",\n          \"place_image_url\": \"https://example.com/prinsep_ghat.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 22.5705,\n            \"longitude\": 88.3448\n          },\n          \"ticket_pricing\": \"Free (Boat rides are extra)\",\n          \"time_to_travel\": \"15 minutes from Howrah Bridge (by taxi/bus)\",\n          \"best_time\": \"Evening (Sunset view)\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"theme\": \"Cultural Kolkata\",\n      \"best_time_to_visit\": \"Morning and Afternoon\",\n      \"places\": [\n        {\n          \"placeName\": \"Dakshineswar Kali Temple\",\n          \"placeDetails\": \"A famous Hindu temple dedicated to Goddess Kali, located on the banks of the Hooghly River.\",\n          \"place_image_url\": \"https://example.com/dakshineswar_temple.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 22.6528,\n            \"longitude\": 88.3633\n          },\n          \"ticket_pricing\": \"Free\",\n          \"time_to_travel\": \"45 minutes from Sudder Street (by taxi/bus)\",\n          \"best_time\": \"Morning (less crowded, cooler weather)\"\n        },\n        {\n          \"placeName\": \"Belur Math\",\n          \"placeDetails\": \"The headquarters of the Ramakrishna Math and Mission, a place of serenity and spiritual significance.\",\n          \"place_image_url\": \"https://example.com/belur_math.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 22.6441,\n            \"longitude\": 88.3441\n          },\n          \"ticket_pricing\": \"Free\",\n          \"time_to_travel\": \"20 minutes from Dakshineswar Temple (by taxi/auto)\",\n          \"best_time\": \"Late Morning (for the peaceful atmosphere)\"\n        },\n        {\n          \"placeName\": \"College Street (Boi Para)\",\n          \"placeDetails\": \"A street lined with bookstores, a haven for book lovers. A great place to browse and soak in the atmosphere.\",\n          \"place_image_url\": \"https://example.com/college_street.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 22.5733,\n            \"longitude\": 88.3622\n          },\n          \"ticket_pricing\": \"Free (for browsing)\",\n          \"time_to_travel\": \"45 minutes from Belur Math (by taxi/bus/ferry)\",\n          \"best_time\": \"Afternoon (shops are usually open)\"\n        },\n         {\n          \"placeName\": \"New Market\",\n          \"placeDetails\": \"A bustling market place in Kolkata. You can find wide range of items starting from clothes, flowers, snacks, food items etc. Perfect for street food, you can try puchka's, momo's, kachoris and many more. \",\n          \"place_image_url\": \"https://example.com/new_market.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 22.5513,\n            \"longitude\": 88.3517\n          },\n          \"ticket_pricing\": \"Free (for browsing)\",\n          \"time_to_travel\": \"10 minutes from college street (by taxi/bus)\",\n          \"best_time\": \"Late Afternoon/Evening (for street food)\"\n        }\n      ]\n    }\n  }\n}\n```"},
          ],
        },
      ],
    });
  
