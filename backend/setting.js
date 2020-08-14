var aws = require('aws-sdk');
var docClient = new aws.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});
//table名
const user_table = "intern-User"

exports.handler = async (event, context) => {
    //============0. Postデータの取得============
    console.log("~~~~~~~~~~~~~~test_0~~~~~~~~~~~~~~~~~~~");
    // PostのBody取得ができていない!!かつJson系の処理を行う必要性あり
    const id = random_id()
    const e_mail = event.body.e_mail || 'test6@gmail.com';
    const name = event.body.name || "test6";
    var partner_id = event.body.partner_id || "as93lyn97t";
    const password = event.body.password || "****";
    const point = 0;

    //=======1. 指定したパートナーのpartner_idが既に埋まっているかを確認=====
    /*
    1.1. 埋まっているなら、partner_id=""
    1.2. 埋まっていないのであれば、パートナーのpartner_idを自分のidにする
    */
    console.log("~~~~~~~~~~~~~~test_1~~~~~~~~~~~~~~~~~~~")
    var partner_info;
    var partnerHasPartner = false;

    if (partner_id) {
        partner_info = await getUser(partner_id);
        if (partner_info.partner_id) {
            partner_id = "" //1.1.
            partnerHasPartner = true
        } else {
            await updatePIdOfUser(partner_id, id)//1.2.
        }
    }

    //============2. データを保存============
    console.log("~~~~~~~~~~~~~~test_2~~~~~~~~~~~~~~~~~~~");
    const object = {
      'id': id,
      'e_mail': e_mail,
      'name' : name,
      'partner_id': partner_id,
      'password': password,
      'point': point
    };
    await putData(object);

    //============3. データを返す============
    console.log("~~~~~~~~~~~~~~test_3~~~~~~~~~~~~~~~~~~~");
    var partner_name="";
    if(partner_id) {
        partner_info = await getUser(partner_id);
        partner_name = partner_info.name
    }

    const returnObj = {
      'partnerHasPartner': partnerHasPartner,
      'self_id': id,
      'name' : name,
      'partner_id': partner_id,
      'partner_name': partner_name,
      'point': point
    };

    context.done(null, returnObj);
};


async function getUser(user_id) {
    var params = {
        TableName: user_table,
        Key: {'id': user_id}
    };

    const data = await getData(params);
    return data.Item;
}

async function updatePIdOfUser(self_id, partner_id) {
    var params = {
        TableName: user_table,
        Key:{
             id: self_id
        },
        ExpressionAttributeNames: {
            '#p_id': 'partner_id'
        },
        ExpressionAttributeValues: {
            ':new_p_id': partner_id
        },
        UpdateExpression: 'SET #p_id = :new_p_id'
    };
   const data = await updateData(params);
   console.log(data)
}

async function putData(object) {
    var params = {
        TableName: user_table,
        Item: object
    };
    const data = await docClient.put(params).promise();
    console.log(data)
}

async function getData(params) {
    return docClient.get(params).promise();
}

async function updateData(params) {
    return docClient.update(params).promise();
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
