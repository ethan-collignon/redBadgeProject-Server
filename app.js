require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(require('./middleware/headers'));

const controllers = require("./controllers");
app.use(Express.json());

app.use("/user", controllers.userController);
app.use("/eatery", controllers.eateryController); 
app.use("/campsite", controllers.campController);


dbConnection
  .authenticate()
  .then(() => dbConnection.sync()) // {force: true}
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
