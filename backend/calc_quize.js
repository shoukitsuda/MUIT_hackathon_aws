var aws = require('aws-sdk');
var docClient = new aws.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});
//table名
const user_table = "intern-User"
const conduct_table = "intern-conduct"

exports.handler = async (event, context) => {
    //============0. Postデータの取得============
    console.log("~~~~~~~~~~~~~~test_0~~~~~~~~~~~~~~~~~~~");
    // PostのBody取得ができていない!!かつJson系の処理を行う必要性あり
    const self_id = event.body.self_id || "abcdefghij"
    const result = event.body.result || true
    const answer = event.body.answer || "b";

    //=======1. 回答を保存=====
    console.log("~~~~~~~~~~~~~~test_1~~~~~~~~~~~~~~~~~~~");
    const conduct_myself = await checkHasConducted(self_id);
    console.log(conduct_myself)
    if(conduct_myself) await updateResponseOfConduct(conduct_myself.id, answer);

    //============2. ポイント計算============
    console.log("~~~~~~~~~~~~~~test_2~~~~~~~~~~~~~~~~~~~");
    //データ取得
    const mySelf = await getUser(self_id);
    const partner = await getUser(mySelf.id);
    const conduct_partner = await checkHasConducted(partner.id);
    console.log(conduct_partner)
    //ポイント計算
    var plus_point = result ? 30 : 0;
    if (conduct_partner) {
        if (answer == conduct_partner.response) plus_point += 50;
    }
    plus_point += mySelf.point;
    await updatePoint(self_id, plus_point);

    //============3. データを返す============
    console.log("~~~~~~~~~~~~~~test_3~~~~~~~~~~~~~~~~~~~");
    const returnObj = {
      'point': plus_point
    };
    context.done(null, returnObj);
};


async function checkHasConducted(self_id) {
    const now = new Date()
    const date = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`
    var params = {
        TableName: conduct_table,
        IndexName: 'user_id-date-index',
        ExpressionAttributeNames:{'#user_id': 'user_id', '#date': 'date'},
        ExpressionAttributeValues:{':user_id': self_id, ':date': date},
        KeyConditionExpression: '#user_id = :user_id AND #date = :date'
    };

    const data = await executeQuery(params)
    return data.Item
}

async function executeQuery(params) {
    return docClient.query(params,function(err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("Success", data.Items);
          }
    }).promise();
}

async function getUser(user_id) {
    var params = {
        TableName: user_table,
        Key: {'id': user_id}
    };

    const data = await getData(params);
    return data.Item;
}

async function getConduct(conduct_id) {
    var params = {
        TableName: conduct_table,
        Key: {'id': conduct_id}
    };

    const data = await getData(params);
    return data.Item;
}

async function getData(params) {
    return docClient.get(params).promise();
}



async function updateResponseOfConduct(conduct_id, response) {
    var params = {
        TableName: conduct_table,
        Key:{
             id: conduct_id
        },
        ExpressionAttributeNames: {
            '#response': 'response'
        },
        ExpressionAttributeValues: {
            ':response': response
        },
        UpdateExpression: 'SET #response = :response'
    };
   const data = await updateData(params);
   console.log(data)
}

async function updatePoint(self_id, point) {
    var params = {
        TableName: user_table,
        Key:{
             id: self_id
        },
        ExpressionAttributeNames: {
            '#point': 'point'
        },
        ExpressionAttributeValues: {
            ':point': point
        },
        UpdateExpression: 'SET #point = :point'
    };
   const data = await updateData(params);
   console.log(data)
}

async function updateData(params) {
    return docClient.update(params).promise();
}

async function putData(object) {
    var params = {
        TableName: user_table,
        Item: object
    };
    const data = await docClient.put(params).promise();
    console.log(data)
}

function random_id() {
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    var r = "";
    for(var i=0; i<10; i++){
      r += c[Math.floor(Math.random()*cl)];
    }
    console.log(r)
    return r
}
