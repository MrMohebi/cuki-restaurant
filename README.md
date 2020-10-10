
## Restaurants:


> ### ```api\signinRestaurant.fetch.php``` ``POST``
>
> #### Required fields:
>   - **username**
>   - **password** (restaurant english name)
>   
>   #### Return Values ``JSON``:
>   ```json
>   {
>     "statusCode": "[code]",
>     "data": {
>           "token": "SampleToken1",
>           "username": "SampleUsername1",
>           "position": "SamplePosition1",
>           "englishName": "SampleEnglishName1",
>           "persianName": "SamplePersianName1" 
>       } 
>   }
>   ```
>   > #####[code] :
>   >   - 200 (successes)
>   >   - 400 (bad inputs)
>   >   - 401 (username or pass is wrong)



> ### ```api\getOrdersList.fetch.php``` ``POST``
>
> #### Required fields:
>   - **token**
>   - **english_name** (restaurant english name)
>   - **startDate** (timestamp)
>   - **endDate** (timestamp)
>   
>   #### Return Values ``JSON``:
>   ```json
>   {
>     "statusCode": "[code]",
>     "data": []
> }
>   ```
>   > #####[code] :
>   >   - 200 (successes)
>   >   - 400 (bad inputs)
>   >   - 401 (token is not valid)
>   >   - 500 (server side error)



> ### ```api\createNewFood.add.php``` ``POST``
>
> #### Required fields:
>   - **token**
>   - **english_name** (restaurant english name)
>   - **name**
>   - **group**  
>   - **details** (separate them by `+`)
>   - price (not required)
>   - status (not required) 
>   - delivery_time (not required)
>   - thumbnail (not required)
>   
>   
>   #### Return Values ``JSON``:
>   ```json
>   {"statusCode": "[code]"}
>   ```
>   > #####[code] :
>   >   - 200 (successes)
>   >   - 400 (bad inputs)
>   >   - 401 (token is not valid)
>   >   - 402 (duplicate inputs)
>   >   - 500 (server side error)



> ### ```api\changeRestaurantInfo.modify.php``` ``POST``
>
> #### Required fields:
>   - **englishName** 
>   - **token**
>
> #### Each request input effect:
> **englishName** & **englishNameChange**  => change english name
>
> **persianName** & **persianNameChange**  => change persian name 
>
> **phone** & **phoneChange**  => change phone
>
> **address** & **addressChange**  => change address
>
> **addressLink** & **addressLinkChange**  => change address google map link
>
> **owner** & **ownerChange**  => change owner name
>
> **employers** & **employersChange**  => change employers list
>
> **socialLinks** & **socialLinksChange**  => change social Links list
>
> **openTime** & **openTimeChange**  => change open Time list
>
> **type** & **typeChange**  => change type list
>
> **logoLink** & **logoLinkChange**  => change restaurant logo link address
>
> **minOrderPrice** & **minOrderPriceChange**  => change minimum price of ordering
>   #### Return Values ``JSON``:
>   ```json
>   {
>  "statusCode": "[code]"
>  }
>   ```
>   > #####[code] :
>   >   - 200 (successes)
>   >   - 400 (bad inputs) 
>   >   - 401 (token is not valid) 
>   >   - 500 (server side error)



> ### ```api\changeFoodInfo.modify.php``` ``POST``
>
> #### Required fields:
>   - **token**
>   - **englishName** 
>   - **foodId**
>
> #### Each request input effect:
> **persianName** & **persianNameChange**  => change persian name 
>
> **group** & **groupChange**  => change group
>
> **details** & **detailsChange**  => change details (like: "det1+dit2+dit3 + ...")
>
> **price** & **priceChange**  => change price
>
> **status** & **statusChange**  => change status (like: out of stock / in stock)
>
> **discount** & **discountChange**  => change food discount (in percentage)
>
> **deliveryTime** & **deliveryTimeChange**  => change deliveryTime of food (in second)
>
> **thumbnail** & **thumbnailChange**  => change food thumbnail (link)
>
> **model3d** & **model3dChange**  => change model3d (not sure what should be)
>
> **photos** & **photosChange**  => change food photos (like: ["link1", "link2", "link3", ...])
>
>   #### Return Values ``JSON``:
>   ```json
>   {
>  "statusCode": "[code]"
>  }
>   ```
>   > #####[code] :
>   >   - 200 (successes)
>   >   - 400 (bad inputs) 
>   >   - 500 (server side error)



> ### ```api\changeOrderStatus.modify.php``` ``POST``
>
> #### Required fields:
>   - **token**
>   - **englishName**
>   - **orderStatus** 
>   - **trackingId** 
>   - deleteReason (not required)
>
>   #### Return Values ``JSON``:
>   ```json
>   {
>   "statusCode": "[code]"
>  }
>   ```
>   > #####[code] :
>   >   - 200 (successes)
>   >   - 401 (token not valid) 
>   >   - 400 (bad inputs) 
>   >   - 500 (server side error)



> ### ```api\createTable.add.php``` ``POST``
>
> #### Required fields:
>   - **token**
>   - **englishName**
>   - **tableName**
>   - **tableCapacity**
>   - **tableStatus**
>
>   #### Return Values ``JSON``:
>   ```json
>   {
>   "statusCode": "[code]"
>  }
>   ```
>   > #####[code] :
>   >   - 200 (successes)
>   >   - 401 (token not valid) 
>   >   - 402 (its duplicated) 
>   >   - 400 (bad inputs) 
>   >   - 500 (server side error)



> ### ```api\changeTable.modify.php``` ``POST``
>
> #### Required fields:
>   - **token**
>   - **englishName**
>   - **tableId**
>   - tableName
>   - tableCapacity
>   - tableStatus
>
>   #### Return Values ``JSON``:
>   ```json
>   {
>   "statusCode": "[code]"
>  }
>   ```
>   > #####[code] :
>   >   - 200 (successes)
>   >   - 401 (token not valid) 
>   >   - 402 (entered table is not available) 
>   >   - 400 (bad inputs) 
>   >   - 500 (server side error)

