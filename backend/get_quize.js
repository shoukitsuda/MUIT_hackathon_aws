var aws = require('aws-sdk');
var docClient = new aws.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});

//table名
const condct_table = "intern-conduct"
const user_table = "intern-User"
const quize_table = "intern-Quiz"
//日つけ
const now = new Date()
const date = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()+1}`

exports.handler = async (event,context) => {
    //============0. urlパラメータの取得============
    console.log("~~~~~~~~~~~~~~test_0~~~~~~~~~~~~~~~~~~~")
    const {self_id} = event.pathParameters as { self_id: string};

    //============1. 本日自分が既にクイズを得ている(回答済みかもチェック)============
    console.log("~~~~~~~~~~~~~~test_1~~~~~~~~~~~~~~~~~~~")
    const hasGetQuize = await checkHasQuize(self_id)
    console.log(hasGetQuize)
    if (hasGetQuize.length != 0) {
        const returnValues = {
            status: 200,
            body: hasGetQuize[0]
        }
        context.done(null,returnValues);
    }

    //============2. パトナーidより、パートナーが本日得たクイズを得る============
    console.log("~~~~~~~~~~~~~~test_2~~~~~~~~~~~~~~~~~~~")
    const mySelf = await getUser(self_id)
    const partner = await getUser(mySelf.id)
    const hasPartnerConduct = await checkHasQuize(partner.id)
    const partnerQuizeId = hasPartnerConduct.length != 0 ? hasPartnerConduct.quize_id : "-100"
    const partnerQuize = await getQuize(partnerQuizeId)
    if (partnerQuize) {
        const returnValues = {
            status: 200,
            body: partnerQuize
        }
        context.done(null,returnValues);
    }

    //============3. クイズをランダムに取得============
    console.log("~~~~~~~~~~~~~~test_3~~~~~~~~~~~~~~~~~~~")
    const allQuizes = await getAllQuizes()
    console.log("allQuizes: ",allQuizes)
    const quize_id = Math.floor( Math.random() * allQuizes.length)
    console.log("quize_id: ",quize_id);
    const random_quize = allQuizes[quize_id];
    console.log("random_quize: ",random_quize)

    //============4. 本日クイズを得たことを記録============
    console.log("~~~~~~~~~~~~~~test_4~~~~~~~~~~~~~~~~~~~")
    //TODO
    const object = {
        id: random_id(),
        user_id: self_id,
        quize_id: quize_id+1,
        date: date,
        response: ""
    }
    console.log("object", object);
    await putData(object, condct_table);

    const returnValues = {
        status: 200,
        body: random_quize
    }
    console.log("returnValues: ",returnValues)
    context.done(null,returnValues);
};


async function checkHasQuize(self_id) {
    var params = {
        TableName: condct_table,
        IndexName: 'user_id-date-index',
        ExpressionAttributeNames:{'#user_id': 'user_id', '#date': 'date'},
        ExpressionAttributeValues:{':user_id': self_id, ':date': date},
        KeyConditionExpression: '#user_id = :user_id AND #date = :date'
    };

    const data = await executeQuery(params)
    return data.Items
}

async function getUser(user_id) {
    var params = {
        TableName: user_table,
        Key: {'id': user_id}
    };

    const data = await getData(params)
    return data.Item
}

async function getQuize(quize_id) {
    var params = {
        TableName: quize_table,
        Key: {'id': quize_id}
    };

    const data = await getData(params)
    return data.Item
}

async function getAllQuizes() {
    const data = await scanTable(quize_table)
    return data.Items
}

async function putData(object, table) {
    var params = {
        TableName: table,
        Item: object
    };
    const data = await docClient.put(params).promise();
    console.log(data)
}

async function getData(params) {
    return docClient.get(params).promise();
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

async function scanTable(table_name) {
    var params = {
        TableName: table_name,
    };

    return docClient.scan(params,function(err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("Success", data.Items);
          }
    }).promise();
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
