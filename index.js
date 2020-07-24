const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();


const port = process.env.PORT || 5002

app.use(express.json());
app.use(cors());



app.get('/generateToken', async (req, res) => {
  console.log(req.query.code);
  const token = await axios.post(`https://github.com/login/oauth/access_token?client_id=80a77c38e30282ca279c&client_secret=1f86c96c0ecee90dfc29c85c7fa152563c4d8e40&code=${req.query.code}`);

  const accessToken = sanitizeToken(token.data);
  addStar(accessToken);



  async function addStar(token) {
    const headers = {
      "Authorization": `Bearer ${token}`
    }
    await axios.put(`https://api.github.com/user/starred/davidsouza20/airbnd`, headers);
  }

  function sanitizeToken(token) {
    const tmpString = token.split('=');
    const access_token = tmpString[1].split("&");
    return access_token[0];
  }


  res.send(token.data);
});

// start the server listening
app.listen(port, () => {
  console.log('Node app is running on port', port);

});