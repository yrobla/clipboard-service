# Clipboard service

In order to run the code just sit on the root folder and execute:

npm run build
npm run start

It will start a server, that you can query with curl.

## Login

Endpoints are protected with login. In order to login execute the call:

 TOKEN=$(curl -X POST -u testuser:test1234 http://localhost:3000/auth/login -d '{"username": "testuser", "password": "test1234"}'  -H "Content-Type: application/json" | jq -r '.access_token')
 
 It will generate a token that you can use to auth. Subsequent calls needs to include that JWT token
 
 ## Query for SS
 
 Several calls can be executed to query for SS :
 
  curl http://localhost:3000/employees/ss -H "Authorization: Bearer $TOKEN"
  curl http://localhost:3000/employees/ssByDepartment -H "Authorization: Bearer $TOKEN"
  curl http://localhost:3000/employees/ssBySubdepartment -H "Authorization: Bearer $TOKEN"
  curl http://localhost:3000/employees/ssForContract -H "Authorization: Bearer $TOKEN"
  
  ## Add new data
  
  This can be performed with:
  
  curl -X POST http://localhost:3000/employees/ -H "Authorization: Bearer $TOKEN" -d '{"name": "test", "salary": 200, "currency": "EUR", "department": "abc", "sub_department": "def", "on_contract": false }' -H "Content-type: application/json"
  
  # Update data
  
  This can be performed with:
  
  curl -X PUT http://localhost:3000/employees/Abhishek -H "Authorization: Bearer $TOKEN" -d '{"name": "test", "salary": 200, "currency": "EUR", "department": "abc", "sub_department": "def", "on_contract": false }' -H "Content-type: application/json"