####### Bad request for required field (name) #########
POST {{ HOST }}/api/v1/stores
{
  "chain": "Extra",
  "chainClassName": "Extra",
  "chainId": "56e466eb-a524-496a-a3cf-c08b8db86f22",
  "lat": 59.1227622,
  "lng": 11.3926549,
  "address": "GRØNLAND 6, 1767 HALDEN",
  "city": "Halden",
  "phone": "69212670",
  "email": "halden.extra@coop.no",
  "organizationNumber": "948432617"
}

HTTP 400

[Asserts]
jsonpath "$.message" == "Bad Request"
jsonpath "$.errors" isCollection
jsonpath "$.errors[0].property" == "name"
jsonpath "$.errors[0].constraints.isString" == "name must be a string"
jsonpath "$.errors[0].constraints.isNotEmpty" == "name should not be empty"


####### Create Store #########
POST {{ HOST }}/api/v1/stores
{
  "name": "Halden",
  "chain": "Extra",
  "chainClassName": "Extra",
  "chainId": "56e466eb-a524-496a-a3cf-c08b8db86f22",
  "lat": 59.1227622,
  "lng": 11.3926549,
  "address": "GRØNLAND 6, 1767 HALDEN",
  "city": "Halden",
  "phone": "69212670",
  "email": "halden.extra@coop.no",
  "organizationNumber": "948432617"
}

HTTP 200

[Asserts]
jsonpath "$.id" isString
jsonpath "$.name" isString

[Captures]
storeId: jsonpath "$.id"


######## Get store by id #########
GET {{ HOST }}/api/v1/stores/{{ storeId }}

HTTP 200

[Asserts]
jsonpath "$.id" == {{ storeId }}
jsonpath "$.name" == "Halden"
jsonpath "$.chain" == "Extra"
jsonpath "$.chainClassName" == "Extra"
jsonpath "$.lat" == 59.1227622
jsonpath "$.lng" == 11.3926549
jsonpath "$.address" == "GRØNLAND 6, 1767 HALDEN"
jsonpath "$.city" == "Halden"
jsonpath "$.phone" == "69212670"
jsonpath "$.email" == "halden.extra@coop.no"
jsonpath "$.organizationNumber" == "948432617"


######## Update store by id #########
PATCH {{ HOST }}/api/v1/stores/{{ storeId }}
{
  "name": "Grorud"
}

HTTP 200

[Asserts]
jsonpath "$.id" == {{ storeId }}
jsonpath "$.name" == "Grorud"
jsonpath "$.chain" == "Extra"
jsonpath "$.chainClassName" == "Extra"
jsonpath "$.lat" == 59.1227622
jsonpath "$.lng" == 11.3926549
jsonpath "$.address" == "GRØNLAND 6, 1767 HALDEN"
jsonpath "$.city" == "Halden"
jsonpath "$.phone" == "69212670"
jsonpath "$.email" == "halden.extra@coop.no"
jsonpath "$.organizationNumber" == "948432617"


######## Get store list #########
GET {{ HOST }}/api/v1/stores

HTTP 200

[Asserts]
jsonpath "$.total" > 0
jsonpath "$.stores" isCollection

jsonpath "$.stores.[0].id" isString
jsonpath "$.stores.[0].name" isString
jsonpath "$.stores.[0].chain" isString
jsonpath "$.stores.[0].chainClassName" isString
jsonpath "$.stores.[0].lat" isFloat
jsonpath "$.stores.[0].lng" isFloat
jsonpath "$.stores.[0].address" isString
jsonpath "$.stores.[0].city" isString
jsonpath "$.stores.[0].phone" isString
jsonpath "$.stores.[0].email" isString
jsonpath "$.stores.[0].organizationNumber" isString

######## Delete store by id #########
DELETE {{ HOST }}/api/v1/stores/{{ storeId }}

HTTP 200

######## Entity not found #########
GET {{ HOST }}/api/v1/stores/{{ storeId }}

HTTP 404

[Asserts]
jsonpath "$.message" == "Entity not found"