# ☕ Coffee Pot Pi React Native App ☕

If you've ever wanted to know how many sleepy coworkers in your office crave coffee, the Coffee Pot Pi is the answer! Set up the digital readout next to your coffee pot and watch the coffee requests "flow" in. 

- Also view [Coffee Pot Pi Web Repository](https://github.com/bbalconi/coffee-pot)
- [Web demo](https://coffee-pot-pi.herokuapp.com)

## Development Information

### Prior to running

- Install xCode
- `npm install` inside root 
- add `.env` file inside root directory (this should never be committed to github) 

```
ELEPHANT_DB_USER=YOURUSER
ELEPHANT_DB_PASSWORD=YOURPASSWORD
S3_BUCKET=BUCKETNAME
ACCESS_KEY_ID=BUCKETKEY
SECRET_ACCESS_KEY=BUCKETSECRET
```

### Running in local environment

- `nodemon server.js` inside root
- `npm start` inside root, `i`
- `react-native run-ios` Run simulator on xcode 
