const axios = require('axios');

const seedSites = [
  {
    siteName: 'TAJ MAHAL',
    siteType: 'MONUMENT',
    siteDescription: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife.',
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
    siteDescription: 'The Red Fort is a historic fort in the city of Delhi in India. It was the main residence of the emperors of the Mughal dynasty for nearly 200 years.',
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
    siteDescription: 'The Qutub Minar, also spelled as Qutb Minar, is a minaret that forms part of the Qutb complex, a UNESCO World Heritage Site.',
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
    siteDescription: 'The Hawa Mahal is a palace in the city of Jaipur, India. Built from red and pink sandstone, it is on the edge of the City Palace.',
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
    siteDescription: 'The Victoria Memorial is a large marble building in Kolkata, which was built between 1906 and 1921. It is dedicated to the memory of Queen Victoria.',
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
    siteName: 'MYSORE PALACE',
    siteType: 'MONUMENT',
    siteDescription: 'Mysore Palace is a historical palace and a royal residence. It is located in Mysore, Karnataka, India.',
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
    siteDescription: 'Konark Sun Temple is a 13th-century CE Sun temple at Konark about 35 kilometres northeast from Puri city.',
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
  }
];

const seedViaAPI = async () => {
  console.log('Starting API seeding...');
  
  // Dummy admin credentials to tie the sites to
  const dummyAdmin = {
    _id: "647f1a2b3c4d5e6f7a8b9c0d", // Valid Object ID string
    name: "System Admin",
    emailuser: "admin@entryway.com"
  };

  for (const site of seedSites) {
    try {
      const payload = { ...site, ...dummyAdmin };
      const response = await axios.post('http://localhost:5000/addsite', payload);
      console.log(`Success: Added ${site.siteName} - ${response.status}`);
    } catch (error) {
      console.error(`Failed: ${site.siteName}`);
      if (error.response) {
        console.error('Error details:', error.response.data);
      } else {
        console.error('Network Error:', error.message);
      }
    }
  }
  
  console.log('Seeding finished!');
};

seedViaAPI();
