var aws = require('aws-sdk');
var docClient = new aws.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});

//table名
const user_table = "intern-User"

exports.handler = async (event,context) => {
    //============0. Postデータの取得============
    console.log("~~~~~~~~~~~~~~test_0~~~~~~~~~~~~~~~~~~~");
    // PostのBody取得ができていない!!かつJson系の処理を行う必要性あり
    const self_id = event.body.self_id || 'abcdefghij';
    const password = event.body.password || '****';

    //============1. 本日自分が既にクイズを得ている(回答済みかもチェック)============
    console.log("~~~~~~~~~~~~~~test_1~~~~~~~~~~~~~~~~~~~")
    const mySelf = await getUser(self_id);
    var hasSuccess = false;
    var partner;
    if (mySelf) {
        hasSuccess = mySelf.password == password  ? true : false;
    }
    if (hasSuccess) partner = await getUser(mySelf.partner_id);
    const obj = {
        hasSuccess: hasSuccess,
        self_id: hasSuccess ? self_id : null,
        e_mail: hasSuccess ? mySelf.e_mail : null,
        name: hasSuccess ? mySelf.name : null,
        point: hasSuccess ? mySelf.point : null,
        partner_id: hasSuccess ? partner.id : null,
        partner_name: hasSuccess ? partner.name : null
    }

    const returnValues = {
        status: 200,
        body: obj
    }

    context.done(null,returnValues)
};

async function getUser(user_id) {
    var params = {
        TableName: user_table,
        Key: {'id': user_id}
    };

    const data = await getData(params)
    return data.Item
}

async function getData(params) {
    return docClient.get(params).promise();
}
