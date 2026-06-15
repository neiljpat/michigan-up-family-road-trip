import { DayBlock, ItineraryDay, PackingItem, QuickNote, RouteStop, TripVariant } from './types';

// All variants run the same Aug 2–9 window, so a day's calendar date is fixed by its position.
const TRIP_DATES = [
  'Sunday, Aug 2',
  'Monday, Aug 3',
  'Tuesday, Aug 4',
  'Wednesday, Aug 5',
  'Thursday, Aug 6',
  'Friday, Aug 7',
  'Saturday, Aug 8',
  'Sunday, Aug 9',
];

// Identity helper that pins each block to the DayBlock shape (keeps category unions honest).
const block = (b: DayBlock): DayBlock => b;

// Stamp an ordered list of day blocks with dayNumber (1..n) + calendar date.
const buildDays = (...blocks: DayBlock[]): ItineraryDay[] =>
  blocks.map((b, i) => ({ ...b, dayNumber: i + 1, date: TRIP_DATES[i] }));

// ---------------------------------------------------------------------------
// REUSABLE DAY BLOCKS — assembled into variants below.
// ---------------------------------------------------------------------------
const B = {
  // ── Arrival ───────────────────────────────────────────────────────────
  arriveGreenBay: block({
    title: 'Wisconsin Push',
    subtitle: 'Chicago to Green Bay',
    highlight: 'Amusement park fun & scenic beach stroll on the way north',
    stats: { drivingTime: 'approx. 4.5 hours', superchargeStopCount: 2, highlights: ['Harrington Beach WI', 'Bay Beach vintage rides'] },
    items: [
      { id: 'gb-1', time: '08:00 AM', label: 'Depart Chicago', details: 'Pack the cooler, secure Fitzy, let Reva and Kabir pick their starting playlist and hit the road north on I-94.', category: 'travel', location: 'Chicago, IL' },
      { id: 'gb-2', time: '09:30 AM', label: 'Supercharge: Pleasant Prairie / Milwaukee area', details: 'Grab a morning coffee, stretch your legs, and let Fitzy stretch his paws in the grassy areas while the Tesla charges to 80% (takes ~20-25 mins).', category: 'charge', isTeslaSupercharge: true, isDogFriendly: true, duration: '45 mins' },
      { id: 'gb-3', time: '10:15 AM', label: 'Drive to Harrington Beach State Park', details: "Comfortable drive north along Lake Michigan's western shore (~45 minutes).", category: 'travel', duration: '45 mins' },
      { id: 'gb-4', time: '11:00 AM', label: 'Harrington Beach State Park', details: 'Walk along the beautiful sandy shoreline, let Reva & Kabir burn off early energy, and let Fitzy stretch. Great spot for dog-friendly nature paths.', category: 'beach', isDogFriendly: true, isKidFriendly: true, duration: '1.5 hours', location: 'Belgium, WI' },
      { id: 'gb-5', time: '12:30 PM', label: 'Quick & Easy Lunch', details: 'Grab a quick bite nearby to keep things relaxed and moving smoothly without long sit-down delays.', category: 'food', duration: '1 hour' },
      { id: 'gb-6', time: '01:30 PM', label: 'Drive to Green Bay', details: 'Smooth Interstate driving through agricultural Wisconsin up to Green Bay (~1 hour).', category: 'travel', duration: '1 hour' },
      { id: 'gb-7', time: '02:30 PM', label: 'Bay Beach Amusement Park', details: 'Unbelievable vintage amusement park right on the bay. Tickets are only 25 cents per ride! Great rides for Reva (7) & Kabir (4). Neil and Archana can tag-team: one takes the kids on rides like the train, slide or carousel, while the other treats Fitzy with walks in the beautiful grassy groves outside the gates.', category: 'activity', isKidFriendly: true, isDogFriendly: true, duration: '2.5 hours', location: 'Green Bay, WI' },
      { id: 'gb-8', time: '05:00 PM', label: 'Supercharge at Green Bay Meijer', details: "Top off the battery now so you're fully ready for tomorrow's wilderness drive up into the UP.", category: 'charge', isTeslaSupercharge: true, location: 'Meijer, Green Bay, WI' },
      { id: 'gb-9', time: '05:30 PM', label: 'Check-in: Hotel Green Bay', details: 'Unload your bags at your dog-friendly hotel. Let Reva and Kabir check out the pool!', category: 'lodging', isDogFriendly: true, location: 'Green Bay, WI' },
      { id: 'gb-10', time: '06:30 PM', label: 'Poolside Pizza & Family Dinner', details: 'Order a fresh local pizza straight to the hotel lobby/pool area or check out a dog-friendly patio downtown.', category: 'food' },
    ],
  }),

  arriveAuTrain: block({
    title: 'UP Boundary',
    subtitle: 'Green Bay into the Wilderness',
    highlight: 'Crossing into the Upper Peninsula, floating over a crystal clear spring, and checking into lakeside bliss',
    stats: { drivingTime: 'approx. 3.5 hours', superchargeStopCount: 1, highlights: ['Kitch-iti-kipi Spring', 'Lakeside Airbnb Check-in'] },
    items: [
      { id: 'aut-1', time: '08:30 AM', label: 'Breakfast & Hit the Road North', details: "Hearty hotel breakfast, load the luggage, and head north out of Wisconsin into Michigan's rugged Upper Peninsula.", category: 'travel', duration: '2 hours' },
      { id: 'aut-2', time: '10:30 AM', label: 'Supercharge & Grocery Run: Escanaba Meijer', details: 'CRITICAL top-off to secure zero range anxiety for your week at the lake. While the car juices up, split up or go together to do a massive grocery and snack haul for your Airbnb rental week.', category: 'charge', isTeslaSupercharge: true, isKidFriendly: true, duration: '1 hour', location: 'Meijer, Escanaba, MI' },
      { id: 'aut-3', time: '11:30 AM', label: 'Drive to Kitch-iti-kipi', details: 'Fun 45-minute drive winding through scenic pine forests toward Palms Book State Park.', category: 'travel', duration: '45 mins' },
      { id: 'aut-4', time: '12:15 PM', label: 'Kitch-iti-kipi (The Big Spring)', details: 'Ride the legendary self-operated wooden raft across the deep, 40-foot emerald pool. The water is a perfectly clear 45°F year-round, showing giant trout swimming over bubbling sand. Fitzy is fully welcome on the raft! Reva and Kabir will love turning the big wheel to steer the barge.', category: 'activity', isDogFriendly: true, isKidFriendly: true, duration: '45 mins', location: 'Palms Book State Park, Manistique, MI' },
      { id: 'aut-5', time: '01:00 PM', label: 'Picnic Lunch at Palms Book', details: 'Enjoy fresh sandwiches and snacks under the trees using your newly loaded groceries from Escanaba.', category: 'food', duration: '1 hour' },
      { id: 'aut-6', time: '02:00 PM', label: 'Drive to Munising / Au Train', details: 'The final direct stretch north to the Lake Superior shoreline and your vacation basecamp (~1.5 hours).', category: 'travel', duration: '1.5 hours' },
      { id: 'aut-7', time: '03:30 PM', label: 'Airbnb Check-in & Lakeside Settle-in', details: 'Check into your private lakeside cottage. Open the windows to let that cool Superior air rush in.', category: 'lodging', location: 'Au Train / Munising Area, MI' },
      { id: 'aut-8', time: '04:30 PM', label: 'Splash & Unpack', details: 'Unpack the trunk, let Reva, Kabir, and Fitzy (our 10-year-old dog) DIP their toes in the lakeside water. Fire up the stove or grill for an easy home-cooked family dinner, and watch the peaceful evening lake colors.', category: 'activity', isDogFriendly: true, isKidFriendly: true },
    ],
  }),

  // ── Pictured Rocks basecamp ───────────────────────────────────────────
  prFalls: block({
    title: 'Pictured Rocks Debut',
    subtitle: 'Waterfalls & Shallow Waters',
    highlight: 'Chasing a shaded waterfall and splashing in the warmest shallow beach around',
    stats: { drivingTime: 'approx. 45 mins total', superchargeStopCount: 0, highlights: ['Munising Falls', 'Sand Point Beach (Dog-friendly)'] },
    items: [
      { id: 'prf-1', time: '09:00 AM', label: 'Slow Lakeside Morning', details: 'Enjoy freshly brewed coffee on the deck, cook up some local eggs, and watch the mist rise off the lake while the family wakes up naturally.', category: 'lodging' },
      { id: 'prf-2', time: '10:30 AM', label: 'Munising Falls Hike', details: 'Head into the National Lakeshore. Take the incredibly easy, fully shaded, 15-minute paved route right up to the base of the spectacular 50-foot waterfall. Very cool air in the sandstone canyon, highly kid and Fitzy accessible.', category: 'activity', isDogFriendly: true, isKidFriendly: true, duration: '1 hour', location: 'Munising, MI' },
      { id: 'prf-3', time: '11:30 AM', label: 'Downtown Munising Lunch', details: "Head downtown to grab burgers or whitefish baskets. Highly recommend 'Eh Burger' for a great, casual family atmosphere.", category: 'food', duration: '1.5 hours', location: 'Downtown Munising, MI' },
      { id: 'prf-4', time: '01:00 PM', label: 'Sand Point Beach Day', details: 'Consistently voted one of the best beaches. Sand Point is famously protected, leading to shallower, significantly warmer water (perfect for Reva and Kabir). It features a rare designated, leash-safe beach section for Fitzy in the National Lakeshore! Setup your beach chairs, build sandcastles, and relax.', category: 'beach', isDogFriendly: true, isKidFriendly: true, duration: '3.5 hours', location: 'Sand Point Rd, Munising, MI' },
      { id: 'prf-5', time: '04:30 PM', label: 'Grill Night at the Airbnb', details: 'Head back, clean the sand off Reva & Kabir, and throw some burgers or hot dogs on the grill. Sip a cold local draft beer and play a board game.', category: 'food' },
    ],
  }),

  prLand: block({
    title: 'Pictured Rocks by Land',
    subtitle: 'Cliffs, Coves & Painted Shoreline',
    highlight: 'Seeing the Pictured Rocks cliffs the dog-friendly way — Miners Castle and the painted shoreline at Miners Beach — with Fitzy along the whole day',
    stats: { drivingTime: 'approx. 1.5 hours total', superchargeStopCount: 0, highlights: ['Miners Castle cliffs', 'Miners Beach cove', 'Lazy lake afternoon'] },
    items: [
      { id: 'prl-1', time: '09:00 AM', label: 'Slow Lakeside Breakfast', details: 'No boat to catch today — linger over coffee on the deck and a big breakfast while the lake mist burns off.', category: 'lodging' },
      { id: 'prl-2', time: '10:30 AM', label: 'Miners Castle Cliffs', details: 'The headline Pictured Rocks formation you can reach by land. Leashed dogs are welcome on the paved trails, the viewing platforms, and the picnic area, so Fitzy comes too. Walk the short flat path to the upper and lower overlooks above the turret-shaped cliff and the neon-turquoise water.', category: 'activity', isDogFriendly: true, isKidFriendly: true, duration: '1.5 hours', location: 'Miners Castle, Munising, MI' },
      { id: 'prl-3', time: '12:00 PM', label: "Pasties to-go from Muldoon's + Lakeshore Picnic", details: "Swing into 'Muldoon's' for authentic UP pasties (flaky beef or veggie pies) and eat them picnic-style at a lakeshore pullout so Fitzy stays right with you.", category: 'food', isDogFriendly: true, duration: '1 hour', location: "Muldoon's Pasties, Munising, MI" },
      { id: 'prl-4', time: '01:00 PM', label: 'Miners Beach Cove', details: 'One of the few places you can stand right on the painted-rock shoreline — and leashed dogs are welcome on the sand and in the water. Let Reva & Kabir splash the shallows, Fitzy wade, and look east down the coast toward the cliffs.', category: 'beach', isDogFriendly: true, isKidFriendly: true, duration: '2 hours', location: 'Miners Beach, Munising, MI' },
      { id: 'prl-5', time: '03:30 PM', label: 'Back to the Cabin: Swim, Paddle & Rest', details: 'Your one true breather. Head back to Au Train for paddling, swimming, hammock time, and a board game while Fitzy naps on the deck — no agenda for the rest of the day.', category: 'lodging' },
      { id: 'prl-6', time: '06:30 PM', label: 'Easy Grill Dinner & Sunset', details: 'Throw something simple on the grill and watch the evening colors come up over the lake.', category: 'food', isKidFriendly: true },
    ],
  }),

  marquette: block({
    title: 'Art & Marquette Day Trip',
    subtitle: 'Iron Art & Presque Isle Playground',
    highlight: 'Giant outdoor scrap-metal sculptures and the rugged Black Rocks of Marquette',
    stats: { drivingTime: 'approx. 2 hours total', superchargeStopCount: 1, highlights: ['Lakenenland Sculpture Park', 'Presque Isle Park', 'Marquette Coast'] },
    items: [
      { id: 'marq-1', time: '09:00 AM', label: 'Breakfast at the Airbnb', details: 'Quick breakfast at the house and gear up for our day-trip drive west along Lake Superior.', category: 'food' },
      { id: 'marq-2', time: '10:00 AM', label: 'Lakenenland Sculpture Park', details: "An awesome, eccentric outdoor museum completely free to the public. Walk the forested half-mile loop finding massive, creative scrap-metal statues (dinosaurs, dragons, humorous dioramas). Extremely friendly for Fitzy and a total favorite for Reva & Kabir's imagination.", category: 'activity', isDogFriendly: true, isKidFriendly: true, duration: '1.5 hours', location: 'Shot Point, MI' },
      { id: 'marq-3', time: '11:30 AM', label: 'Continue Drive to Marquette', details: 'Beautiful forested highway drive as you approach the largest city in the UP.', category: 'travel', duration: '30 mins' },
      { id: 'marq-4', time: '12:00 PM', label: 'Lunch in Downtown Marquette', details: 'Sit down at a classic local brewery or an outdoor cafe with street views (grab a dog-friendly patio so Fitzy joins). Great local food and craft root beer for Reva & Kabir.', category: 'food', isDogFriendly: true, duration: '1.5 hours', location: 'Marquette, MI' },
      { id: 'marq-5', time: '01:30 PM', label: 'Supercharge: Marquette Meijer', details: 'Top off your battery at Marquette\'s supercharger — the only fast charger near the basecamp, so this is your key mid-week fill-up.', category: 'charge', isTeslaSupercharge: true, duration: '30 mins', location: 'Meijer, Marquette, MI' },
      { id: 'marq-6', time: '02:15 PM', label: 'Presque Isle Park', details: 'Drive the narrow forest loop, visit the majestic Black Rocks (stunning dark volcanic cliffs rising out of Superior—watch people cliff-jump!). Let Reva and Kabir go absolutely wild at the stellar public playground, while Fitzy walks on leash under massive hemlock trees.', category: 'activity', isDogFriendly: true, isKidFriendly: true, duration: '2 hours', location: 'Marquette, MI' },
      { id: 'marq-7', time: '04:30 PM', label: 'Easy Return Drive & Home Cooked Dinner', details: 'Wind back to your peaceful Au Train home. Wrap up with a cozy, simple pasta family dinner and early bedtime.', category: 'travel', location: 'Au Train, MI' },
    ],
  }),

  // A whole day at the lake — the heart of the "chill" versions.
  lakeDay: block({
    title: 'Lazy Lake Day',
    subtitle: 'Pancakes, Paddles & Campfire',
    highlight: 'A whole day with zero agenda — paddle the lake, build sandcastles, and roast s\'mores right at your own basecamp',
    stats: { drivingTime: '0 hours — no driving today!', superchargeStopCount: 0, highlights: ['Pancake Breakfast', 'Canoe & Kayak', 'Campfire & S\'mores'] },
    items: [
      { id: 'lake-1', time: '09:00 AM', label: 'Giant Family Pancake Breakfast', details: 'Whip up a huge batch of buttermilk pancakes with real maple syrup and eat slow, in your pajamas, with nowhere to be.', category: 'food', isKidFriendly: true },
      { id: 'lake-2', time: '10:30 AM', label: 'Paddle the Lake', details: 'Launch the kayaks, canoe, or paddleboards right from the cabin (provided by the Airbnb or rented down the road). Calm, warm inland water — Fitzy can ride the bow of the canoe.', category: 'activity', isDogFriendly: true, isKidFriendly: true, duration: '2 hours' },
      { id: 'lake-3', time: '12:30 PM', label: 'Casual Cottage Lunch', details: 'Picnic-style lunch on the grass or the back deck. Sandwiches, chips, watermelon, repeat.', category: 'food' },
      { id: 'lake-4', time: '02:00 PM', label: 'Sandcastles, Hammocks & Reading', details: 'Spend the whole afternoon on the shore — build fort sandcastles with Reva & Kabir, nap in the hammock, skip stones, read a book, do gloriously nothing.', category: 'activity', isKidFriendly: true, duration: '3 hours' },
      { id: 'lake-5', time: '06:00 PM', label: 'Campfire & S\'mores Night', details: 'Fire up the pit, roast marshmallows, assemble classic s\'mores, and tell stories of the giant lake monster as the stars come out over Superior.', category: 'food', isKidFriendly: true, isDogFriendly: true },
    ],
  }),

  // ── Big adventures (kept in some variants) ────────────────────────────
  tahquamenon: block({
    title: 'Tahquamenon Falls',
    subtitle: 'Root Beer Cascades & Island Rowboats',
    highlight: 'Exploring the famous amber-colored falls, rowing to an island of mini-waterfalls, and a final campfire on our last lake night',
    stats: { drivingTime: 'approx. 4–5 hours round trip', superchargeStopCount: 0, highlights: ['Upper Tahquamenon Falls', 'Lower Falls Rowboats', 'Brewery Lunch', 'Final Campfire & S\'mores'] },
    items: [
      { id: 'tah-1', time: '07:30 AM', label: 'Early Start & Pack Day Bags', details: 'Towels, rain jackets, bug spray, and a full battery (this is the charging-desert day). Drive east ~2.5 hours through the heart of the Hiawatha National Forest toward the falls.', category: 'travel', duration: '2.5 hours' },
      { id: 'tah-2', time: '10:00 AM', label: 'Upper Tahquamenon Falls', details: "Marvel at one of the country's largest waterfalls, famed for its rich 'root beer' amber color caused by hemlock tannins. Follow the clean paved nature trail. NOTE: Scoop up Fitzy (10yo dog) when walking on the short metal-grate stairs so his paws don't get snagged! There are also Level-2 EV chargers at the park — plug in with your J1772 adapter while you explore.", category: 'activity', isKidFriendly: true, isDogFriendly: true, duration: '1.5 hours', location: 'Tahquamenon Falls State Park' },
      { id: 'tah-3', time: '11:30 AM', label: 'Lunch: Tahquamenon Falls Brewery', details: 'Directly next to the Upper Falls parking lot in a beautiful log-structure. Features locally brewed beers, wild blueberry sodas for Reva & Kabir, and excellent burgers/sandwiches. They have a gorgeous patio grove welcoming dogs like Fitzy!', category: 'food', isDogFriendly: true, isKidFriendly: true, duration: '1.5 hours', location: 'Falls Brewery, MI' },
      { id: 'tah-4', time: '01:00 PM', label: 'Lower Tahquamenon Falls & Rowboats', details: 'Drive 5 minutes down to the Lower Falls. Rent a safe, vintage rowboat and row the family across a small pool to the forested island in the middle of the river. Highly interactive! Walk the new boardwalk bridge, let Reva & Kabir climb and touch the cascading, rushing rapids. Fitzy rides free on the boat!', category: 'activity', isKidFriendly: true, isDogFriendly: true, duration: '2.5 hours' },
      { id: 'tah-5', time: '03:30 PM', label: 'Drive back to Au Train Airbnb', details: 'Head back west (~2.5 hours) as Reva & Kabir snooze in the backseat after an active day of climbing forests.', category: 'travel', duration: '2.5 hours' },
      { id: 'tah-6', time: '06:30 PM', label: 'Final UP Campfire Feast (Last Lake Night)', details: 'Your last evening at the Au Train cabin. Fire up the pinewood pit, throw a final cookout, roast marshmallows, and assemble classic s\'mores with Reva & Kabir. Tell stories of the giant lake monster as the stars come out over Superior — then pack up the non-essential beach gear so tomorrow\'s departure is smooth.', category: 'food', isKidFriendly: true, isDogFriendly: true },
    ],
  }),

  // Mackinac as part of the "do it all" plan — island, then push to a Gaylord hotel the same night.
  mackinacToGaylord: block({
    title: 'Mackinac Island Magic',
    subtitle: 'Ferry Rides & Bicycle Perimeters',
    highlight: 'A car-free island adventure on tandem bikes and crossing the mighty Mackinac Bridge',
    stats: { drivingTime: 'approx. 4.5 hours total', superchargeStopCount: 1, highlights: ['Mackinac Island Ferry', '8-Mile Bicycle Loop', 'Mackinac Bridge', 'Fudge Tasting'] },
    items: [
      { id: 'mtg-1', time: '07:30 AM', label: 'Check-out & Head to St. Ignace', details: 'Lock up the Airbnb, say goodbye to the lake, and take the highway east to the Straits of Mackinac (~2.5 hours).', category: 'travel', duration: '2.5 hours' },
      { id: 'mtg-2', time: '10:15 AM', label: "Board Shepler's Mackinac Island Ferry", details: "Hop onto the catamaran ferry! It's a gorgeous 15-minute boat ride. Stand at the open-air stern to feel the spray and see the Mackinac Bridge. Leashed dogs ride free on the ferry deck, so Fitzy comes too!", category: 'activity', isKidFriendly: true, isDogFriendly: true, duration: '30 mins', location: 'St. Ignace Dock, MI' },
      { id: 'mtg-3', time: '10:45 AM', label: 'Rent Island Bikes & 8-Mile Coastal Loop', details: 'Mackinac is famous for having absolutely zero cars! Rent bicycles directly off the pier and a kid trailer for Reva & Kabir. If Fitzy is small enough he rides in a front basket — otherwise one of you walks him while the others pedal the flat, paved 8-mile loop around the island, with turquoise waves crashing beside you.', category: 'activity', isKidFriendly: true, isDogFriendly: true, duration: '2 hours', location: 'Mackinac Island, MI' },
      { id: 'mtg-4', time: '12:45 PM', label: 'Island Lunch & Fudge Shopping', details: 'Grab a delicious lunch on Main Street and visit iconic candy shops to let Reva & Kabir watch them pour legendary chocolate fudge on marble slabs. Buy a box for the car!', category: 'food', isKidFriendly: true, duration: '1.5 hours' },
      { id: 'mtg-5', time: '02:15 PM', label: 'Ferry Return to Mainland', details: 'Take the boat back to Saint Ignace and hop into the Tesla.', category: 'travel', duration: '30 mins' },
      { id: 'mtg-6', time: '02:45 PM', label: 'Drive South over the Great Mackinac Bridge', details: 'Drive across the spectacular 5-mile suspension bridge, looking down at Lake Michigan on your right and Lake Huron on your left.', category: 'travel', duration: '30 mins' },
      { id: 'mtg-7', time: '03:15 PM', label: 'Supercharge: Mackinaw City', details: 'Quick convenience charge immediately upon crossing the bridge so you are ready for the Lower Michigan highway run.', category: 'charge', isTeslaSupercharge: true, duration: '30 mins', location: 'Mackinaw City, MI' },
      { id: 'mtg-8', time: '04:00 PM', label: 'Drive to Halfway Stop (Gaylord)', details: 'Head south into the Lower Peninsula woods toward your dog-friendly hotel (~1.5 hours).', category: 'travel', duration: '1.5 hours' },
      { id: 'mtg-9', time: '06:00 PM', label: 'Settle into Hotel & Celebration Family Dinner', details: 'Check into your dog-friendly suite. Head out to a cozy sit-down tavern or local brewery to celebrate the amazing UP memories with Archana and the kids!', category: 'lodging', location: 'Gaylord, MI' },
    ],
  }),

  gaylordHome: block({
    title: 'Homeward Bound',
    subtitle: 'Lower Michigan to Chicago',
    highlight: 'Smooth charging stops and arriving home with plenty of daylight to settle in',
    stats: { drivingTime: 'approx. 6 hours total', superchargeStopCount: 1, highlights: ['Grand Rapids charge stop', 'Cross border late lunch'] },
    items: [
      { id: 'gho-1', time: '08:30 AM', label: 'Hotel Breakfast & Highway South', details: 'Fuel up, load the luggage, and head south down US-131 on a smooth driving lane toward Chicago.', category: 'travel', duration: '2 hours' },
      { id: 'gho-2', time: '10:30 AM', label: 'Supercharge: Grand Rapids / Kalamazoo', details: 'Quick top-off at the Meijer Supercharger. Grab a hot coffee, run around the grass with Reva and Kabir, and let Fitzy stretch his paws.', category: 'charge', isTeslaSupercharge: true, duration: '30 mins' },
      { id: 'gho-3', time: '11:00 AM', label: 'The Final Stretching Highway Run', details: 'Smooth cruising down toward Indiana dunes and Chicago skyline.', category: 'travel', duration: '2.5 hours' },
      { id: 'gho-4', time: '01:30 PM', label: 'Border Crossing Lunch Stop', details: 'Stop for a relaxed diner lunch just over the border in Indiana or Illinois to ease the final transition.', category: 'food', duration: '1 hour' },
      { id: 'gho-5', time: '03:30 PM', label: 'Arrive Home in Chicago!', details: 'Pull back into your driveway. Plenty of daylight left to unload the car cooler, start a load of laundry, and let everyone rest.', category: 'travel', location: 'Chicago, IL' },
    ],
  }),

  // Mackinac as a relaxed finale — overnight right at the straits instead of pushing on.
  mackinacFinale: block({
    title: 'Mackinac Island Finale',
    subtitle: 'Car-Free Island, Then the Big Bridge',
    highlight: "Check out and end the trip with the UP's most iconic day — bikes and fudge on Mackinac, then a sunset over the bridge",
    stats: { drivingTime: 'approx. 3 hours total', superchargeStopCount: 1, highlights: ['Mackinac Island Ferry', '8-Mile Bike Loop', 'Fudge', 'Mackinac Bridge at dusk'] },
    items: [
      { id: 'mcf-1', time: '07:30 AM', label: 'Check-out & Drive to St. Ignace', details: 'Lock up the cabin and take the highway east to the Straits of Mackinac (~2.5 hours).', category: 'travel', duration: '2.5 hours' },
      { id: 'mcf-2', time: '10:15 AM', label: "Shepler's Ferry to Mackinac Island", details: 'Leashed dogs ride free on the ferry deck, so Fitzy comes too. Fifteen breezy minutes across the straits with the bridge in view.', category: 'activity', isDogFriendly: true, isKidFriendly: true, duration: '30 mins', location: 'St. Ignace, MI' },
      { id: 'mcf-3', time: '10:45 AM', label: 'Rent Bikes & Ride the 8-Mile Loop', details: 'No cars on the whole island! Rent bikes and a kid trailer; if Fitzy is small enough he rides in a basket, otherwise one of you walks him while the others pedal the flat, paved shoreline loop.', category: 'activity', isKidFriendly: true, isDogFriendly: true, duration: '2 hours', location: 'Mackinac Island, MI' },
      { id: 'mcf-4', time: '12:45 PM', label: 'Island Lunch & Fudge', details: 'Lunch on Main Street and watch them pour fudge on marble slabs. Buy a box for the road home.', category: 'food', isKidFriendly: true, duration: '1.5 hours' },
      { id: 'mcf-5', time: '02:15 PM', label: 'Ferry Back to the Mainland', details: 'Catamaran back to St. Ignace and into the Tesla.', category: 'travel', duration: '30 mins' },
      { id: 'mcf-6', time: '02:45 PM', label: 'Drive Over the Mighty Mackinac Bridge', details: 'Cross the 5-mile suspension bridge — Lake Michigan on one side, Lake Huron on the other.', category: 'travel', duration: '20 mins' },
      { id: 'mcf-7', time: '03:15 PM', label: 'Supercharge & Check-in: Mackinaw City', details: 'Charge at the Supercharger right by the bridge and check into a dog-friendly hotel at the straits.', category: 'charge', isTeslaSupercharge: true, location: 'Mackinaw City, MI' },
      { id: 'mcf-8', time: '06:00 PM', label: 'Bridge-View Dinner & Sunset', details: 'Celebration dinner with a view of the bridge lighting up over the water — a perfect last night before the drive home.', category: 'food', isKidFriendly: true, isDogFriendly: true },
    ],
  }),

  mackinawHome: block({
    title: 'The Long Way Home',
    subtitle: 'Mackinaw City to Chicago',
    highlight: 'The one real drive of the back half — smooth highways down through Michigan with easy charge stops',
    stats: { drivingTime: 'approx. 6.5 hours total', superchargeStopCount: 2, highlights: ['Down through Michigan', 'Two charge stops', 'Home by evening'] },
    items: [
      { id: 'mwh-1', time: '08:30 AM', label: 'Breakfast & Head South', details: 'Fuel up and roll south down I-75 toward Grand Rapids.', category: 'travel', duration: '2.5 hours' },
      { id: 'mwh-2', time: '11:00 AM', label: 'Supercharge: Gaylord / Grand Rapids', details: 'Top off, stretch, and let Fitzy and the kids run the grass.', category: 'charge', isTeslaSupercharge: true, duration: '30 mins' },
      { id: 'mwh-3', time: '11:30 AM', label: 'Continue South', details: 'Smooth cruising down US-131 toward the state line.', category: 'travel', duration: '2.5 hours' },
      { id: 'mwh-4', time: '02:00 PM', label: 'Late Lunch near the Border', details: 'Relaxed diner lunch just over the Indiana/Illinois line to ease the final stretch.', category: 'food', duration: '1 hour' },
      { id: 'mwh-5', time: '04:30 PM', label: 'Arrive Home in Chicago!', details: 'A long day, but you made it — unload, relax, and let everyone crash after the big finale.', category: 'travel', location: 'Chicago, IL' },
    ],
  }),

  // ── Chill exit (drive home split into two easy halves, west side) ──────
  departWest: block({
    title: 'Slow Morning, Easy Start Home',
    subtitle: 'Au Train to Green Bay',
    highlight: 'One last lake morning, then a gentle half-drive south to Green Bay so the trip home is never a slog',
    stats: { drivingTime: 'approx. 3.5 hours', superchargeStopCount: 1, highlights: ['Final lake morning', 'Escanaba charge stop', 'Overnight in Green Bay'] },
    items: [
      { id: 'dw-1', time: '09:00 AM', label: 'Final Lakeside Morning & Pack Up', details: 'Coffee on the deck, one last skip of stones, load the car slowly, and say goodbye to the lake.', category: 'lodging' },
      { id: 'dw-2', time: '11:00 AM', label: 'Roll South Out of the UP', details: 'Easy drive back down through the UP toward Wisconsin.', category: 'travel', duration: '2 hours' },
      { id: 'dw-3', time: '12:00 PM', label: 'Supercharge & Lunch: Escanaba', details: 'Top off the battery and grab lunch — let everyone run around the grass before the next leg.', category: 'charge', isTeslaSupercharge: true, isKidFriendly: true, duration: '1 hour', location: 'Meijer, Escanaba, MI' },
      { id: 'dw-4', time: '01:30 PM', label: 'Cross into Wisconsin', details: "Roll south along Green Bay's shoreline back to the city.", category: 'travel', duration: '2 hours' },
      { id: 'dw-5', time: '04:00 PM', label: 'Check-in: Green Bay Hotel & Easy Dinner', details: 'Settle into your dog-friendly hotel, let the kids hit the pool, and grab an easy dinner. Half the drive home is already behind you.', category: 'lodging', isDogFriendly: true, location: 'Green Bay, WI' },
    ],
  }),

  greenBayHome: block({
    title: 'Homeward Bound',
    subtitle: 'Green Bay to Chicago',
    highlight: 'A short, easy final leg — home with the whole afternoon to spare',
    stats: { drivingTime: 'approx. 3.5 hours', superchargeStopCount: 1, highlights: ['Easy highway run', 'Home by early afternoon'] },
    items: [
      { id: 'gbh-1', time: '09:00 AM', label: 'Hotel Breakfast & Highway South', details: 'Slow breakfast, load up, and roll south on I-43 toward Milwaukee and Chicago.', category: 'travel', duration: '1.5 hours' },
      { id: 'gbh-2', time: '10:30 AM', label: 'Supercharge: Milwaukee Area', details: 'One easy top-off with a coffee and a Fitzy walk.', category: 'charge', isTeslaSupercharge: true, duration: '30 mins' },
      { id: 'gbh-3', time: '11:15 AM', label: 'Final Stretch to Chicago', details: 'Smooth cruise down the lakeshore toward the skyline.', category: 'travel', duration: '1.5 hours' },
      { id: 'gbh-4', time: '12:45 PM', label: 'Welcome-Home Lunch Stop', details: 'Grab a relaxed lunch on the way in to stretch the last leg out.', category: 'food', duration: '1 hour' },
      { id: 'gbh-5', time: '02:00 PM', label: 'Arrive Home in Chicago!', details: 'Pull in with the whole afternoon free to unpack, do laundry, and ease back into real life.', category: 'travel', location: 'Chicago, IL' },
    ],
  }),
};

// ---------------------------------------------------------------------------
// MAP ROUTE POINTS — shared coordinates; each variant picks which appear.
// ---------------------------------------------------------------------------
const P: Record<string, Omit<RouteStop, 'day' | 'desc'>> = {
  chicago: { name: 'Chicago', x: 42, y: 92, type: 'origin' },
  pleasant: { name: 'Pleasant Prairie Charger', x: 42, y: 81, type: 'supercharge' },
  harrington: { name: 'Harrington Beach', x: 44, y: 69, type: 'activity' },
  greenBay: { name: 'Green Bay', x: 41, y: 55, type: 'stop' },
  milwaukee: { name: 'Milwaukee Charger', x: 43, y: 73, type: 'supercharge' },
  escanaba: { name: 'Escanaba Charger', x: 39, y: 36, type: 'supercharge' },
  kitch: { name: 'Kitch-iti-kipi Spring', x: 50, y: 31, type: 'activity' },
  auTrain: { name: 'Au Train Basecamp', x: 49, y: 22, type: 'airbnb' },
  minersCastle: { name: 'Miners Castle & Beach', x: 54, y: 19, type: 'activity' },
  marquette: { name: 'Marquette', x: 35, y: 19, type: 'activity' },
  tahquamenon: { name: 'Tahquamenon Falls', x: 74, y: 22, type: 'activity' },
  stIgnace: { name: 'St. Ignace Ferry', x: 80, y: 28, type: 'stop' },
  mackinac: { name: 'Mackinac Island', x: 84, y: 26, type: 'activity' },
  mackinawCity: { name: 'Mackinaw City Charger', x: 80, y: 32, type: 'supercharge' },
  gaylord: { name: 'Gaylord', x: 78, y: 44, type: 'stop' },
  grandRapids: { name: 'Grand Rapids Charger', x: 69, y: 65, type: 'supercharge' },
};

// Shared opening leg (Chicago → Green Bay → Escanaba → Kitch-iti-kipi → basecamp).
const arrivalRoute: RouteStop[] = [
  { ...P.chicago, day: 1, desc: 'Depart 8:00 AM' },
  { ...P.pleasant, day: 1, desc: 'Supercharge (9:30 AM)' },
  { ...P.harrington, day: 1, desc: 'Beach walk (11:00 AM)' },
  { ...P.greenBay, day: 1, desc: 'Bay Beach & overnight' },
  { ...P.escanaba, day: 2, desc: 'Supercharge & grocery run' },
  { ...P.kitch, day: 2, desc: 'Ferry over the Big Spring' },
  { ...P.auTrain, day: 2, desc: 'Lakeside basecamp check-in' },
  { ...P.minersCastle, day: 4, desc: 'Pictured Rocks by land with Fitzy' },
];

// ---------------------------------------------------------------------------
// TRIP VARIANTS — the family toggles between these on the site.
// ---------------------------------------------------------------------------
export const TRIP_VARIANTS: TripVariant[] = [
  {
    id: 'max-chill',
    name: 'Max Chill',
    emoji: '🏖️',
    tagline: 'Plant yourself at the lake. Wander only when you feel like it.',
    chillLevel: 5,
    adventureLevel: 2,
    drivingLevel: 2,
    driveHours: '~15 hrs total (mostly just getting there & back)',
    lakeDays: 2,
    bigAdventures: 0,
    routeHome: 'Short west loop back through Green Bay',
    sees: ['Pictured Rocks (Miners Castle, Sand Point, Munising Falls)', 'Kitch-iti-kipi spring', 'Au Train Lake — paddling & campfires', 'Marquette & the iron sculpture park'],
    skips: ['Tahquamenon Falls', 'Mackinac Island'],
    forKids: '🏖️ Two whole days to swim, build sandcastles, paddle the canoe, and roast s\'mores!',
    pros: ['Least time in the car by a mile', 'Real downtime — nobody (and no dog) gets over-tired', 'Fewest charging worries — you barely leave the basecamp area', 'Easiest to just be spontaneous'],
    cons: ['You skip the two "wow" trips (the big falls & the island)', 'Could feel slow for a go-go-go 7-year-old', 'Save Mackinac & Tahquamenon for a future UP trip'],
    itinerary: buildDays(B.arriveGreenBay, B.arriveAuTrain, B.prFalls, B.prLand, B.marquette, B.lakeDay, B.departWest, B.greenBayHome),
    route: [
      ...arrivalRoute,
      { ...P.marquette, day: 5, desc: 'Sculpture park & Presque Isle' },
      { ...P.greenBay, day: 7, desc: 'Overnight on the way home' },
      { ...P.chicago, day: 8, desc: 'Home by early afternoon' },
    ],
  },
  {
    id: 'keep-mackinac',
    name: 'Keep Mackinac',
    emoji: '🏰',
    tagline: 'Chill at the lake all week, then end big on car-free Mackinac Island.',
    chillLevel: 3,
    adventureLevel: 4,
    drivingLevel: 4,
    driveHours: '~19 hrs total',
    lakeDays: 1,
    bigAdventures: 1,
    routeHome: 'East exit over the Mackinac Bridge',
    sees: ['Everything in Max Chill', 'Mackinac Island — bikes, fudge, zero cars', 'The 5-mile Mackinac Bridge'],
    skips: ['Tahquamenon Falls'],
    forKids: '🚲 Bike all the way around an island with NO cars, watch fudge get made, then drive across a giant 5-mile bridge!',
    pros: ['Keeps the single most iconic UP day', 'Mackinac is genuinely magical for kids', "It's on the way home (east exit), not a backtrack", 'Still a relaxed week before the big finale'],
    cons: ['Longest drive home (over the bridge & down lower Michigan)', 'One big, full day on the island', 'Two charge stops on the way out'],
    itinerary: buildDays(B.arriveGreenBay, B.arriveAuTrain, B.prFalls, B.prLand, B.marquette, B.lakeDay, B.mackinacFinale, B.mackinawHome),
    route: [
      ...arrivalRoute,
      { ...P.marquette, day: 5, desc: 'Sculpture park & Presque Isle' },
      { ...P.stIgnace, day: 7, desc: 'Ferry to the island' },
      { ...P.mackinac, day: 7, desc: '8-mile bike loop & fudge' },
      { ...P.mackinawCity, day: 7, desc: 'Bridge crossing & overnight' },
      { ...P.grandRapids, day: 8, desc: 'Charge stop heading home' },
      { ...P.chicago, day: 8, desc: 'Home by evening' },
    ],
  },
  {
    id: 'keep-tahquamenon',
    name: 'Keep Tahquamenon',
    emoji: '🌲',
    tagline: 'Lazy lake week with one epic root-beer waterfall adventure.',
    chillLevel: 3,
    adventureLevel: 4,
    drivingLevel: 4,
    driveHours: '~18 hrs total',
    lakeDays: 1,
    bigAdventures: 1,
    routeHome: 'West loop back through Green Bay',
    sees: ['Everything in Max Chill (minus Marquette)', 'Upper Tahquamenon Falls (root-beer colored!)', 'Lower Falls rowboats to a river island'],
    skips: ['Mackinac Island', 'Marquette day trip'],
    forKids: '🛶 Row a little boat to an island of mini-waterfalls and see a giant waterfall the color of root beer!',
    pros: ['Keeps the best UP waterfall day', 'Rowboats + climbable rapids = big kid fun', 'Shorter west-loop drive home than the Mackinac option'],
    cons: ['Longest single driving day (2+ hrs each way to the falls)', "This is the 'charging desert' day — leave on a full battery", 'One big day out in the middle of a chill week'],
    itinerary: buildDays(B.arriveGreenBay, B.arriveAuTrain, B.prFalls, B.prLand, B.lakeDay, B.tahquamenon, B.departWest, B.greenBayHome),
    route: [
      ...arrivalRoute,
      { ...P.tahquamenon, day: 6, desc: 'Root-beer falls & rowboats' },
      { ...P.greenBay, day: 7, desc: 'Overnight on the way home' },
      { ...P.chicago, day: 8, desc: 'Home by early afternoon' },
    ],
  },
  {
    id: 'do-it-all',
    name: 'Do It All',
    emoji: '🎢',
    tagline: 'The full bucket list — every UP highlight, back to back.',
    chillLevel: 1,
    adventureLevel: 5,
    drivingLevel: 5,
    driveHours: '~24 hrs total',
    lakeDays: 0,
    bigAdventures: 2,
    routeHome: 'East exit over the bridge via Gaylord',
    sees: ['Pictured Rocks', 'Kitch-iti-kipi', 'Marquette', 'Tahquamenon Falls', 'Mackinac Island', 'The Mackinac Bridge'],
    skips: ['A real rest day'],
    forKids: '🎢 EVERYTHING — waterfalls, an island, bikes, boats, fudge, sculptures, and a giant bridge!',
    pros: ['See every marquee UP attraction in one trip', "No FOMO — you don't skip anything", 'Most variety day-to-day'],
    cons: ['Most driving by far (two 2+ hr-each-way days back to back)', 'No true rest day — risky with a 4-yr-old + senior dog', 'Two charging-stress days', 'Easiest to feel rushed & over-tired'],
    itinerary: buildDays(B.arriveGreenBay, B.arriveAuTrain, B.prFalls, B.prLand, B.marquette, B.tahquamenon, B.mackinacToGaylord, B.gaylordHome),
    route: [
      ...arrivalRoute,
      { ...P.marquette, day: 5, desc: 'Sculpture park & Presque Isle' },
      { ...P.tahquamenon, day: 6, desc: 'Root-beer falls & rowboats' },
      { ...P.stIgnace, day: 7, desc: 'Ferry to Mackinac' },
      { ...P.mackinac, day: 7, desc: '8-mile bike loop & fudge' },
      { ...P.mackinawCity, day: 7, desc: 'Bridge crossing & charge' },
      { ...P.gaylord, day: 7, desc: 'Overnight halfway home' },
      { ...P.grandRapids, day: 8, desc: 'Charge stop heading home' },
      { ...P.chicago, day: 8, desc: 'Home mid-afternoon' },
    ],
  },
];

export const DEFAULT_VARIANT_ID = 'max-chill';

export const INITIAL_PACKING_LIST: PackingItem[] = [
  { id: 'p1', text: '🔌 Pack Tesla Mobile Connector & adapter nozzles', category: 'Tesla', checked: false },
  { id: 'p2', text: "🚤 If you booked the Pictured Rocks cruise, cancel it for a refund — we're going by land", category: 'General', checked: false },
  { id: 'p3', text: '🎫 Acquire Wisconsin State Park pass (or buy day passes)', category: 'General', checked: false },
  { id: 'p4', text: '🌲 Buy Michigan Recreation Passport (covers Kitch-iti-kipi & Tahquamenon)', category: 'General', checked: false },
  { id: 'p-lodging-1', text: '🏨 Book dog-friendly Green Bay hotel (first night up)', category: 'General', checked: false },
  { id: 'p-lodging-2', text: '🏡 Book Au Train lake cabin — CONFIRM EV charging / a 240V outlet for the Tesla', category: 'General', checked: false },
  { id: 'p-lodging-3', text: '🏨 Book the last-night stop once you pick the route home (Green Bay, or near Mackinac)', category: 'General', checked: false },
  { id: 'p5', text: "🦮 Bring Fitzy's 10ft leash (required for State/National Park trails)", category: 'Fitzy (Dog)', checked: false },
  { id: 'p6', text: "📦 Pack Fitzy's crate or portable playpen for cabin stays", category: 'Fitzy (Dog)', checked: false },
  { id: 'p7', text: "🧸 Pack Fitzy's plush dog bed, chew toys, and favorite blanket", category: 'Fitzy (Dog)', checked: false },
  { id: 'p8', text: "🥣 Pre-pack Fitzy's food storage & collapsible travel bowls", category: 'Fitzy (Dog)', checked: false },
  { id: 'p9', text: '🔌 Pack Tesla J1772 adapter (cabin charging + the L2 chargers at Tahquamenon)', category: 'Tesla', checked: false },
  { id: 'p10', text: '🏖️ Gather sand toys, buckets, and shovels for Sand Point Beach', category: 'Kids (Reva & Kabir)', checked: false },
  { id: 'p11', text: '🛟 Pack child puddle jumpers and life jackets for Lake Superior', category: 'Kids (Reva & Kabir)', checked: false },
  { id: 'p12', text: '⛱️ Load beach pop-up tent, shade umbrella, and folding chairs', category: 'Beach & Outdoors', checked: false },
  { id: 'p13', text: '🥾 Pack water shoes (Lake Superior beaches can be beautifully rocky)', category: 'Beach & Outdoors', checked: false },
  { id: 'p14', text: '🩱 Pack family swimsuits, rashguards, and quick-dry towels', category: 'Beach & Outdoors', checked: false },
  { id: 'p15', text: '🦟 Pack high-strength bug spray (essential for woods) & sunscreen', category: 'Beach & Outdoors', checked: false },
  { id: 'p16', text: '📱 Mount travel tablet headrests and route car chargers', category: 'Kids (Reva & Kabir)', checked: false },
  { id: 'p17', text: "🍫 Buy campfire s'mores skewers, graham crackers, and roasting wood", category: 'Beach & Outdoors', checked: false },
  { id: 'p18', text: "💵 Withdraw fudge budget cash (and quarters for Reva & Kabir's Bay Beach rides)", category: 'General', checked: false },
];

export const INITIAL_NOTES: QuickNote[] = [
  { id: 'n1', text: '🏡 Au Train lake cabin — your basecamp for ~5 nights. [NOT BOOKED YET] When booking, look for one with EV charging (a 240V / dryer-style outlet works with the J1772 adapter) so the Tesla refills overnight.', timestamp: '2026-06-14T15:30:00-07:00', category: 'Lodging' },
  { id: 'n2', text: '🏨 Green Bay hotel — first night on the way up (and last night home if you take the west loop). [NOT BOOKED YET]', timestamp: '2026-06-14T15:45:00-07:00', category: 'Lodging' },
  { id: 'n3', text: '🏨 Last-night stop depends on the plan: Green Bay (west loop) or near the Mackinac Bridge / Gaylord (if you keep Mackinac). Book once the family picks a trip shape.', timestamp: '2026-06-14T15:50:00-07:00', category: 'Lodging' },
  { id: 'n4', text: "🚤 Pictured Rocks is BY LAND (Miners Castle + Miners Beach) so Fitzy's always with us — dogs can't board the tour boats. If you booked a cruise, cancel for a refund.", timestamp: '2026-06-14T16:00:00-07:00', category: 'Activities' },
  { id: 'n5', text: '🔋 No Tesla Supercharger at the Au Train basecamp — nearest is Marquette (~40 min). The week leans on cabin charging, so confirm it before booking. Superchargers en route: Escanaba, Marquette, Mackinaw City.', timestamp: '2026-06-14T16:10:00-07:00', category: 'Charging' },
];
