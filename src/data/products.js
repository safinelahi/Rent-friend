// Importing assets
import itemImage1 from "../assets/ProductItems/Item-01.svg";
import itemImage2 from "../assets/ProductItems/Item-02.svg";
import itemImage3 from "../assets/ProductItems/Item-03.svg";
import landerImage from "../assets/lander.png"

export const products = [
  {
    id: 1,
    identifier: "#RF-RF-4LBZYU", // Unique Asset ID
    image: itemImage1,
    title: "Canon EOS R5 Camera + Lenses",
    rating: 4.9,
    reviews: 128,
    location: "New Market, Rajshahi", 
    city: "Rajshahi",                
    price: 45,
    category: "Photography",
    verified: true,
    description: "This is a beast for high-end photography. It comes with a 24-105mm lens and two extra batteries. Perfect if you're shooting a wedding or a professional ad campaign.",
    manual: "Please don't swap lenses in the wind (sensor dust is a nightmare). Always keep the neck strap on. If the buffer slows down, it's probably the SD card speed.",
    owner: {
      name: "Steve Cody",
      rating: 4.8,
      reviews: 36,
      listings: 12,
      image: landerImage 
    }
  },
  {
    id: 2,
    identifier: "#RF-RF-9K2VXP",
    image: itemImage2,
    title: "Professional Power Tools Set",
    rating: 4.7,
    reviews: 24,
    location: "Dhaka",
    city: "Dhaka",                   
    price: 30,
    category: "Tools & DIY",
    verified: true,
    description: "A complete heavy-duty set including a cordless drill, circular saw, and impact driver. Everything is battery-powered so you don't need to hunt for sockets.",
    manual: "Make sure to lock the trigger when you're changing bits. Don't push the saw too hard; let the blade do the work. Remember to charge the batteries before returning!",
    owner: {
      name: "Karim Hassan",
      rating: 4.9,
      reviews: 52,
      listings: 8,
      image: landerImage
    }
  },
  {
    id: 3,
    identifier: "#RF-RF-7M1QWE",
    image: itemImage3,
    title: "4-Person Camping Tent",
    rating: 4.5,
    reviews: 76,
    location: "Sylhet",
    city: "Sylhet",                  
    price: 17,
    category: "Camping & Outdoor",
    verified: true,
    description: "Super easy to set up, even if you're a beginner. It's waterproof and has a double layer to keep the heat in. Great for a weekend trip to Sajek or Srimangal.",
    manual: "Please dry the tent completely before packing it back into the bag (otherwise it gets smelly). Don't use a stove inside the tent—safety first!",
    owner: {
      name: "Nusrat Rahman",
      rating: 4.6,
      reviews: 21,
      listings: 4,
      image: landerImage
    }
  },
  {
    id: 4,
    identifier: "#RF-RF-3N5TYR",
    image: itemImage1,
    title: "Sony A7III Mirrorless Camera",
    rating: 4.8,
    reviews: 92,
    location: "Chittagong",
    city: "Chittagong",             
    price: 40,
    category: "Photography",
    verified: true,
    description: "The ultimate low-light king. If you're shooting video or nighttime events, this is the one you want. Includes a 50mm f/1.8 prime lens.",
    manual: "The eye-autofocus is already set up. Be careful with the flip screen; it's a bit delicate. If you're shooting 4K, keep an eye on the battery level.",
    owner: {
      name: "Sarah Ahmed",
      rating: 5.0,
      reviews: 140,
      listings: 15,
      image: landerImage
    }
  },
  {
    id: 5,
    identifier: "#RF-RF-8B0XCV",
    image: itemImage2,
    title: "Heavy Duty Drill Machine",
    rating: 4.6,
    reviews: 45,
    location: "Khulna",
    city: "Khulna",                  
    price: 15,
    category: "Tools & DIY",
    verified: false,
    description: "Need to make some holes in concrete? This hammer drill will go through it like butter. Built for tough jobs that regular drills can't handle.",
    manual: "Switch to hammer mode only for masonry. Keep a firm grip with both hands because the kickback can be strong. Don't block the air vents while using it.",
    owner: {
      name: "Rahat Chowdhury",
      rating: 4.2,
      reviews: 12,
      listings: 3,
      image: landerImage
    }
  },
  {
    id: 6,
    identifier: "#RF-RF-2A6GHJ",
    image: itemImage3,
    title: "Portable BBQ Grill Set",
    rating: 4.9,
    reviews: 31,
    location: "Dhaka",
    city: "Dhaka",                   
    price: 12,
    category: "Party & Events",
    verified: true,
    description: "Perfect for rooftop parties or a quick picnic. It's foldable and fits in any car trunk. Includes tongs and a cleaning brush.",
    manual: "Wait for the charcoal to cool down completely before dumping it. Give the grates a quick scrub with the brush while they're still warm—it makes cleaning much easier.",
    owner: {
      name: "Anik Roy",
      rating: 4.7,
      reviews: 19,
      listings: 6,
      image: landerImage
    }
  },
];