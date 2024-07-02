const geoip = require('geoip-lite');
const catchAsync = require('./catchAsync');
const requestIp = require('request-ip');

exports.getIp = (req, res) => {
  return res.json({ message: 'hello world' });
};

exports.getData = catchAsync(async (req, res, next) => {
  const ip =
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    '';
  console.log(ip);

  // const ip = req.socket.remoteAddress || req.ip;
  // console.log(ip);
  // const forwardedIpsStr = req.header('X-FORWARDED-FOR');
  // console.log({ forwardedIpsStr });
  // let ip = '';

  // if (forwardedIpsStr) {
  //   ip = forwardedIps = forwardedIpsStr.split(',')[0];
  // }
  // const ip = req.ip;
  // const ip = '102.91.53.10';
  // const ip = '207.97.22.23';
  console.log({ ip });
  const geo = geoip.lookup(ip);
  console.log(geo);
  const name = req.query.visitor_name;
  // const [lat, lon] = geo.ll;
  const city = geo.city;

  const weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=London&aqi=no`
  );

  // const weather = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`
  // );
  const response = await weather.json();
  console.log('response', response.current.temp_c);
  const temp = response?.current?.temp_c;
  if (temp !== undefined) {
    console.log(`The temperature is ${temp}°C`);
  } else {
    console.error('Temperature data is unavailable.');
  }

  res.status(200).json({
    client_ip: ip,
    location: geo.city,
    greeting: `hello, ${name}!, the temperature is ${temp} degree celcius in new york`,
  });
});
