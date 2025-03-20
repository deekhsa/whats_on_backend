const express = require('express');
const axios = require('axios');
const router = express.Router();
const restaurant = require('../models/restaurants');

const BRANDFETCH_API_KEY = '1idjYVKQYOaNXfWOmhU';

router.get('/', async (req, res) => {
  const query = req.query;

  try {
    let pipeline = [];

    if (query.q) {
      pipeline.push({
        $match: {
          name: { $regex: `^${query.q}`, $options: 'i' },
        },
      });
    }

    const lng = parseFloat(query.lng);
    const lat = parseFloat(query.lat);
    const radiusInKm = 50;
    const radians = radiusInKm / 6371;

    if (!isNaN(lng) && !isNaN(lat)) {
      pipeline.push({
        $match: {
          location: {
            $geoWithin: {
              $centerSphere: [[lng, lat], radians],
            },
          },
        },
      });
    }

    pipeline.push({
      $group: {
        _id: '$res_id',
        restaurant: { $first: '$$ROOT' },
      },
    });

    pipeline.push({
      $replaceRoot: { newRoot: '$restaurant' },
    });

    const restaurants = await restaurant.aggregate(pipeline);
    res.json({ message: 'Icons updated successfully', restaurants });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error fetching data');
  }
});


// router.get('/InsertIcon', async(req,res)=>{
//     try{
//         const restaurants = await restaurant.find({icon:{$exists:false}});
//         for (const rest of restaurants) {
//             const name = encodeURIComponent(rest.name);
//             let iconUrl = '';
      
//             try {
//               const response = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`, 
//             //     {
//             //     headers: { Authorization: `Bearer ${BRANDFETCH_API_KEY}` },
//             //   }
//             );
//             console.log("data", response.data?.[0]?.logo)
//               iconUrl = response.data?.[0]?.logo || '';
//             } catch (apiError) {
//               console.error(`Failed to fetch icon for ${rest.name}:`, apiError.message);
//             }
      
//             await restaurant.updateOne({ _id: rest._id }, { $set: { icon: iconUrl } });
//           }
      
//           res.json({ message: 'Icons updated successfully'});

//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send('Error fetching data');
//     }
// })

module.exports = router;
