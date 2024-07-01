const geoip = require('geoip-lite');
const catchAsync = require('./catchAsync');

exports.getData = catchAsync(async (req, res, next) => {
  const ip = 'req.ip';

  const geo = geoip.lookup(ip);
  const name = req.query.visitor_name;
  const [lat, lon] = geo.ll;

  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`
  );
  const response = await weather.json();

  res.status(200).json({
    client_ip: ip,
    location: geo.city,
    greeting: `hello, ${name}!, the temperature is ${Math.round(
      response.main.temp - 273
    )} degree celcius in new york`,
  });
});
