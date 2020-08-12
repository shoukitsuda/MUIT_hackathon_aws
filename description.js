// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "intern-btest";

exports.handler = (event, context, callback) => {

    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    var body = JSON.parse(event.body);

    //paramに対象のテーブル名とプライマリーキーを記述
    var param = {
        TableName: tableName,
        Key:{//プライマリキーによって１つ指定
            "product_id": body.id,
        },
    };

    //dynamo.get()
    docClient.get(param, function(err, data){
        if(err){
            response.statusCode = 500;
            response.body = JSON.stringify({"message": "データが見つかりません"});
            callback(null, response);
            return ;
        }else{
            docClient.get(param, function(err, data){
                if(err){
                    //TODO: 取得に失敗した場合の処理を記述
                    response.statusCode = 500;
                    //response.body = JSON.stringify({"message": "予期せぬエラーが発生しました"});
                    response.body = JSON.stringify(err);
                    callback(null, response);
                    return;
                }else{
                    //TODO: 取得に成功した場合の処理を記述
                    response.body = JSON.stringify({"message": "success"});
                    console.log(data);

                    callback(null, response);
                    return;
                }
            });
        }
    });
};
