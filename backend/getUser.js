var aws = require('aws-sdk');
var docClient = new aws.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});

//table名
const user_table = "intern-User"

exports.handler = async (event,context) => {
    console.log("============urlパラメータの取得================")
    const {self_id} = event.pathParameters as { self_id: string};
    const mySelf = await getUser(self_id);

    const object = {
        self_id: mySelf.id,
        e_mail: mySelf.e_mail,
        name: mySelf.name,
        point: mySelf.point,
    };
    context.done(null,object);
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
    return docClient.get(params,function(err, data) {
       if (err) console.log(err);
       else console.log(data);
    }).promise();
}
