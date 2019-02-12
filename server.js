const express = require('express');
const middleware = require('@line/bot-sdk').middleware
const Client = require('@line/bot-sdk').Client
const app = express()
var step =0;
const config = {
  channelAccessToken: 'LWqcUOoXfPpg5RMtY5iw3pHYCO0dSX5VcP8Ncu382jEthLPtQf/S6Et7iN6qWo6eSAlmC3P0WkS00pgHkbY5I4H0s3IWtNboSnlqpt4bddYyO/nFSSCMcTKDqpmAfK1j6ptp5C5T+DUiA4EJ6SPXhQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'a5d6890b3143a236b86131aa1962c04a6'
}



const client = new Client(config)

app.get('/', function (req, res) {
	res.send('chatbot-nodejs-heroku-starter!! Yahooooooo');
})

app.post('/webhook', middleware(config), (req, res) => {
  res.sendStatus(200)
  // console.log(req.body.events) // webhook event objects
  // console.log(req.body.destination) // user ID of the bot (optional)
  // Promise.all(req.body.events.map(hanndleEvent))
  

})

//------------- test step reply message

function hanndleEvent(event){
  if(event.message.type=='text'){
    let msg={
      type: "text",
      text: "Manchester United"
    }
    return client.replyMessage(event.replyToken,msg)
  } 



  if(event.message.type=='text' && event.message.text=='location'){
    let msg = {
     type: "text",
     text: "Handle Event message"  //Fix auto reply message
    // text: event.message.text  //reply user input message

    /* Test location
      id: "325708",
      type: "location",
      title: "my location",
      address: "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
      latitude: 35.65910807942215,
      longitude: 139.70372892916203
      */
    }
    return client.replyMessage(event.replyToken,msg)
 //   client.pushMessage(event.source.userId, msg) //1st return msg
 //   return client.pushMessage(event.source.userId, msg) //2nd return msg
  }else if (event.message.type==='text' && event.message.text=='menu'){
    let msg = {
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
          "type": "carousel",
          "columns": [
              {
                "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                "imageBackgroundColor": "#FFFFFF",
                "title": "this is menu",
                "text": "description",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                },
                "actions": [
                    {
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=111"
                    },
                    {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid=111"
                    },
                    {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/111"
                    }
                ]
              },
              {
                "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
                "imageBackgroundColor": "#000000",
                "title": "this is menu",
                "text": "description",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/222"
                },
                "actions": [
                    {
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=222"
                    },
                    {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid=222"
                    },
                    {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/222"
                    }
                ]
              }
          ],
          "imageAspectRatio": "rectangle",
          "imageSize": "cover"
      }
    }
    return client.replyMessage(event.replyToken,msg)

  }

 
}



app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})

