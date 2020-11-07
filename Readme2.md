
# cretae new GraphQl Server to fetch data 


run following common  on terminal  to run serve

```sh
$ npm run start

now open  http://localhost:4000  this will a inretacteive GraphQL tool UI FOr Testing Run following Commond For 

This is simple Demo for subscription demo with Apollo serevr 1 

create a Entry this is fiest channel
now open url http://localhost:4000  and run following commond in Test UI

```sh
# Write your query or mutation here
subscription{
  info
}
```

Now open same url in an  other tab http://localhost:4000

and excute following query in UI 
__get A single Chanel Post__

```sh
# Write your query or mutation here
query go{
  go
}

```

Now see First Tabs and You  will find  result of info in subscription tabs


Get All getCourse from api 

```sh
# Write your query or mutation here
query{
  getCourse{
    title,
    author
  }
}
```

__Query Example For Get A single Course__
```sh
query  {
  getSingleCourse(id:2,title:"222"){
    title
  }
}
```


## subscrition with parameter/filter

we create a subscriptio  name  as  __messageAdded__ in typeDef.js file and 
ceate resolve of this subscription is in resolver .js file

now create a mulation to trigger this subscrition as name __createMessage__ in typeDef.js file 
and there resolver in resolver.js file  and trigger above subscrioptin when new message create
we filter/get data on base of userID in subscription parameter 


Ex.
open an browser in browser http://localhost:4000/

# Write your subscription

subscription {
  messageAdded(userId:3){
    id,
    userId,
    body
  }

}

and click run button 

and open an other tab with same url http://localhost:4000/


# Write your  mutation here
mutation {
  createMessage(input:{id:1,userId:3,body:"4th test data is new propery "}){
    id,
    userId,
    body
  }
}

now click run button

now go to previous tab and see you will get data in subscription tab 

now go to mutation opration tab and change userID value to 2 from 3  

and see in subscription tab , then you will found no new data 

becuase subscription is running for  userID 3


