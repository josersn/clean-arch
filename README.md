
Hello there! this application has the conceptions of SOLID and clean architecture in this case I'm not using an extern database, all of the data is saved in memory, to show how the implementations of dependency inversion work, but nothing prevents the creation by keeping the interface contracts.

## Production dependency
* [Express](https://expressjs.com/pt-br/)
* [Mongoose](https://github.com/davidbanham/express-async-errors#readme)

## Installation and start project and doc UI

```
yarn && yarn dev
or 
npm install && npm run dev
```

You should get
```
Server is running
```
Access http://localhost:8080/ and Access http://localhost:8080/docs

## Testing

```
yarn test
or
npm test
```
### Routes

```
→ GET -> http://localhost:8080/account  | List all accounts.
→ GET -> http://localhost:8080/account/:id  | list  a account.
→ POST -> http://localhost:8080/account | Create account.
→ DELETE -> http://localhost:8080/account/:id | Turn off a Account.
→ PUT -> http://localhost:8080/account/:id | update Account.
```

## Clean Architecture

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### Typical Request

![Request](arch.png)





