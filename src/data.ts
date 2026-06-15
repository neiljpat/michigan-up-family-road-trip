import { ItineraryDay, PackingItem, QuickNote } from './types';

export const INITIAL_ITINERARY: ItineraryDay[] = [
  {
    dayNumber: 1,
    date: "Sunday, Aug 2",
    title: "Wisconsin Push",
    subtitle: "Chicago to Green Bay",
    highlight: "Amusement park fun & scenic beach stroll on the way north",
    stats: {
      drivingTime: "approx. 4.5 hours",
      superchargeStopCount: 2,
      highlights: ["Harrington Beach WI", "Bay Beach vintage rides"]
    },
    items: [
      {
        id: "d1-1",
        time: "08:00 AM",
        label: "Depart Chicago",
        details: "Pack the cooler, secure Fitzy, let Reva and Kabir pick their starting playlist and hit the road north on I-94.",
        category: "travel",
        location: "Chicago, IL"
      },
      {
        id: "d1-2",
        time: "09:30 AM",
        label: "Supercharge: Pleasant Prairie / Milwaukee area",
        details: "Grab a morning coffee, stretch your legs, and let Fitzy stretch his paws in the grassy areas while the Tesla charges to 80% (takes ~20-25 mins).",
        category: "charge",
        isTeslaSupercharge: true,
        isDogFriendly: true,
        duration: "45 mins"
      },
      {
        id: "d1-3",
        time: "10:15 AM",
        label: "Drive to Harrington Beach State Park",
        details: "Comfortable drive north along Lake Michigan's western shore (~45 minutes).",
        category: "travel",
        duration: "45 mins"
      },
      {
        id: "d1-4",
        time: "11:00 AM",
        label: "Harrington Beach State Park",
        details: "Walk along the beautiful sandy shoreline, let Reva & Kabir burn off early energy, and let Fitzy stretch. Great spot for dog-friendly nature paths.",
        category: "beach",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "1.5 hours",
        location: "Belgium, WI"
      },
      {
        id: "d1-5",
        time: "12:30 PM",
        label: "Quick & Easy Lunch",
        details: "Grab a quick bite nearby to keep things relaxed and moving smoothly without long sit-down delays.",
        category: "food",
        duration: "1 hour"
      },
      {
        id: "d1-6",
        time: "01:30 PM",
        label: "Drive to Green Bay",
        details: "Smooth Interstate driving through agricultural Wisconsin up to Green Bay (~1 hour).",
        category: "travel",
        duration: "1 hour"
      },
      {
        id: "d1-7",
        time: "02:30 PM",
        label: "Bay Beach Amusement Park",
        details: "Unbelievable vintage amusement park right on the bay. Tickets are only 25 cents per ride! Great rides for Reva (7) & Kabir (4). Neil and Archana can tag-team: one takes the kids on rides like the train, slide or carousel, while the other treats Fitzy with walks in the beautiful grassy groves outside the gates.",
        category: "activity",
        isKidFriendly: true,
        isDogFriendly: true,
        duration: "2.5 hours",
        location: "Green Bay, WI"
      },
      {
        id: "d1-8",
        time: "05:00 PM",
        label: "Supercharge at Green Bay Meijer",
        details: "Top off the battery now so you're fully ready for tomorrow's wilderness drive up into the UP.",
        category: "charge",
        isTeslaSupercharge: true,
        location: "Meijer, Green Bay, WI"
      },
      {
        id: "d1-9",
        time: "05:30 PM",
        label: "Check-in: Hotel Green Bay",
        details: "Unload your bags at your dog-friendly hotel. Let Reva and Kabir check out the pool!",
        category: "lodging",
        isDogFriendly: true,
        location: "Green Bay, WI"
      },
      {
        id: "d1-10",
        time: "06:30 PM",
        label: "Poolside Pizza & Family Dinner",
        details: "Order a fresh local pizza straight to the hotel lobby/pool area or check out a dog-friendly patio downtown.",
        category: "food"
      }
    ]
  },
  {
    dayNumber: 2,
    date: "Monday, Aug 3",
    title: "UP Boundary",
    subtitle: "Green Bay into the Wilderness",
    highlight: "Crossing into the Upper Peninsula, floating over a crystal clear spring, and checking into lakeside bliss",
    stats: {
      drivingTime: "approx. 3.5 hours",
      superchargeStopCount: 1,
      highlights: ["Kitch-iti-kipi Spring", "Lakeside Airbnb Check-in"]
    },
    items: [
      {
        id: "d2-1",
        time: "08:30 AM",
        label: "Breakfast & Hit the Road North",
        details: "Hearty hotel breakfast, load the luggage, and head north out of Wisconsin into Michigan's rugged Upper Peninsula.",
        category: "travel",
        duration: "2 hours"
      },
      {
        id: "d2-2",
        time: "10:30 AM",
        label: "Supercharge & Grocery Run: Escanaba Meijer",
        details: "CRITICAL top-off to secure zero range anxiety for your week at the lake. While the car juices up, split up or go together to do a massive grocery and snack haul for your Airbnb rental week.",
        category: "charge",
        isTeslaSupercharge: true,
        isKidFriendly: true,
        duration: "1 hour",
        location: "Meijer, Escanaba, MI"
      },
      {
        id: "d2-3",
        time: "11:30 AM",
        label: "Drive to Kitch-iti-kipi",
        details: "Fun 45-minute drive winding through scenic pine forests toward Palms Book State Park.",
        category: "travel",
        duration: "45 mins"
      },
      {
        id: "d2-4",
        time: "12:15 PM",
        label: "Kitch-iti-kipi (The Big Spring)",
        details: "Ride the legendary self-operated wooden raft across the deep, 40-foot emerald pool. The water is a perfectly clear 45°F year-round, showing giant trout swimming over bubbling sand. Fitzy is fully welcome on the raft! Reva and Kabir will love turning the big wheel to steer the barge.",
        category: "activity",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "45 mins",
        location: "Palms Book State Park, Manistique, MI"
      },
      {
        id: "d2-5",
        time: "01:00 PM",
        label: "Picnic Lunch at Palms Book",
        details: "Enjoy fresh sandwiches and snacks under the trees using your newly loaded groceries from Escanaba.",
        category: "food",
        duration: "1 hour"
      },
      {
        id: "d2-6",
        time: "02:00 PM",
        label: "Drive to Munising / Au Train",
        details: "The final direct stretch north to the Lake Superior shoreline and your vacation basecamp (~1.5 hours).",
        category: "travel",
        duration: "1.5 hours"
      },
      {
        id: "d2-7",
        time: "03:30 PM",
        label: "Airbnb Check-in & Lakeside Settle-in",
        details: "Check into your private lakeside cottage. Open the windows to let that cool Superior air rush in.",
        category: "lodging",
        location: "Au Train / Munising Area, MI"
      },
      {
        id: "d2-8",
        time: "04:30 PM",
        label: "Splash & Unpack",
        details: "Unpack the trunk, let Reva, Kabir, and Fitzy (our 10-year-old dog) DIP their toes in the lakeside water. Fire up the stove or grill for an easy home-cooked family dinner, and watch the peaceful evening lake colors.",
        category: "activity",
        isDogFriendly: true,
        isKidFriendly: true
      }
    ]
  },
  {
    dayNumber: 3,
    date: "Tuesday, Aug 4",
    title: "Pictured Rocks Debut",
    subtitle: "Waterfalls & Shallow Waters",
    highlight: "Chasing a shaded waterfall and splashing in the warmest shallow beach around",
    stats: {
      drivingTime: "approx. 45 mins total",
      superchargeStopCount: 0,
      highlights: ["Munising Falls", "Sand Point Beach (Dog-friendly)"]
    },
    items: [
      {
        id: "d3-1",
        time: "09:00 AM",
        label: "Slow Lakeside Morning",
        details: "Enjoy freshly brewed coffee on the deck, cook up some local eggs, and watch the mist rise off the lake while the family wakes up naturally.",
        category: "lodging"
      },
      {
        id: "d3-2",
        time: "10:30 AM",
        label: "Munising Falls Hike",
        details: "Head into the National Lakeshore. Take the incredibly easy, fully shaded, 15-minute paved route right up to the base of the spectacular 50-foot waterfall. Very cool air in the sandstone canyon, highly kid and Fitzy accessible.",
        category: "activity",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "1 hour",
        location: "Munising, MI"
      },
      {
        id: "d3-3",
        time: "11:30 AM",
        label: "Downtown Munising Lunch",
        details: "Head downtown to grab burgers or whitefish baskets. Highly recommend 'Eh Burger' for a great, casual family atmosphere.",
        category: "food",
        duration: "1.5 hours",
        location: "Downtown Munising, MI"
      },
      {
        id: "d3-4",
        time: "01:00 PM",
        label: "Sand Point Beach Day",
        details: "Consistently voted one of the best beaches. Sand Point is famously protected, leading to shallower, significantly warmer water (perfect for Reva and Kabir). It features a rare designated, leash-safe beach section for Fitzy in the National Lakeshore! Setup your beach chairs, build sandcastles, and relax.",
        category: "beach",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "3.5 hours",
        location: "Sand Point Rd, Munising, MI"
      },
      {
        id: "d3-5",
        time: "04:30 PM",
        label: "Grill Night at the Airbnb",
        details: "Head back, clean the sand off Reva & Kabir, and throw some burgers or hot dogs on the grill. Sip a cold local draft beer and play a board game.",
        category: "food"
      }
    ]
  },
  {
    dayNumber: 4,
    date: "Wednesday, Aug 5",
    title: "Pictured Rocks by Land",
    subtitle: "Cliffs, Coves & Painted Shoreline",
    highlight: "Seeing the Pictured Rocks cliffs the dog-friendly way — Miners Castle and the painted shoreline at Miners Beach — with Fitzy along the whole day",
    stats: {
      drivingTime: "approx. 1.5 hours total",
      superchargeStopCount: 0,
      highlights: ["Miners Castle cliffs", "Miners Beach cove", "Lazy lake afternoon"]
    },
    items: [
      {
        id: "d4-1",
        time: "09:00 AM",
        label: "Slow Lakeside Breakfast",
        details: "No boat to catch today — linger over coffee on the deck and a big breakfast while the lake mist burns off.",
        category: "lodging"
      },
      {
        id: "d4-2",
        time: "10:30 AM",
        label: "Miners Castle Cliffs",
        details: "The headline Pictured Rocks formation you can reach by land. Leashed dogs are welcome on the paved trails, the viewing platforms, and the picnic area, so Fitzy comes too. Walk the short flat path to the upper and lower overlooks above the turret-shaped cliff and the neon-turquoise water.",
        category: "activity",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "1.5 hours",
        location: "Miners Castle, Munising, MI"
      },
      {
        id: "d4-3",
        time: "12:00 PM",
        label: "Pasties to-go from Muldoon's + Lakeshore Picnic",
        details: "Swing into 'Muldoon's' for authentic UP pasties (flaky beef or veggie pies) and eat them picnic-style at a lakeshore pullout so Fitzy stays right with you.",
        category: "food",
        isDogFriendly: true,
        duration: "1 hour",
        location: "Muldoon's Pasties, Munising, MI"
      },
      {
        id: "d4-4",
        time: "01:00 PM",
        label: "Miners Beach Cove",
        details: "One of the few places you can stand right on the painted-rock shoreline — and leashed dogs are welcome on the sand and in the water. Let Reva & Kabir splash the shallows, Fitzy wade, and look east down the coast toward the cliffs.",
        category: "beach",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "2 hours",
        location: "Miners Beach, Munising, MI"
      },
      {
        id: "d4-5",
        time: "03:30 PM",
        label: "Back to the Cabin: Swim, Paddle & Rest",
        details: "Your one true breather. Head back to Au Train for paddling, swimming, hammock time, and a board game while Fitzy naps on the deck — no agenda for the rest of the day.",
        category: "lodging"
      },
      {
        id: "d4-6",
        time: "06:30 PM",
        label: "Easy Grill Dinner & Sunset",
        details: "Throw something simple on the grill and watch the evening colors come up over the lake.",
        category: "food",
        isKidFriendly: true
      }
    ]
  },
  {
    dayNumber: 5,
    date: "Thursday, Aug 6",
    title: "Art & Marquette Day Trip",
    subtitle: "Iron Art & Presque Isle Playground",
    highlight: "Giant outdoor scrap-metal sculptures and the rugged Black Rocks of Marquette",
    stats: {
      drivingTime: "approx. 2 hours total",
      superchargeStopCount: 1,
      highlights: ["Lakenenland Sculpture Park", "Presque Isle Park", "Marquette Coast"]
    },
    items: [
      {
        id: "d5-1",
        time: "09:00 AM",
        label: "Breakfast at the Airbnb",
        details: "Quick breakfast at the house and gear up for our day-trip drive west along Lake Superior.",
        category: "food"
      },
      {
        id: "d5-2",
        time: "10:00 AM",
        label: "Lakenenland Sculpture Park",
        details: "An awesome, eccentric outdoor museum completely free to the public. Walk the forested half-mile loop finding massive, creative scrap-metal statues (dinosaurs, dragons, humorous dioramas). Extremely friendly for Fitzy and a total favorite for Reva & Kabir's imagination.",
        category: "activity",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "1.5 hours",
        location: "Shot Point, MI"
      },
      {
        id: "d5-3",
        time: "11:30 AM",
        label: "Continue Drive to Marquette",
        details: "Beautiful forested highway drive as you approach the largest city in the UP.",
        category: "travel",
        duration: "30 mins"
      },
      {
        id: "d5-4",
        time: "12:00 PM",
        label: "Lunch in Downtown Marquette",
        details: "Sit down at a classic local brewery or an outdoor cafe with street views. Great local food and craft root beer for Reva & Kabir.",
        category: "food",
        duration: "1.5 hours",
        location: "Marquette, MI"
      },
      {
        id: "d5-5",
        time: "01:30 PM",
        label: "Supercharge: Marquette Meijer",
        details: "Top off your battery at Marquette's supercharger. Since you are in town, this is key for worry-free local exploration through the back half of the week.",
        category: "charge",
        isTeslaSupercharge: true,
        duration: "30 mins",
        location: "Meijer, Marquette, MI"
      },
      {
        id: "d5-6",
        time: "02:15 PM",
        label: "Presque Isle Park",
        details: "Drive the narrow forest loop, visit the majestic Black Rocks (stunning dark volcanic cliffs rising out of Superior—watch people cliff-jump!). Let Reva and Kabir go absolutely wild at the stellar public playground, while Fitzy walks on leash under massive hemlock trees.",
        category: "activity",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "2 hours",
        location: "Marquette, MI"
      },
      {
        id: "d5-7",
        time: "04:30 PM",
        label: "Easy Return Drive & Home Cooked Dinner",
        details: "Wind back to your peaceful Au Train home. Wrap up with a cozy, simple pasta family dinner and early bedtime.",
        category: "travel",
        location: "Au Train, MI"
      }
    ]
  },
  {
    dayNumber: 6,
    date: "Friday, Aug 7",
    title: "Tahquamenon Falls",
    subtitle: "Root Beer Cascades & Island Rowboats",
    highlight: "Exploring the famous amber-colored falls, rowing to an island of mini-waterfalls, and a final campfire on our last lake night",
    stats: {
      drivingTime: "approx. 3 hours total",
      superchargeStopCount: 0,
      highlights: ["Upper Tahquamenon Falls", "Lower Falls Rowboats", "Brewery Lunch", "Final Campfire & S'mores"]
    },
    items: [
      {
        id: "d6-1",
        time: "08:00 AM",
        label: "Early Start & Pack Day Bags",
        details: "Throw towels, rain jackets, and bug spray in the back. Drive east through the heart of the Hiawatha National Forest.",
        category: "travel",
        duration: "1.5 hours"
      },
      {
        id: "d6-2",
        time: "10:00 AM",
        label: "Upper Tahquamenon Falls",
        details: "Marvel at one of the country's largest waterfalls, famed for its rich 'root beer' amber color caused by hemlock tannins. Follow the clean paved nature trail. NOTE: Scoop up Fitzy (10yo dog) when walking on the short metal-grate stairs so his paws don't get snagged!",
        category: "activity",
        isKidFriendly: true,
        isDogFriendly: true,
        duration: "1.5 hours",
        location: "Tahquamenon Falls State Park"
      },
      {
        id: "d6-3",
        time: "11:30 AM",
        label: "Lunch: Tahquamenon Falls Brewery",
        details: "Directly next to the Upper Falls parking lot in a beautiful log-structure. Features locally brewed beers, wild blueberry sodas for Reva & Kabir, and excellent burgers/sandwiches. They have a gorgeous patio grove welcoming dogs like Fitzy!",
        category: "food",
        isDogFriendly: true,
        isKidFriendly: true,
        duration: "1.5 hours",
        location: "Falls Brewery, MI"
      },
      {
        id: "d6-4",
        time: "01:00 PM",
        label: "Lower Tahquamenon Falls & Rowboats",
        details: "Drive 5 minutes down to the Lower Falls. Rent a safe, vintage rowboat and row the family across a small pool to the forested island in the middle of the river. Highly interactive! Walk the new boardwalk bridge, let Reva & Kabir climb and touch the cascading, rushing rapids. Fitzy rides free on the boat!",
        category: "activity",
        isKidFriendly: true,
        isDogFriendly: true,
        duration: "2.5 hours"
      },
      {
        id: "d6-5",
        time: "03:30 PM",
        label: "Drive back to Au Train Airbnb",
        details: "Head back west as Reva & Kabir snooze in the backseat after an active day of climbing forests (~1.5 hours).",
        category: "travel",
        duration: "1.5 hours"
      },
      {
        id: "d6-6",
        time: "06:00 PM",
        label: "Final UP Campfire Feast (Last Lake Night)",
        details: "Your last evening at the Au Train cabin. Fire up the pinewood pit, throw a final cookout, roast marshmallows, and assemble classic s'mores with Reva & Kabir. Tell stories of the giant lake monster as the stars come out over Superior — then pack up the non-essential beach gear so tomorrow's Mackinac departure is smooth.",
        category: "food",
        isKidFriendly: true,
        isDogFriendly: true
      }
    ]
  },
  {
    dayNumber: 7,
    date: "Saturday, Aug 8",
    title: "Mackinac Island Magic",
    subtitle: "Ferry Rides & Bicycle Perimeters",
    highlight: "A car-free island adventure on tandem bikes and crossing the mighty Mackinac Bridge",
    stats: {
      drivingTime: "approx. 3.5 hours total",
      superchargeStopCount: 1,
      highlights: ["Mackinac Island Ferry", "8-Mile Bicycle Loop", "Mackinac Bridge", "Fudge Tasting"]
    },
    items: [
      {
        id: "d7-1",
        time: "08:00 AM",
        label: "Check-out & Head to St. Ignace",
        details: "Lock up the Airbnb, say goodbye to the lake, and take the swift state highway east to the Straits of Mackinac (~1.5 hours).",
        category: "travel",
        duration: "1.5 hours"
      },
      {
        id: "d7-2",
        time: "10:00 AM",
        label: "Board Shepler's Mackinac Island Ferry",
        details: "Hop onto the catamaran ferry! It's a gorgeous 15-minute boat ride. Stand at the open-air stern to feel the spray and see the Mackinac Bridge. Fitzy rides completely free on the ferry deck!",
        category: "activity",
        isKidFriendly: true,
        isDogFriendly: true,
        duration: "30 mins",
        location: "St. Ignace Dock, MI"
      },
      {
        id: "d7-3",
        time: "10:30 AM",
        label: "Rent Island Bikes & 8-Mile Coastal Loop",
        details: "Mackinac is famous for having absolutely zero cars! Rent bicycles directly off the pier. Rent a secure trailer for Reva & Kabir, and a cute front basket for Fitzy. Ride M-185, the iconic, flat, fully paved 8-mile loop around the entire perimeter of the island, with beautiful turquoise waves crashing beside you.",
        category: "activity",
        isKidFriendly: true,
        isDogFriendly: true,
        duration: "2 hours",
        location: "Mackinac Island, MI"
      },
      {
        id: "d7-4",
        time: "12:30 PM",
        label: "Island Lunch & Fudge Shopping",
        details: "Grab a delicious lunch on Main Street and visit iconic candy shops to let Reva & Kabir watch them pour legendary chocolate fudge on marble slabs. Buy a box for the car!",
        category: "food",
        isKidFriendly: true,
        duration: "1.5 hours"
      },
      {
        id: "d7-5",
        time: "02:00 PM",
        label: "Ferry Return to Mainland",
        details: "Take the boat back to Saint Ignace and hop into the Tesla.",
        category: "travel",
        duration: "30 mins"
      },
      {
        id: "d7-6",
        time: "02:30 PM",
        label: "Drive South over the Great Mackinac Bridge",
        details: "Drive across the spectacular 5-mile suspension bridge, looking down at Lake Michigan on your right and Lake Huron on your left.",
        category: "travel",
        duration: "30 mins"
      },
      {
        id: "d7-7",
        time: "03:00 PM",
        label: "Supercharge: Mackinaw City",
        details: "Quick convenience charge immediately upon crossing the bridge so you are ready for the Lower Michigan highway run.",
        category: "charge",
        isTeslaSupercharge: true,
        duration: "30 mins",
        location: "Mackinaw City, MI"
      },
      {
        id: "d7-8",
        time: "03:30 PM",
        label: "Drive to Halfway Stop (Gaylord/Traverse City)",
        details: "Head south into the Lower Peninsula woods toward your dog-friendly hotel (~1.5 hours).",
        category: "travel",
        duration: "1.5 hours"
      },
      {
        id: "d7-9",
        time: "05:30 PM",
        label: "Settle into Hotel & Celebration Family Dinner",
        details: "Check into your dog-friendly suite. Head out to a cozy sit-down tavern or local brewery to celebrate the amazing UP memories and accomplishments with Archana and the kids!",
        category: "lodging",
        location: "Gaylord / Traverse City area, MI"
      }
    ]
  },
  {
    dayNumber: 8,
    date: "Sunday, Aug 9",
    title: "Homeward Bound",
    subtitle: "Lower Michigan to Chicago",
    highlight: "Smooth charging stops and arriving home with plenty of daylight to settle in",
    stats: {
      drivingTime: "approx. 6 hours total",
      superchargeStopCount: 1,
      highlights: ["Grand Rapids charge stop", "Cross border late lunch"]
    },
    items: [
      {
        id: "d8-1",
        time: "08:30 AM",
        label: "Hotel Breakfast & Highway South",
        details: "Fuel up, load the luggage, and head south down US-131 on a smooth driving lane toward Chicago.",
        category: "travel",
        duration: "2 hours"
      },
      {
        id: "d8-2",
        time: "10:30 AM",
        label: "Supercharge: Grand Rapids / Kalamazoo",
        details: "Quick top-off at the Meijer Supercharger. Grab a hot coffee, run around the grass with Reva and Kabir, and let Fitzy stretch his paws.",
        category: "charge",
        isTeslaSupercharge: true,
        duration: "30 mins"
      },
      {
        id: "d8-3",
        time: "11:00 AM",
        label: "The Final Stretching Highway Run",
        details: "Smooth cruising down toward Indiana dunes and Chicago skyline.",
        category: "travel",
        duration: "2.5 hours"
      },
      {
        id: "d8-4",
        time: "01:30 PM",
        label: "Border Crossing Lunch Stop",
        details: "Stop for a relaxed diner lunch just over the border in Indiana or Illinois to ease the final transition.",
        category: "food",
        duration: "1 hour"
      },
      {
        id: "d8-5",
        time: "03:30 PM",
        label: "Arrive Home in Chicago!",
        details: "Pull back into your driveway. Plenty of daylight left to unload the car cooler, start a load of laundry, and let everyone rest and get ready for the regular week.",
        category: "travel",
        location: "Chicago, IL"
      }
    ]
  }
];

export const INITIAL_PACKING_LIST: PackingItem[] = [
  { id: "p1", text: "🔌 Pack Tesla Mobile Connector & adapter nozzles", category: "Tesla", checked: false },
  { id: "p2", text: "🚤 Cancel & refund the pre-booked Pictured Rocks cruise — going by land instead (dogs can't board the boats)", category: "General", checked: false },
  { id: "p3", text: "🎫 Aquire Wisconsin State Park pass (or buy day passes)", category: "General", checked: false },
  { id: "p4", text: "🌲 Buy Michigan Recreation Passport (handles Palms Book & Tahquamenon Falls)", category: "General", checked: false },
  { id: "p-lodging-1", text: "🏨 Book dog-friendly hotel in Green Bay, WI (Day 1 check-in)", category: "General", checked: false },
  { id: "p-lodging-2", text: "🏡 Book dog-friendly Au Train Airbnb/lake cabin (Days 2-6 check-in)", category: "General", checked: false },
  { id: "p-lodging-3", text: "🏨 Book dog-friendly hotel/lodge near Gaylord/Traverse City (Day 7 check-in)", category: "General", checked: false },
  { id: "p5", text: "🦮 Bring Fitzy's 10ft leash (required for State/National Park trails)", category: "Fitzy (Dog)", checked: false },
  { id: "p6", text: "📦 Pack Fitzy's crate or portable playpen for cabin stays", category: "Fitzy (Dog)", checked: false },
  { id: "p7", text: "🧸 Pack Fitzy's plush dog bed, chew toys, and favorite blanket", category: "Fitzy (Dog)", checked: false },
  { id: "p8", text: "🥣 Pre-pack Fitzy's food storage & collapsible travel bowls", category: "Fitzy (Dog)", checked: false },
  { id: "p9", text: "🔌 Put Tesla J1772 destination charging adapter in trunk", category: "Tesla", checked: false },
  { id: "p10", text: "🏖️ Gather sand toys, buckets, and shovels for Sand Point Beach", category: "Kids (Reva & Kabir)", checked: false },
  { id: "p11", text: "🛟 Pack child puddle jumpers and life jackets for Lake Superior", category: "Kids (Reva & Kabir)", checked: false },
  { id: "p12", text: "⛱️ Load beach pop-up tent, shade umbrella, and folding chairs", category: "Beach & Outdoors", checked: false },
  { id: "p13", text: "🥾 Pack water shoes (Lake Superior beaches can be beautifully rocky)", category: "Beach & Outdoors", checked: false },
  { id: "p14", text: "🩱 Pack family swimsuits, rashguards, and quick-dry towels", category: "Beach & Outdoors", checked: false },
  { id: "p15", text: "🦟 Pack high-strength bug spray (essential for woods) & sunscreen", category: "Beach & Outdoors", checked: false },
  { id: "p16", text: "📱 Mount travel tablet headrests and route car chargers", category: "Kids (Reva & Kabir)", checked: false },
  { id: "p17", text: "🍫 Buy campfire s'mores skewers, graham crackers, and roasting wood", category: "Beach & Outdoors", checked: false },
  { id: "p18", text: "💵 Withdraw fudge budget cash (and quarters for Reva & Kabir's Bay Beach rides)", category: "General", checked: false },
];

export const INITIAL_NOTES: QuickNote[] = [
  {
    id: "n1",
    text: "🏡 Au Train Lake Cabin (Days 2-6): [NOT BOOKED YET] - Edit this note to add your Airbnb/cabin confirmation code, keypad, and address when booked.",
    timestamp: "2026-06-14T15:30:00-07:00",
    category: "Lodging"
  },
  {
    id: "n2",
    text: "🏨 Green Bay Hotel (Day 1): [NOT BOOKED YET] - Edit this note to add your hotel confirmation code, check-in, and address when booked.",
    timestamp: "2026-06-14T15:45:00-07:00",
    category: "Lodging"
  },
  {
    id: "n1.5",
    text: "🏨 Gaylord / Grand Rapids Hotel (Day 7): [NOT BOOKED YET] - Edit this note to add your hotel confirmation, check-in, and address when booked.",
    timestamp: "2026-06-14T15:50:00-07:00",
    category: "Lodging"
  },
  {
    id: "n3",
    text: "🚤 Pictured Rocks plan: doing it BY LAND on Aug 5 (Day 4) — Miners Castle cliffs + Miners Beach, both dog-friendly so Fitzy stays with us. Dogs can't board the tour boats, so cancel/refund the pre-booked cruise tickets.",
    timestamp: "2026-06-14T16:00:00-07:00",
    category: "Activities"
  }
];

export const ROUTE_PATH_COORDINATES: { name: string; x: number; y: number; day: number; desc: string; type: 'origin' | 'supercharge' | 'airbnb' | 'activity' | 'stop' }[] = [
  { name: "Chicago", x: 42, y: 92, day: 1, desc: "Depart 8:00 AM", type: 'origin' },
  { name: "Pleasant Prairie Charger", x: 42, y: 81, day: 1, desc: "Supercharge (9:30 AM)", type: 'supercharge' },
  { name: "Harrington Beach Park", x: 44, y: 69, day: 1, desc: "Walk the Beach (11:00 AM)", type: 'activity' },
  { name: "Green Bay", x: 41, y: 55, day: 1, desc: "Bay Beach & Meijer SC, Check-in Hotel", type: 'stop' },
  { name: "Escanaba Charger", x: 39, y: 36, day: 2, desc: "Supercharge & Grocery Run (10:30 AM)", type: 'supercharge' },
  { name: "Kitch-iti-kipi Spring", x: 50, y: 31, day: 2, desc: "Ferry over Big Spring (12:15 PM)", type: 'activity' },
  { name: "Munising / Au Train Airbnb", x: 49, y: 22, day: 2, desc: "Lakeside Basecamp Airbnb Check-in", type: 'airbnb' },
  { name: "Miners Castle & Beach", x: 54, y: 19, day: 4, desc: "Pictured Rocks cliffs & cove, by land with Fitzy", type: 'activity' },
  { name: "Marquette Day Trip", x: 35, y: 19, day: 5, desc: "Presque Isle Park & Meijer Charger", type: 'activity' },
  { name: "Upper Tahquamenon Falls", x: 74, y: 22, day: 6, desc: "Root Beer Amber Cascades", type: 'activity' },
  { name: "Saint Ignace Ferry", x: 80, y: 28, day: 7, desc: "Mackinac Ferry Departure", type: 'stop' },
  { name: "Mackinac Island", x: 84, y: 26, day: 7, desc: "8-Mile bike loop perimeter & Fudge", type: 'activity' },
  { name: "Mackinaw City Charger", x: 80, y: 32, day: 7, desc: "Post-Bridge Supercharger (3:00 PM)", type: 'supercharge' },
  { name: "Gaylord (Halfway)", x: 78, y: 44, day: 7, desc: "Check in Hotel (5:30 PM)", type: 'stop' },
  { name: "Grand Rapids Charger", x: 69, y: 65, day: 8, desc: "Supercharge & restroom run", type: 'supercharge' },
  { name: "Chicago Home", x: 42, y: 92, day: 8, desc: "Arrive 3:30 PM", type: 'origin' }
];
