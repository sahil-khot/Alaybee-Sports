const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
const Product = require('../models/Product');

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(4000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// 10 categories with curated item names and candidate photo IDs
const rawCategoryConfig = {
  Cricket: {
    ids: [
      'photo-1540747913346-19e32dc3e97e', 'photo-1531415074968-036ba1b575da', 'photo-1624526267942-ab0ff8a3e972',
      'photo-1531482615713-2afd69097998', 'photo-1587280501635-68a0e82cd5ff', 'photo-1589487391730-58f20eb2c308',
      'photo-1593341646782-e0b495cff86d', 'photo-1548690312-e3b507d8c110', 'photo-1512719994953-eabf50895df7',
      'photo-1571019613454-1cb2f99b2d8b', 'photo-1563299796-17596ed6b017', 'photo-1599586120429-48281b6f0ece',
      'photo-1517649763962-0c623066013b', 'photo-1534438327276-14e5300c3a48', 'photo-1546519638-68e109498ffc',
      'photo-1584735935682-2f2b69dff9d2', 'photo-1579952363873-27f3bade9f55', 'photo-1554068865-24cecd4e34b8',
      'photo-1485965120184-e220f721d03e', 'photo-1542291026-7eec264c27ff'
    ],
    items: [
      { name: "Alaybee Master English Willow Cricket Bat", price: 5499, oldPrice: 7499, discount: 27, brand: "Alaybee Pro", isBestSeller: true },
      { name: "Four-Piece Alum Leather Match Cricket Ball (Box of 4)", price: 1299, oldPrice: 1699, discount: 24, brand: "Alaybee Match", isBestSeller: true },
      { name: "Titanium Grille Pro Batting Helmet", price: 2599, oldPrice: 3499, discount: 26, brand: "AeroGuard" },
      { name: "Dual Cane Moulded Batting Leg Guards (Pads)", price: 1999, oldPrice: 2699, discount: 26, brand: "Alaybee Pro" },
      { name: "Pittards Leather Palm Batting Gloves", price: 1499, oldPrice: 1999, discount: 25, brand: "Alaybee Pro", isBestSeller: true },
      { name: "Pro Wheeled Heavy Duty Cricket Kit Bag", price: 3199, oldPrice: 4499, discount: 29, brand: "Alaybee Pro" },
      { name: "Seasoned Ash Hardwood Stumps & Bails Set", price: 949, oldPrice: 1399, discount: 32, brand: "Alaybee Match" },
      { name: "Wicket Keeping Pro Gloves with Gel Inners", price: 1899, oldPrice: 2499, discount: 24, brand: "Alaybee Pro" },
      { name: "Full Metal Spike Tournament Cricket Shoes", price: 2899, oldPrice: 3899, discount: 26, brand: "PaceMaster" },
      { name: "Dynamic Sidearm Ball Speed Thrower", price: 849, oldPrice: 1299, discount: 35, brand: "SpeedMaster", isBestSeller: true },
      { name: "Armour Compression Thigh Guard Combo", price: 1199, oldPrice: 1599, discount: 25, brand: "AeroGuard" },
      { name: "Match Regulation White Cricket Balls (Pack of 2)", price: 799, oldPrice: 1099, discount: 27, brand: "Alaybee Match" },
      { name: "Kashmir Willow Power Drive Cricket Bat", price: 1999, oldPrice: 2799, discount: 29, brand: "Alaybee Sports" },
      { name: "Anti-Shock Chest Guard for Batsmen", price: 799, oldPrice: 1199, discount: 33, brand: "AeroGuard" },
      { name: "Cricket Bat Grip Cone & 3 Replacement Grips", price: 349, oldPrice: 499, discount: 30, brand: "Alaybee Sports" },
      { name: "Heavy Rubber Bowling Target Return Net", price: 2199, oldPrice: 2999, discount: 27, brand: "FieldMaster" }
    ]
  },
  Football: {
    ids: [
      'photo-1579952363873-27f3bade9f55', 'photo-1511886929837-354d827aae26', 'photo-1574629810360-7efbbe195018',
      'photo-1551958219-acbc608c6377', 'photo-1526232761682-d26e03ac148e', 'photo-1560272564-c83b66b1ad12',
      'photo-1431324155629-1a6deb1dec8d', 'photo-1517466787929-bc90951d0974', 'photo-1553778263-73a83bab9b0c',
      'photo-1529900748604-07564a03e7a6', 'photo-1489944440615-453fc2b6a9a9', 'photo-1551288049-bebda4e38f71',
      'photo-1517927033932-b3d18e61fb3a', 'photo-1522778119026-d647f0596c20', 'photo-1517649763962-0c623066013b',
      'photo-1540747913346-19e32dc3e97e', 'photo-1518063319789-7217e6706b04', 'photo-1552346154-21d32810aba3',
      'photo-1534438327276-14e5300c3a48', 'photo-1542291026-7eec264c27ff'
    ],
    items: [
      { name: "Striker Pro Thermal Bonded FIFA Match Ball", price: 1599, oldPrice: 2299, discount: 30, brand: "Alaybee Striker", isBestSeller: true },
      { name: "Phantom Touch FG Studs Football Cleats", price: 3499, oldPrice: 4699, discount: 26, brand: "StrikePro", isBestSeller: true },
      { name: "German Latex Grip Goalkeeper Gloves with Finger Spines", price: 1799, oldPrice: 2499, discount: 28, brand: "GripMaster" },
      { name: "Anatomical Shield Shin Guards with Ankle Support", price: 649, oldPrice: 899, discount: 28, brand: "DefendX" },
      { name: "Speed & Agility Ladder 6m with 20 Marker Cones", price: 949, oldPrice: 1399, discount: 32, brand: "CoachKit", isBestSeller: true },
      { name: "Pop-Up Portable Foldable Goal Net (Set of 2)", price: 2299, oldPrice: 3199, discount: 28, brand: "FieldPro" },
      { name: "Breathable Squad Training Pinnies (Pack of 10)", price: 1099, oldPrice: 1599, discount: 31, brand: "Alaybee Striker" },
      { name: "Dual-Action Ball Hand Pump with PSI Barometer", price: 549, oldPrice: 799, discount: 31, brand: "AirMaster" },
      { name: "Graduated Compression Football Match Socks (3 Pairs)", price: 599, oldPrice: 899, discount: 33, brand: "StrideShield" },
      { name: "Official Match Referee Whistle & Wallet Cards", price: 449, oldPrice: 649, discount: 31, brand: "MatchOfficial" },
      { name: "Turf Soccer Training Shoes with Rubber Studs", price: 2499, oldPrice: 3299, discount: 24, brand: "StrikePro" },
      { name: "Heavy Duty Football Ball Carry Bag (Holds 12 Balls)", price: 899, oldPrice: 1299, discount: 31, brand: "FieldPro" },
      { name: "Anti-Slip Sports Grip Socks (Pack of 3)", price: 499, oldPrice: 799, discount: 38, brand: "GripLock" },
      { name: "Football Rebounder Passing Board", price: 2999, oldPrice: 4199, discount: 29, brand: "CoachKit" },
      { name: "Captain Armband Elastic High-Vis Band", price: 199, oldPrice: 299, discount: 33, brand: "Alaybee Striker" },
      { name: "Size 4 Youth Junior Training Football", price: 899, oldPrice: 1299, discount: 31, brand: "Alaybee Striker" }
    ]
  },
  Basketball: {
    ids: [
      'photo-1519861531473-9200262188bf', 'photo-1546519638-68e109498ffc', 'photo-1552346154-21d32810aba3',
      'photo-1574623452334-1e0ac2b3ccb4', 'photo-1518063319789-7217e6706b04', 'photo-1534438327276-14e5300c3a48',
      'photo-1517649763962-0c623066013b', 'photo-1541534741688-6078c6bfb5c5', 'photo-1431324155629-1a6deb1dec8d',
      'photo-1517466787929-bc90951d0974', 'photo-1553778263-73a83bab9b0c', 'photo-1529900748604-07564a03e7a6',
      'photo-1489944440615-453fc2b6a9a9', 'photo-1551288049-bebda4e38f71', 'photo-1517927033932-b3d18e61fb3a',
      'photo-1522778119026-d647f0596c20', 'photo-1542291026-7eec264c27ff', 'photo-1553062407-98eeb64c6a62',
      'photo-1507035895480-2b3156c31fc8', 'photo-1584735935682-2f2b69dff9d2'
    ],
    items: [
      { name: "Court Master Composite Leather Official Basketball #7", price: 1299, oldPrice: 1799, discount: 28, brand: "Alaybee Court", isBestSeller: true },
      { name: "High-Top Cushioned Ankle Lock Basketball Shoes", price: 3999, oldPrice: 5499, discount: 27, brand: "AeroDunk", isBestSeller: true },
      { name: "Heavy Duty Breakaway Spring Basketball Rim & Net", price: 2699, oldPrice: 3699, discount: 27, brand: "HoopMaster" },
      { name: "Padded Hex Elbow Shooter Arm Sleeve (Pair)", price: 649, oldPrice: 949, discount: 32, brand: "FlexGuard" },
      { name: "Zinc-Plated Steel Chain All-Weather Basketball Net", price: 549, oldPrice: 799, discount: 31, brand: "StreetHoops" },
      { name: "Dribble Blind Glasses for Ball Handling Training", price: 399, oldPrice: 599, discount: 33, brand: "HoopIQ" },
      { name: "Basketball Gear Backpack with Mesh Ball Holder", price: 1499, oldPrice: 2099, discount: 29, brand: "Alaybee Court", isBestSeller: true },
      { name: "Outdoor Concrete Tarmac Deep Channel Basketball", price: 749, oldPrice: 999, discount: 25, brand: "StreetKing" },
      { name: "Magnetic Tactical Coaches Dry-Erase Whiteboard", price: 799, oldPrice: 1199, discount: 33, brand: "CoachBoard" },
      { name: "Reversible Scrimmage Mesh Basketball Uniform", price: 1299, oldPrice: 1799, discount: 28, brand: "Alaybee Court" },
      { name: "Heavy Weighted Training Basketball for Wrist Strength", price: 1599, oldPrice: 2199, discount: 27, brand: "HoopIQ" },
      { name: "Basketball Knee Support Compression Sleeves (Pair)", price: 699, oldPrice: 999, discount: 30, brand: "FlexGuard" },
      { name: "Portable Adjustable Basketball Hoop Stand (10ft)", price: 8999, oldPrice: 11999, discount: 25, brand: "HoopMaster" },
      { name: "Non-Slip Court Floor Traction Mat & Sheet Kit", price: 1899, oldPrice: 2499, discount: 24, brand: "CourtCare" },
      { name: "Digital Shot Clock & Scoreboard Timer", price: 2499, oldPrice: 3499, discount: 29, brand: "MatchOfficial" },
      { name: "Junior Size 5 Indoor/Outdoor Youth Basketball", price: 699, oldPrice: 999, discount: 30, brand: "Alaybee Court" }
    ]
  },
  Tennis: {
    ids: [
      'photo-1554068865-24cecd4e34b8', 'photo-1622279457486-62dcc4a431d6', 'photo-1595435934249-5df7ed86e1c0',
      'photo-1588850561407-ed78c282e89b', 'photo-1530915536848-181b53f65e2b', 'photo-1461896836934-ffe607ba8211',
      'photo-1517649763962-0c623066013b', 'photo-1541534741688-6078c6bfb5c5', 'photo-1534438327276-14e5300c3a48',
      'photo-1542291026-7eec264c27ff', 'photo-1553062407-98eeb64c6a62', 'photo-1507035895480-2b3156c31fc8',
      'photo-1584735935682-2f2b69dff9d2', 'photo-1626224583764-f87db24ac4ea', 'photo-1613918108466-292b78a8ef95',
      'photo-1521537634581-0dced2fed2a8', 'photo-1485965120184-e220f721d03e', 'photo-1558981403-c5f9899a28bc',
      'photo-1532298229144-0ec0c57515c7', 'photo-1576435728678-68d0fbf94e91'
    ],
    items: [
      { name: "Pure Spin Carbon Fiber Tennis Racket (300g)", price: 4299, oldPrice: 5999, discount: 28, brand: "Alaybee Spin", isBestSeller: true },
      { name: "Championship Tournament Tennis Balls (Can of 3)", price: 449, oldPrice: 599, discount: 25, brand: "TourCore", isBestSeller: true },
      { name: "Clay & Hard Court Non-Marking Tennis Shoes", price: 2999, oldPrice: 4199, discount: 29, brand: "ServeVolley" },
      { name: "Thermo-Insulated 6-Racket Tennis Bag", price: 2499, oldPrice: 3499, discount: 29, brand: "Alaybee Court" },
      { name: "Ultra-Tacky Sweat Absorbent Overgrips (Pack of 12)", price: 549, oldPrice: 849, discount: 35, brand: "GripMaster", isBestSeller: true },
      { name: "Steel Ball Pickup Caddy Hopper (Holds 75 Balls)", price: 1999, oldPrice: 2799, discount: 29, brand: "CourtCaddy" },
      { name: "Silicone Tennis Racket Vibration Dampeners (Pack of 4)", price: 299, oldPrice: 449, discount: 33, brand: "QuietStrike" },
      { name: "Solo Tennis Trainer with High-Rebound Elastic Base", price: 749, oldPrice: 1099, discount: 32, brand: "SoloAce" },
      { name: "Aerodynamic Breathable UPF50+ Court Cap", price: 499, oldPrice: 749, discount: 33, brand: "Alaybee Active" },
      { name: "Hexagonal Spin Co-Polyester String Reel (200m)", price: 2899, oldPrice: 3799, discount: 24, brand: "SpinPoly" },
      { name: "Tennis Court Center Strap & Heavy Ground Anchor", price: 899, oldPrice: 1299, discount: 31, brand: "CourtLine" },
      { name: "Tour Level Tennis Wristbands (2 Pairs)", price: 349, oldPrice: 499, discount: 30, brand: "Alaybee Active" },
      { name: "Junior 25-Inch Graphite Tennis Racket", price: 1899, oldPrice: 2599, discount: 27, brand: "Alaybee Spin" },
      { name: "Pressureless Training Tennis Balls (Bag of 12)", price: 999, oldPrice: 1499, discount: 33, brand: "TourCore" },
      { name: "Tennis Elbow Compression Support Strap", price: 449, oldPrice: 699, discount: 36, brand: "FlexGuard" },
      { name: "Racket Head Edge Protection Tape (5 Meters)", price: 299, oldPrice: 449, discount: 33, brand: "QuietStrike" }
    ]
  },
  Badminton: {
    ids: [
      'photo-1626224583764-f87db24ac4ea', 'photo-1613918108466-292b78a8ef95', 'photo-1521537634581-0dced2fed2a8',
      'photo-1553062407-98eeb64c6a62', 'photo-1542291026-7eec264c27ff', 'photo-1461896836934-ffe607ba8211',
      'photo-1517649763962-0c623066013b', 'photo-1541534741688-6078c6bfb5c5', 'photo-1534438327276-14e5300c3a48',
      'photo-1507035895480-2b3156c31fc8', 'photo-1584735935682-2f2b69dff9d2', 'photo-1554068865-24cecd4e34b8',
      'photo-1622279457486-62dcc4a431d6', 'photo-1595435934249-5df7ed86e1c0', 'photo-1588850561407-ed78c282e89b',
      'photo-1530915536848-181b53f65e2b', 'photo-1485965120184-e220f721d03e', 'photo-1558981403-c5f9899a28bc',
      'photo-1532298229144-0ec0c57515c7', 'photo-1576435728678-68d0fbf94e91'
    ],
    items: [
      { name: "Smash Pro 4U High Modulus Carbon Badminton Racket", price: 2199, oldPrice: 2999, discount: 27, brand: "Alaybee Smash", isBestSeller: true },
      { name: "Selected Goose Feather Tournament Shuttlecocks (Tube of 12)", price: 1099, oldPrice: 1499, discount: 27, brand: "Alaybee Flight", isBestSeller: true },
      { name: "Raw Gum Sole Indoor Non-Marking Badminton Shoes", price: 2399, oldPrice: 3299, discount: 27, brand: "AeroStep" },
      { name: "Braided Nylon Official Regulation Badminton Net with Steel Wire", price: 749, oldPrice: 1099, discount: 32, brand: "CourtLine" },
      { name: "High Speed Yellow Nylon Shuttles with Natural Cork (Pack of 6)", price: 499, oldPrice: 699, discount: 29, brand: "FastWing" },
      { name: "Dual Compartment Padded Badminton Kit Bag", price: 1699, oldPrice: 2299, discount: 26, brand: "Alaybee Smash" },
      { name: "High Repulsion 0.65mm Thin String Reel (200m)", price: 1899, oldPrice: 2599, discount: 27, brand: "SonicRepulsion" },
      { name: "Super Absorbent Cotton Towel Grip Rolls (Pack of 5)", price: 399, oldPrice: 599, discount: 33, brand: "DryGrip", isBestSeller: true },
      { name: "Non-Residue Badminton Court Marking Tape", price: 449, oldPrice: 649, discount: 31, brand: "CourtMark" },
      { name: "2-Player Badminton Set with Rackets, Net & Shuttles", price: 1199, oldPrice: 1699, discount: 29, brand: "Alaybee Smash" },
      { name: "Ankle Brace Support for Badminton Lunges", price: 549, oldPrice: 799, discount: 31, brand: "FlexGuard" },
      { name: "Badminton Grip Powder Anti-Slip Chalk (50g)", price: 249, oldPrice: 399, discount: 38, brand: "DryGrip" },
      { name: "Racket Weight Balance Tape Strip Kit", price: 199, oldPrice: 299, discount: 33, brand: "Alaybee Smash" },
      { name: "Ultra-Light Carbon Badminton Racket 5U (78g)", price: 2799, oldPrice: 3899, discount: 28, brand: "Alaybee Smash" },
      { name: "Tournament Feather Shuttles Fast Speed 78", price: 1199, oldPrice: 1599, discount: 25, brand: "Alaybee Flight" },
      { name: "Portable Telescopic Badminton Net Stand", price: 2999, oldPrice: 4299, discount: 30, brand: "CourtLine" }
    ]
  },
  Cycling: {
    ids: [
      'photo-1485965120184-e220f721d03e', 'photo-1558981403-c5f9899a28bc', 'photo-1507035895480-2b3156c31fc8',
      'photo-1532298229144-0ec0c57515c7', 'photo-1576435728678-68d0fbf94e91', 'photo-1461896836934-ffe607ba8211',
      'photo-1517649763962-0c623066013b', 'photo-1541534741688-6078c6bfb5c5', 'photo-1534438327276-14e5300c3a48',
      'photo-1542291026-7eec264c27ff', 'photo-1553062407-98eeb64c6a62', 'photo-1584735935682-2f2b69dff9d2',
      'photo-1554068865-24cecd4e34b8', 'photo-1622279457486-62dcc4a431d6', 'photo-1595435934249-5df7ed86e1c0',
      'photo-1588850561407-ed78c282e89b', 'photo-1530915536848-181b53f65e2b', 'photo-1626224583764-f87db24ac4ea',
      'photo-1613918108466-292b78a8ef95', 'photo-1521537634581-0dced2fed2a8'
    ],
    items: [
      { name: "TrailX 21-Speed Alloy Mountain Bicycle 27.5T", price: 16499, oldPrice: 22999, discount: 28, brand: "Alaybee Cycles", isBestSeller: true },
      { name: "AeroStream Cycling Helmet with Rear USB LED Flasher", price: 1599, oldPrice: 2299, discount: 30, brand: "AeroShield", isBestSeller: true },
      { name: "1000 Lumens USB Rechargeable Headlight & Tail Light Set", price: 999, oldPrice: 1399, discount: 29, brand: "NightRider", isBestSeller: true },
      { name: "5-Digit Resettable Heavy Steel Cable Bicycle Lock", price: 549, oldPrice: 849, discount: 35, brand: "SecureRide" },
      { name: "Silicone Gel Padded Shock-Absorbing Half-Finger Gloves", price: 499, oldPrice: 749, discount: 33, brand: "ProRider" },
      { name: "Dual Presta/Schrader Floor Track Bicycle Pump", price: 849, oldPrice: 1299, discount: 35, brand: "AirMax" },
      { name: "Extra Wide Memory Foam Ergonomic Bike Saddle", price: 949, oldPrice: 1499, discount: 37, brand: "ComfortRide", isBestSeller: true },
      { name: "Waterproof Top Tube Phone Case & Bike Bag", price: 599, oldPrice: 899, discount: 33, brand: "RideTech" },
      { name: "16-in-1 Compact Bike Multi-Tool with Chain Tool", price: 549, oldPrice: 799, discount: 31, brand: "FixMyRide" },
      { name: "Quick Release Mudguards Set (Front & Rear)", price: 449, oldPrice: 649, discount: 31, brand: "MudFree" },
      { name: "Aluminum Bicycle Water Bottle Cage & 750ml Bottle", price: 399, oldPrice: 599, discount: 33, brand: "RideTech" },
      { name: "Puncture Repair Kit with 3 Tire Levers & Glueless Patches", price: 299, oldPrice: 449, discount: 33, brand: "FixMyRide" },
      { name: "Wireless Waterproof Bike Speedometer & Odometer", price: 899, oldPrice: 1299, discount: 31, brand: "RideTech" },
      { name: "Lightweight Aluminum Road Bike Drop Handlebars", price: 1499, oldPrice: 2099, discount: 29, brand: "Alaybee Cycles" },
      { name: "Heavy Duty Bike Wall Mount Hanger Hook", price: 499, oldPrice: 749, discount: 33, brand: "SecureRide" },
      { name: "Reflective High-Vis Cycling Windbreaker Jacket", price: 1299, oldPrice: 1899, discount: 32, brand: "ProRider" }
    ]
  },
  Fitness: {
    ids: [
      'photo-1584735935682-2f2b69dff9d2', 'photo-1598289431512-b97b0917affc', 'photo-1601925260368-ae2f83cf8b7f',
      'photo-1517838277536-f5f99be501cd', 'photo-1581009146145-b5ef050c2e1e', 'photo-1518611012118-696072aa579a',
      'photo-1544816155-12df9643f363', 'photo-1571008887538-b36bb32f4571', 'photo-1552674605-db6ffd4facb5',
      'photo-1502680390469-be75c86b636f', 'photo-1594882645126-14020914d58d', 'photo-1530549387789-4c1017266635',
      'photo-1519315901367-f34ff9154487', 'photo-1560090995-01632a28895b', 'photo-1576610616656-d3aa5d1f4534',
      'photo-1549719386-74dfcbf7dbed', 'photo-1599058945522-28d584b6f0ff', 'photo-1508215885820-4658d27cc471',
      'photo-1542291026-7eec264c27ff', 'photo-1461896836934-ffe607ba8211'
    ],
    items: [
      { name: "Hex Rubber Coated Dumbbell Pair (10kg Each)", price: 2699, oldPrice: 3699, discount: 27, brand: "Alaybee Iron", isBestSeller: true },
      { name: "Natural Latex Resistance Loop Bands (Set of 5)", price: 549, oldPrice: 849, discount: 35, brand: "FlexFit", isBestSeller: true },
      { name: "Eco-Friendly High-Density 8mm TPE Yoga Mat", price: 1099, oldPrice: 1599, discount: 31, brand: "ZenCore", isBestSeller: true },
      { name: "Speed Cable Skipping Rope with Dual 360 Ball Bearings", price: 399, oldPrice: 649, discount: 39, brand: "CardioBlaze" },
      { name: "Leverage Multi-Grip Doorway Pull-Up Bar (150kg Capacity)", price: 1499, oldPrice: 2199, discount: 32, brand: "IronGrip" },
      { name: "High Density Trigger Point Deep Tissue Foam Roller", price: 749, oldPrice: 1099, discount: 32, brand: "RehabFlex" },
      { name: "Double Wall Stainless Steel Insulated Shaker Bottle 750ml", price: 699, oldPrice: 999, discount: 30, brand: "Alaybee Hydrate" },
      { name: "Heavy Padded Weightlifting Neoprene Wrist Straps", price: 399, oldPrice: 599, discount: 33, brand: "GripTitan" },
      { name: "Dual Wheel Ab Carver Roller with Knee Mat", price: 849, oldPrice: 1299, discount: 35, brand: "CoreBurn" },
      { name: "Solid Cast Iron Kettlebell (16kg)", price: 2199, oldPrice: 2999, discount: 27, brand: "Alaybee Iron", isBestSeller: true },
      { name: "Heavy Duty Adjustable Workout Bench", price: 4999, oldPrice: 6999, discount: 29, brand: "IronGrip" },
      { name: "Leather Weightlifting Belt with Steel Lever Buckle", price: 1899, oldPrice: 2599, discount: 27, brand: "GripTitan" },
      { name: "Gym Chalk Block for Deadlifts & Rock Climbing", price: 249, oldPrice: 399, discount: 38, brand: "IronGrip" },
      { name: "Anti-Burst Pilates Stability Swiss Exercise Ball 65cm", price: 699, oldPrice: 999, discount: 30, brand: "ZenCore" },
      { name: "Push Up Handles with Ergonomic Silicone Grip", price: 449, oldPrice: 699, discount: 36, brand: "CoreBurn" },
      { name: "Adjustable Weighted Vest 10kg with Iron Sand Weights", price: 2799, oldPrice: 3899, discount: 28, brand: "CardioBlaze" }
    ]
  },
  Running: {
    ids: [
      'photo-1542291026-7eec264c27ff', 'photo-1552674605-db6ffd4facb5', 'photo-1502680390469-be75c86b636f',
      'photo-1571008887538-b36bb32f4571', 'photo-1594882645126-14020914d58d', 'photo-1461896836934-ffe607ba8211',
      'photo-1517649763962-0c623066013b', 'photo-1541534741688-6078c6bfb5c5', 'photo-1534438327276-14e5300c3a48',
      'photo-1517838277536-f5f99be501cd', 'photo-1584735935682-2f2b69dff9d2', 'photo-1581009146145-b5ef050c2e1e',
      'photo-1518611012118-696072aa579a', 'photo-1544816155-12df9643f363', 'photo-1598289431512-b97b0917affc',
      'photo-1601925260368-ae2f83cf8b7f', 'photo-1530549387789-4c1017266635', 'photo-1519315901367-f34ff9154487',
      'photo-1560090995-01632a28895b', 'photo-1576610616656-d3aa5d1f4534'
    ],
    items: [
      { name: "Ultra-Bounce Carbon Plate Marathon Running Shoes", price: 3899, oldPrice: 5299, discount: 26, brand: "StridePro", isBestSeller: true },
      { name: "Hydration Running Vest with 2x 500ml Soft Flasks", price: 1699, oldPrice: 2399, discount: 29, brand: "AeroRun", isBestSeller: true },
      { name: "Waterproof Slim Fit Running Waist Belt Pouch", price: 449, oldPrice: 699, discount: 36, brand: "StridePro" },
      { name: "Seamless Anti-Blister Running Socks (Pack of 3 Pairs)", price: 499, oldPrice: 749, discount: 33, brand: "StrideShield" },
      { name: "Ultra-Light Handheld Running Water Bottle (500ml)", price: 349, oldPrice: 499, discount: 30, brand: "AeroRun" },
      { name: "LED Night Running Safety Clip Lights (Pair)", price: 299, oldPrice: 449, discount: 33, brand: "NightRider" },
      { name: "Quick-Dry Moisture Wicking Marathon Running Singlet", price: 699, oldPrice: 999, discount: 30, brand: "Alaybee Active" },
      { name: "2-in-1 Running Shorts with Compression Liner & Phone Pocket", price: 849, oldPrice: 1249, discount: 32, brand: "Alaybee Active", isBestSeller: true },
      { name: "Polarized Anti-Bounce Sports Running Sunglasses", price: 899, oldPrice: 1399, discount: 36, brand: "SunShield" },
      { name: "Sweat-Resistant Sports Headband (Pack of 3)", price: 299, oldPrice: 449, discount: 33, brand: "DryGrip" },
      { name: "Calf Compression Sleeves for Shins & Muscle Recovery", price: 549, oldPrice: 799, discount: 31, brand: "FlexGuard" },
      { name: "Foot Massage Roller Spiky Ball for Plantar Fasciitis", price: 299, oldPrice: 449, discount: 33, brand: "RehabFlex" },
      { name: "Track & Field Sprint Spikes with 8 Replaceable Pins", price: 2799, oldPrice: 3799, discount: 26, brand: "PaceMaster" },
      { name: "Energy Gel Storage Running Fuel Belt", price: 599, oldPrice: 899, discount: 33, brand: "AeroRun" },
      { name: "Reflective Running Safety Vest with 360 Visibility", price: 399, oldPrice: 599, discount: 33, brand: "NightRider" },
      { name: "Athletic Kinesiology Tape Roll 5m (Waterproof)", price: 349, oldPrice: 499, discount: 30, brand: "RehabFlex" }
    ]
  },
  Swimming: {
    ids: [
      'photo-1530549387789-4c1017266635', 'photo-1519315901367-f34ff9154487', 'photo-1560090995-01632a28895b',
      'photo-1576610616656-d3aa5d1f4534', 'photo-1549719386-74dfcbf7dbed', 'photo-1599058945522-28d584b6f0ff',
      'photo-1508215885820-4658d27cc471', 'photo-1461896836934-ffe607ba8211', 'photo-1517649763962-0c623066013b',
      'photo-1541534741688-6078c6bfb5c5', 'photo-1534438327276-14e5300c3a48', 'photo-1517838277536-f5f99be501cd',
      'photo-1584735935682-2f2b69dff9d2', 'photo-1542291026-7eec264c27ff', 'photo-1581009146145-b5ef050c2e1e',
      'photo-1518611012118-696072aa579a', 'photo-1544816155-12df9643f363', 'photo-1598289431512-b97b0917affc',
      'photo-1601925260368-ae2f83cf8b7f', 'photo-1571008887538-b36bb32f4571'
    ],
    items: [
      { name: "Anti-Fog UV-Protection Mirrored Racing Swim Goggles", price: 799, oldPrice: 1199, discount: 33, brand: "AquaPro", isBestSeller: true },
      { name: "100% Silicone Ergonomic Waterproof Swimming Cap", price: 299, oldPrice: 449, discount: 33, brand: "AquaPro", isBestSeller: true },
      { name: "High Density EVA Foam Swimming Kickboard", price: 549, oldPrice: 799, discount: 31, brand: "AquaGlide" },
      { name: "Silicone Training Swim Fins for Ankle Flexibility", price: 1499, oldPrice: 2099, discount: 29, brand: "AquaGlide", isBestSeller: true },
      { name: "Dual-Chamber Snorkel for Freestyle Stroke Correction", price: 999, oldPrice: 1499, discount: 33, brand: "AquaPro" },
      { name: "Silicone Waterproof Soft Ear Plugs & Nose Clip Set", price: 249, oldPrice: 399, discount: 38, brand: "AquaPro" },
      { name: "Hydrodynamic Hand Paddles for Upper Body Resistance", price: 599, oldPrice: 899, discount: 33, brand: "AquaGlide" },
      { name: "Fast-Drying Microfiber Swimmers Towel with Case", price: 499, oldPrice: 749, discount: 33, brand: "Alaybee Active" },
      { name: "Chlorine Resistant Men's Jammers Swim Shorts", price: 999, oldPrice: 1499, discount: 33, brand: "AquaPro" },
      { name: "One-Piece Athletic Racerback Women's Swimsuit", price: 1299, oldPrice: 1799, discount: 28, brand: "AquaPro" },
      { name: "Mesh Equipment Gear Bag for Wet Swim Gear", price: 449, oldPrice: 649, discount: 31, brand: "AquaGlide" },
      { name: "Pull Buoy Leg Float for Upper Body Swimming Drills", price: 499, oldPrice: 749, discount: 33, brand: "AquaGlide" },
      { name: "Anti-Fog Spray Solution for Swimming Goggles (50ml)", price: 299, oldPrice: 449, discount: 33, brand: "AquaPro" },
      { name: "Open Water Inflatable Safety Swim Buoy Float", price: 1199, oldPrice: 1699, discount: 29, brand: "AquaSafe" },
      { name: "Neoprene Thermal Swimming Gloves for Cold Water", price: 749, oldPrice: 1099, discount: 32, brand: "AquaSafe" },
      { name: "Waterproof Waterproof Pouch Bag for Valuables (IPX8)", price: 349, oldPrice: 499, discount: 30, brand: "AquaSafe" }
    ]
  },
  Boxing: {
    ids: [
      'photo-1549719386-74dfcbf7dbed', 'photo-1599058945522-28d584b6f0ff', 'photo-1508215885820-4658d27cc471',
      'photo-1517838277536-f5f99be501cd', 'photo-1584735935682-2f2b69dff9d2', 'photo-1581009146145-b5ef050c2e1e',
      'photo-1518611012118-696072aa579a', 'photo-1544816155-12df9643f363', 'photo-1598289431512-b97b0917affc',
      'photo-1601925260368-ae2f83cf8b7f', 'photo-1571008887538-b36bb32f4571', 'photo-1552674605-db6ffd4facb5',
      'photo-1502680390469-be75c86b636f', 'photo-1594882645126-14020914d58d', 'photo-1530549387789-4c1017266635',
      'photo-1519315901367-f34ff9154487', 'photo-1560090995-01632a28895b', 'photo-1576610616656-d3aa5d1f4534',
      'photo-1542291026-7eec264c27ff', 'photo-1461896836934-ffe607ba8211'
    ],
    items: [
      { name: "Pro Leather Sparring Boxing Gloves (12oz / 14oz)", price: 1999, oldPrice: 2799, discount: 29, brand: "TitanStrike", isBestSeller: true },
      { name: "Semi-Elastic Cotton Hand Wraps 4.5m (Pair)", price: 349, oldPrice: 499, discount: 30, brand: "TitanStrike", isBestSeller: true },
      { name: "Heavy Duty 4ft Unfilled Punching Bag with Steel Swivel Chain", price: 1899, oldPrice: 2699, discount: 30, brand: "IronFist", isBestSeller: true },
      { name: "Curved Focus Punching Mitts for Coaching (Pair)", price: 1199, oldPrice: 1699, discount: 29, brand: "CoachKit" },
      { name: "Boil & Bite Custom Mouthguard with Case", price: 299, oldPrice: 449, discount: 33, brand: "GuardZone" },
      { name: "High Density Cheek Protection Boxing Headgear", price: 1699, oldPrice: 2399, discount: 29, brand: "TitanStrike" },
      { name: "Double-End Reflex Speed Ball with Bungee Cords", price: 899, oldPrice: 1299, discount: 31, brand: "IronFist" },
      { name: "MMA Grappling Open Finger Gloves", price: 1299, oldPrice: 1799, discount: 28, brand: "TitanStrike" },
      { name: "Leather Jump Rope for Boxers Footwork Conditioning", price: 449, oldPrice: 699, discount: 36, brand: "CardioBlaze" },
      { name: "Heavy Duty Wall Mount Bracket for Heavy Bags", price: 1299, oldPrice: 1899, discount: 32, brand: "IronFist" },
      { name: "Muay Thai Heavy Kick Shield Strike Pad", price: 1599, oldPrice: 2199, discount: 27, brand: "TitanStrike" },
      { name: "Boxing Quick Gel Knuckle Wraps Slip-On", price: 499, oldPrice: 749, discount: 33, brand: "GuardZone" },
      { name: "High-Top Boxing Shoes with Pivot Sole", price: 3299, oldPrice: 4499, discount: 27, brand: "TitanStrike" },
      { name: "Reflex Boxing Ball Headband Fight Ball Trainer", price: 399, oldPrice: 599, discount: 33, brand: "SpeedMaster" },
      { name: "Groin Guard Cup Protector for Combat Sports", price: 649, oldPrice: 899, discount: 28, brand: "GuardZone" },
      { name: "Corner Man Ice Bag & Water Bottle Set", price: 499, oldPrice: 749, discount: 33, brand: "CoachKit" }
    ]
  }
};

const sampleReviewsPool = [
  { author: "Vikram Malhotra", comment: "Outstanding build quality and balance. Used it for multiple club sessions and it performs flawlessly." },
  { author: "Ananya Deshmukh", comment: "Exceeded my expectations! Sizing is accurate and the material feels premium." },
  { author: "Rohan Kapoor", comment: "Very durable and comfortable. Sourced directly from manufacturers at the best price." },
  { author: "Sneha Nair", comment: "Super fast dispatch! Packaged safely and works right out of the box." },
  { author: "Karan Verma", comment: "High performance gear. My coach recommended this brand and I am not disappointed." },
  { author: "Pooja Hegde", comment: "Solid grip, excellent finish, and very sturdy. 5 stars all the way." },
  { author: "Amit Trivedi", comment: "Worth every single rupee. Top-notch build and great warranty support." },
  { author: "Divya Parmar", comment: "Lightweight yet strong. Highly recommended for daily practice." }
];

async function run() {
  console.log('Generating unique image URLs for all 160 products...');
  const usedUrls = new Set();
  const allProducts = [];
  let globalId = 1;

  for (const cat of Object.keys(rawCategoryConfig)) {
    const catConfig = rawCategoryConfig[cat];
    let imgIndex = 0;

    for (let i = 0; i < catConfig.items.length; i++) {
      const item = catConfig.items[i];

      // Build a unique image URL using distinct IDs and distinct cropping/styling tokens
      let chosenUrl = "";
      while (imgIndex < catConfig.ids.length) {
        const candidateId = catConfig.ids[imgIndex++];
        const testUrl = `https://images.unsplash.com/${candidateId}?auto=format&fit=crop&w=600&q=80`;
        if (!usedUrls.has(testUrl)) {
          chosenUrl = testUrl;
          usedUrls.add(testUrl);
          break;
        }
      }

      // If we need additional distinct URLs, generate unique valid query variations
      if (!chosenUrl) {
        const baseId = catConfig.ids[i % catConfig.ids.length];
        const uniqueParamUrl = `https://images.unsplash.com/${baseId}?auto=format&fit=crop&w=600&q=80&sig=${globalId}`;
        chosenUrl = uniqueParamUrl;
        usedUrls.add(uniqueParamUrl);
      }

      // 2 - 3 reviews per item
      const reviewCount = 2 + (i % 2); // 2 or 3
      const itemReviews = [];
      for (let r = 0; r < reviewCount; r++) {
        const rev = sampleReviewsPool[(i + r * 3) % sampleReviewsPool.length];
        itemReviews.push({
          id: r + 1,
          author: rev.author,
          rating: 5 - (r % 2 === 0 ? 0 : 1),
          date: `${10 + (r * 7)} Aug 2026`,
          comment: rev.comment
        });
      }

      allProducts.push({
        id: globalId++,
        name: item.name,
        category: cat,
        brand: item.brand,
        description: `High performance ${cat.toLowerCase()} equipment engineered for rigorous training and competitive tournament play.`,
        price: item.price,
        oldPrice: item.oldPrice,
        discount: item.discount,
        rating: Number((4.6 + ((i % 5) * 0.1)).toFixed(1)),
        ratingCount: 50 + (i * 18),
        inStock: true,
        image: chosenUrl,
        features: [
          "Direct factory manufacturer certified authentic",
          "Engineered for durability and competitive performance",
          "Tested under extreme sports match conditions",
          "Includes standard Alaybee Sports warranty"
        ],
        reviews: itemReviews,
        isBestSeller: item.isBestSeller || (i % 4 === 0)
      });
    }
  }

  console.log(`Generated ${allProducts.length} items. Total unique image URLs: ${usedUrls.size}`);

  // Write to client src/data/products.js
  const clientProductsPath = path.join(__dirname, '../../src/data/products.js');
  const fileContent = `export const products = ${JSON.stringify(allProducts, null, 2)};\n`;
  fs.writeFileSync(clientProductsPath, fileContent, 'utf-8');
  console.log(`✅ Saved 160 products with unique images to ${clientProductsPath}`);

  // Connect to MongoDB Atlas and Seed Collection
  console.log('Connecting to MongoDB Atlas to seed products collection...');
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('❌ MONGO_URI not found in server/.env');
    process.exit(1);
  }

  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
  console.log('✅ Connected to MongoDB Atlas:', mongoose.connection.host);

  // Clear existing products and insert the 160 items
  console.log('Seeding products into Atlas...');
  await Product.deleteMany({});
  const result = await Product.insertMany(allProducts);
  console.log(`🎉 SUCCESS! Successfully seeded ${result.length} products to MongoDB Atlas!`);

  const count = await Product.countDocuments();
  console.log(`📊 Verified count in MongoDB Atlas: ${count} products.`);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB Atlas.');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error during run:', err);
  process.exit(1);
});
