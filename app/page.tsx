'use client'

import TrackItem from "@/components/tracker/track_item"
import { getProductData } from "@/api/productData";
import { Button } from "@heroui/button";



export default function Home () {

  const items = [
    {
      name: "Banana",
      slug: "banana",
      id: "123",
      calories: 250,
    }, {
      name: "Steak",
      slug: "steak",
      id: "222",
      calories: 350,
    }, {
      name: "Vegies",
      slug: "vegies",
      id: "333",
      calories: 270,
    }, {
      name: "Eggs",
      slug: "eggs",
      id: "144423",
      calories: 560,
    },
  ];

  const targetCals = 2000
  const totalCals = items.reduce((sum, item) => sum + item.calories, 0);


  return (
    <div className="rounded-md p-4 mx-auto" >
        <Button onPress={() => getProductData()} >Test Api</Button>


        {/*Add Item & Calorie Counter */}
        <div className="flex justify-between mb-3" >
          <div>
            <Button className="bg-orange-200 text-gray-700 text-md font-medium" >➕ Add Food</Button>
          </div>
          <div>
            <span className="mx-2" >Calories {totalCals}/{targetCals}</span>
            <span className="text-lg font-semibold text-gray-700 bg-success-200 px-4 py-2 rounded-md" >{targetCals - totalCals}</span>
          </div>
        </div>

        {/* Food Items */}
        <div>
          { items.map( item => <TrackItem item={item} key={item.id} /> ) }
      </div>
    </div>
  )
}