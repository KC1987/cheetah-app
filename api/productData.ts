import { useState } from "react";

import axios from "axios";

export function getProductData ( barcode:String, setData:any ) {
  // const upc = "4770161102061";
  // const url = `https://trackapi.nutritionix.com/v2/search/item/?rw_sin=${upc}`;

  // const nutritionix_app_id = "81595145";
  // const nutritionix_app_key = "31f590e34da1d46dd97fd0b4b3e3f7a8";

  axios.get(
    `https://world.openfoodfacts.net/api/v2/product/${barcode}`
    // {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'x-app-id': nutritionix_app_id,
    //     'x-app-key': nutritionix_app_key,
    //   },
    // }
  )
  .then( res => {
    console.log(res.data);
    setData(res.data.product.brands)
  })
  .catch( err => console.error(err));
  
};

// https://trackapi.nutritionix.com/v2/search/item/?upc=49000000450