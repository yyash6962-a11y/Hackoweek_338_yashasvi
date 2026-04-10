const fs = require('fs');

const sneakers = [
  { n: "Nike Air Max 270", b: "Nike", p: 12495 },
  { n: "Adidas Ultraboost 22", b: "Adidas", p: 15999 },
  { n: "Puma RS-X3", b: "Puma", p: 8999 },
  { n: "Reebok Classic Leather", b: "Reebok", p: 6599 },
  { n: "Campus Sutra Prime", b: "Campus", p: 2199 },
  { n: "Nike Air Force 1 '07", b: "Nike", p: 8495 },
  { n: "Adidas NMD_R1", b: "Adidas", p: 13999 },
  { n: "New Balance 574 Core", b: "New Balance", p: 7999 },
  { n: "Asics Gel-Kayano 28", b: "Asics", p: 14999 },
  { n: "Puma Suede Classic", b: "Puma", p: 5999 },
  { n: "Converse Chuck Taylor All Star", b: "Converse", p: 4499 },
  { n: "Vans Old Skool", b: "Vans", p: 4999 },
  { n: "Nike React Infinity Run Flyknit 3", b: "Nike", p: 13995 },
  { n: "Adidas Stan Smith", b: "Adidas", p: 7599 },
  { n: "Under Armour HOVR Phantom 2", b: "Under Armour", p: 11999 },
  { n: "Reebok Club C 85", b: "Reebok", p: 6999 },
  { n: "Skechers D'Lites", b: "Skechers", p: 5499 },
  { n: "Fila Disruptor II", b: "Fila", p: 6499 },
  { n: "Campus Alexa", b: "Campus", p: 1899 },
  { n: "Nike Dunk Low Retro", b: "Nike", p: 8995 },
  { n: "Adidas Superstar", b: "Adidas", p: 7999 }
];

const basketball = [
  { n: "Air Jordan 1 Mid", b: "Nike", p: 11495 },
  { n: "LeBron 19", b: "Nike", p: 17495 },
  { n: "Curry Flow 9", b: "Under Armour", p: 13999 },
  { n: "KD14", b: "Nike", p: 13495 },
  { n: "Kyrie Infinity", b: "Nike", p: 11495 },
  { n: "Adidas Trae Young 1", b: "Adidas", p: 11999 },
  { n: "Puma Clyde All-Pro", b: "Puma", p: 10999 },
  { n: "Jordan Zion 1", b: "Nike", p: 10495 },
  { n: "Under Armour Embiid 1", b: "Under Armour", p: 10999 },
  { n: "Adidas Dame 8", b: "Adidas", p: 10999 },
  { n: "Nike Zoom Freak 3", b: "Nike", p: 10495 },
  { n: "Air Jordan XXXVI", b: "Nike", p: 16495 },
  { n: "New Balance Two WXY V2", b: "New Balance", p: 11999 },
  { n: "Puma MB.01", b: "Puma", p: 11999 },
  { n: "Adidas D.O.N. Issue 3", b: "Adidas", p: 8999 },
  { n: "Nike PG 6", b: "Nike", p: 9495 },
  { n: "Jordan Luka 1", b: "Nike", p: 9995 },
  { n: "Under Armour HOVR Havoc 4 Clone", b: "Under Armour", p: 9999 },
  { n: "Converse All Star BB Evo", b: "Converse", p: 9999 },
  { n: "Li-Ning Way of Wade 9", b: "Li-Ning", p: 14999 }
];

const gear = [
  { n: "Nivia Classic Football Size 5", b: "Nivia", p: 699, c: "Football" },
  { n: "Spalding NBA Miniboard", b: "Spalding", p: 1299, c: "Basketball" },
  { n: "Yonex Muscle Power 29 Lite Badminton Racket", b: "Yonex", p: 2499, c: "Racket" },
  { n: "Kore PVC 10 Kg Home Gym Set", b: "Kore", p: 1599, c: "Gym" },
  { n: "Boldfit Skipping Rope for Men and Women", b: "Boldfit", p: 299, c: "Gym" },
  { n: "Nivia Orthopedic Knee Support", b: "Nivia", p: 399, c: "Gym" },
  { n: "Cosco CB-89 Basketball Size 7", b: "Cosco", p: 650, c: "Basketball" },
  { n: "Grip Master Weightlifting Gloves", b: "Grip Master", p: 450, c: "Gym" },
  { n: "Vector X Flyer Football", b: "Vector X", p: 499, c: "Football" },
  { n: "Protoner 20 Kg PVC Weight Machine set", b: "Protoner", p: 2100, c: "Gym" },
  { n: "Li-Ning G-Force 3800 Superlite Racket", b: "Li-Ning", p: 1899, c: "Racket" },
  { n: "Nike Fundamental Yoga Mat 3mm", b: "Nike", p: 1995, c: "Gym" },
  { n: "Adidas Football Shin Guards", b: "Adidas", p: 899, c: "Football" },
  { n: "Puma Training Duffle Bag", b: "Puma", p: 1299, c: "Gym" },
  { n: "Reebok Professional Aerobic Step", b: "Reebok", p: 3499, c: "Gym" },
  { n: "Head Ti. Reward Tennis Racket", b: "Head", p: 2299, c: "Racket" },
  { n: "Babolat Pure Aero Tennis Racket", b: "Babolat", p: 18999, c: "Racket" },
  { n: "Stag 4 Star Table Tennis Racquet", b: "Stag", p: 850, c: "Racket" },
  { n: "Spalding NBA Zi/O Excel Basketball", b: "Spalding", p: 3499, c: "Basketball" },
  { n: "Everlast Pro Style Training Boxing Gloves", b: "Everlast", p: 2599, c: "Gym" }
];

const sneakerImgs = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80",
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80"
];

const basketballImgs = [
  "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&q=80",
  "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400&q=80",
  "https://images.unsplash.com/photo-1515555230216-82228b4eeb81?w=400&q=80",
  "https://images.unsplash.com/photo-1549896172-10a4855d496a?w=400&q=80"
];

const gearImgs = [
  "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=400&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
  "https://images.unsplash.com/photo-1584735174965-48c48d7028a6?w=400&q=80",
  "https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=400&q=80"
];

const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];

let idCounter = 1;
const products = [];

const generateRating = () => (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);

sneakers.forEach(item => {
  products.push({
    id: idCounter++,
    name: item.n,
    brand: item.b,
    price: item.p,
    category: "Sneakers",
    rating: parseFloat(generateRating()),
    image: getRand(sneakerImgs)
  });
});

basketball.forEach(item => {
  products.push({
    id: idCounter++,
    name: item.n,
    brand: item.b,
    price: item.p,
    category: "Basketball Shoes",
    rating: parseFloat(generateRating()),
    image: getRand(basketballImgs)
  });
});

gear.forEach(item => {
  products.push({
    id: idCounter++,
    name: item.n,
    brand: item.b,
    price: item.p,
    category: "Sports Gear",
    rating: parseFloat(generateRating()),
    image: getRand(gearImgs)
  });
});

// Create products.json
fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

// Create string for PDF artifact
let pdfText = `Online Product Dataset
Name: Yashasvi Yadav
Course: CSE 1st Year\n\n`;

products.forEach(p => {
  pdfText += `Product ${p.id}:
Name: ${p.name}
Brand: ${p.brand}
Category: ${p.category}
Price: ₹${p.price}
Rating: ${p.rating.toFixed(1)}/5.0

`;
});

fs.writeFileSync('pdf_dataset.md', pdfText);
console.log("SUCCESS. Created products.json and pdf_dataset.md");
