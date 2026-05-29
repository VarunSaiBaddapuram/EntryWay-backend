const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
const TouristSite = require('./model/addtouristschema');
const User = require('./model/userSchema');

dotenv.config({ path: './config.env' });

const seedSites = [
  {
    siteName: 'TAJ MAHAL',
    siteType: 'MONUMENT',
    siteDescription: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife. The Taj Mahal is the jewel of Muslim art in India and one of the universally admired masterpieces of the world\'s heritage.',
    country: 'INDIA',
    state: 'Uttar Pradesh',
    city: 'Agra',
    zip: '282001',
    zone: 'NORTH',
    phoneno: '0562-2226431',
    email: 'asiagra@up.nic.in',
    adult: 50,
    children: 0,
    foreigner: 1100,
    open: '06:00',
    close: '18:30',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1564507592208-528cae250192?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'RED FORT',
    siteType: 'MONUMENT',
    siteDescription: 'The Red Fort is a historic fort in the city of Delhi in India. It was the main residence of the emperors of the Mughal dynasty for nearly 200 years, until 1856. It is located in the centre of Delhi and houses a number of museums.',
    country: 'INDIA',
    state: 'Delhi',
    city: 'New Delhi',
    zip: '110006',
    zone: 'NORTH',
    phoneno: '011-23277705',
    email: 'info@redfort.gov.in',
    adult: 35,
    children: 0,
    foreigner: 500,
    open: '09:30',
    close: '16:30',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1587474260525-201cad05ce7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'QUTUB MINAR',
    siteType: 'MONUMENT',
    siteDescription: 'The Qutub Minar, also spelled as Qutb Minar, is a minaret that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi, India.',
    country: 'INDIA',
    state: 'Delhi',
    city: 'New Delhi',
    zip: '110030',
    zone: 'NORTH',
    phoneno: '011-24698431',
    email: 'info@qutubminar.gov.in',
    adult: 30,
    children: 0,
    foreigner: 500,
    open: '07:00',
    close: '17:00',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1606774681600-098e6c738096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'HAWA MAHAL',
    siteType: 'MONUMENT',
    siteDescription: 'The Hawa Mahal is a palace in the city of Jaipur, India. Built from red and pink sandstone, it is on the edge of the City Palace, Jaipur, and extends to the Zenana, or women\'s chambers.',
    country: 'INDIA',
    state: 'Rajasthan',
    city: 'Jaipur',
    zip: '302002',
    zone: 'WEST',
    phoneno: '0141-2618862',
    email: 'contact@hawamahal.in',
    adult: 50,
    children: 0,
    foreigner: 200,
    open: '09:00',
    close: '16:30',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'VICTORIA MEMORIAL',
    siteType: 'MUSEUM',
    siteDescription: 'The Victoria Memorial is a large marble building in Kolkata, West Bengal, India, which was built between 1906 and 1921. It is dedicated to the memory of Queen Victoria, then Empress of India, and is now a museum and tourist destination under the auspices of the Ministry of Culture.',
    country: 'INDIA',
    state: 'West Bengal',
    city: 'Kolkata',
    zip: '700071',
    zone: 'EAST',
    phoneno: '033-22231890',
    email: 'victoriamemorial@gmail.com',
    adult: 30,
    children: 0,
    foreigner: 500,
    open: '10:00',
    close: '17:00',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1616422285623-14ff01633519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'GATEWAY OF INDIA',
    siteType: 'MONUMENT',
    siteDescription: 'The Gateway of India is an arch-monument built in the early 20th century in the city of Mumbai, India. It was erected to commemorate the landing of King George V and Queen Mary at Apollo Bunder on their visit to India in 1911.',
    country: 'INDIA',
    state: 'Maharashtra',
    city: 'Mumbai',
    zip: '400001',
    zone: 'WEST',
    phoneno: '022-22622822',
    email: 'info@mumbaitourism.gov.in',
    adult: 0,
    children: 0,
    foreigner: 0,
    open: '00:00',
    close: '23:59',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6678f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'CHARMINAR',
    siteType: 'MONUMENT',
    siteDescription: 'The Charminar, constructed in 1591, is a monument and mosque located in Hyderabad, Telangana, India. The landmark has become known globally as a symbol of Hyderabad and is listed among the most recognized structures in India.',
    country: 'INDIA',
    state: 'Telangana',
    city: 'Hyderabad',
    zip: '500002',
    zone: 'SOUTH',
    phoneno: '040-24522990',
    email: 'info@telanganatourism.gov.in',
    adult: 25,
    children: 0,
    foreigner: 300,
    open: '09:30',
    close: '17:30',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1600012224823-35606e902e86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'MYSORE PALACE',
    siteType: 'MONUMENT',
    siteDescription: 'Mysore Palace, also known as Amba Vilas Palace, is a historical palace and a royal residence. It is located in Mysore, Karnataka, India. It used to be the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore.',
    country: 'INDIA',
    state: 'Karnataka',
    city: 'Mysore',
    zip: '570001',
    zone: 'SOUTH',
    phoneno: '0821-2421051',
    email: 'info@mysorepalace.gov.in',
    adult: 70,
    children: 30,
    foreigner: 1000,
    open: '10:00',
    close: '17:30',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9cb15f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'SUN TEMPLE KONARK',
    siteType: 'HOLYPLACE',
    siteDescription: 'Konark Sun Temple is a 13th-century CE Sun temple at Konark about 35 kilometres northeast from Puri city on the coastline in Puri district, Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga dynasty about 1250 CE.',
    country: 'INDIA',
    state: 'Odisha',
    city: 'Konark',
    zip: '752111',
    zone: 'EAST',
    phoneno: '06758-236821',
    email: 'info@odishatourism.gov.in',
    adult: 40,
    children: 0,
    foreigner: 600,
    open: '06:00',
    close: '20:00',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1628359702846-dfb010c22998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    siteName: 'SALAR JUNG MUSEUM',
    siteType: 'MUSEUM',
    siteDescription: 'The Salar Jung Museum is an art museum located at Dar-ul-Shifa, on the southern bank of the Musi River in the city of Hyderabad, Telangana, India. It is one of the notable National Museums of India.',
    country: 'INDIA',
    state: 'Telangana',
    city: 'Hyderabad',
    zip: '500002',
    zone: 'SOUTH',
    phoneno: '040-24523211',
    email: 'salarjungmuseum1951@gmail.com',
    adult: 50,
    children: 20,
    foreigner: 500,
    open: '10:00',
    close: '17:00',
    Availability: 'YES',
    Bestseasonvisit: 'WINTER',
    image: 'https://images.unsplash.com/photo-1610408544927-46e3309a9fdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

const runSeed = async () => {
  try {
    const DB = process.env.DATABASE;
    if (!DB) {
      console.error('DATABASE not set in config.env');
      process.exit(1);
    }

    await mongoose.connect(DB);
    console.log('MongoDB connection successful');

    // Find or create an admin user
    let admin = await User.findOne({ email: 'admin@entryway.com' });
    if (!admin) {
      admin = new User({
        name: 'Super Admin',
        email: 'admin@entryway.com',
        phone: 9876543210,
        password: 'adminpassword123',
        role: 'admin',
      });
      await admin.save();
      console.log('Created super admin: admin@entryway.com');
    }

    // Clear existing dummy data if any, or just insert new ones
    console.log(`Found ${seedSites.length} sites to insert.`);
    
    for (const siteData of seedSites) {
      const exists = await TouristSite.findOne({ siteName: siteData.siteName });
      if (!exists) {
        const site = new TouristSite({
          ...siteData,
          Adminid: admin._id,
          siteID: siteData.siteName.split(' ').join('') + Math.floor(Math.random() * 10001),
          siteAddress: {
            country: siteData.country,
            state: siteData.state,
            city: siteData.city,
            zip: siteData.zip,
            zone: siteData.zone,
          },
          contact: {
            phoneno: siteData.phoneno,
            email: siteData.email,
          },
          ticketfair: {
            adult: siteData.adult,
            children: siteData.children,
            foreigner: siteData.foreigner,
          },
          timings: {
            open: siteData.open,
            close: siteData.close,
          },
          site_added_by: {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
          }
        });
        await site.save();
        console.log(`Inserted: ${site.siteName}`);
      } else {
        console.log(`Skipped existing: ${siteData.siteName}`);
      }
    }

    console.log('Seed data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

runSeed();
