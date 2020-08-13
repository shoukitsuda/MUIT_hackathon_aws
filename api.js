// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "intern-btest";

//get description
var description = docClient.get(param, function (err, data) {

    if (err) {
        response.statusCode = 500;
        response.body = JSON.stringify({"message": "データが見つかりません"});
        callback(null, response);
        return;
    } else {
        docClient.get(param, function (err, data) {
            if (err) {
                //TODO: 取得に失敗した場合の処理を記述
                response.statusCode = 500;
                //response.body = JSON.stringify({"message": "予期せぬエラーが発生しました"});
                response.body = JSON.stringify(err);
                callback(null, response);
                return;
            } else {
                //TODO: 取得に成功した場合の処理を記述
                response.body = JSON.stringify({"message": "success"});
                console.log(data);

                callback(null, response);
                return;
            }
        });
    }
});

//
var list = docClient.get(param, function (err, data) {
    if (err) {
        response.statusCode = 500;
        response.body = JSON.stringify({"message": "データが見つかりません"});
        callback(null, response);
        return;
    } else {
        docClient.get(param, function (err, data) {
            if (err) {
                //TODO: 取得に失敗した場合の処理を記述
                response.statusCode = 500;
                //response.body = JSON.stringify({"message": "予期せぬエラーが発生しました"});
                response.body = JSON.stringify(err);
                callback(null, response);
                return;
            } else {
                //TODO: 取得に成功した場合の処理を記述
                response.body = JSON.stringify({"message": "success"});
                console.log(data);

                callback(null, response);
                return;
            }
        });
    }
});

//dynamo.get()
var exchange = docClient.post(param, function (err, data) {
    if (err) {
        response.statusCode = 500;
        response.body = JSON.stringify({"message": "データが見つかりません"});
        callback(null, response);
        return;
    } else {
        docClient.get(param, function (err, data) {
            if (err) {
                //TODO: 取得に失敗した場合の処理を記述
                response.statusCode = 500;
                //response.body = JSON.stringify({"message": "予期せぬエラーが発生しました"});
                response.body = JSON.stringify(err);
                callback(null, response);
                return;
            } else {
                //TODO: 取得に成功した場合の処理を記述
                response.body = JSON.stringify({"message": "success"});
                console.log(data);

                callback(null, response);
                return;
            }
        });
    }
});

exports.handler = (event, context, callback) => {
    let OperationType = event['OperationType']	//引数から操作タイプを取得

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({"message": ""})
    };

    const body = JSON.parse(event.body);

//paramに対象のテーブル名とプライマリーキーを記述
    const param = {
        TableName: tableName,
        Key: {//プライマリキーによって１つ指定
            "product_id": body.id,
        },
    };

    if (OperationType == 'DESCRIPTION') {

        return description;
    } else if (OperationType == 'LIST') {
        return list;
    } else {
        return exchange;
    }
};
