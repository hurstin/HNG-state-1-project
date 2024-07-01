const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(app.get('env'));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is runnig on ${port}`);
});
