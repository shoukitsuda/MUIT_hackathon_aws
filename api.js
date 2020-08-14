// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});
const product_table = "intern-product";

//handler
exports.handler = (event, context, callback) => {
    let OperationType = event['OperationType'];	//引数から操作タイプを取得

    //--OperationTypeごとに処理を分割--//

    //get description
    if (OperationType == 'DESCRIPTION') {
        return getDescription;
    }
    //get list
    if (OperationType == 'LIST') {
        return getList;
    }
    //get exchange
    if (OperationType == 'EXCHANGE') {
        return postExchange;
    }

    //--以降でfunctionを定義--//

    function getDescription(product_id) {
        //paramに対象のテーブル名とプライマリーキーを記述
        var params = {
            TableName: product_table,
            Key: {'product_id': product_id}
        };
        return getDescriptionData(params);

        function getDescriptionData(params) {
            return docClient.get(params).promise();
        }
    }


    function getList(product_id) {
        //paramに対象のテーブル名とプライマリーキーを記述
        var params = {
            TableName: product_table,
            Key: {'product_id': product_id}
        };
        return getListData(params);

        function getListData(params) {
            return docClient.get(params).promise();
        }
    }


    function postExchange(product_id, self_id) {
        //paramに対象のテーブル名とプライマリーキーを記述
        var params = {
            TableName: product_table,
            Key: {'product_id': product_id, 'self_id': self_id}
        };
        return postExchangeData(params);

        function postExchangeData(params) {
            return docClient.post(params).promise();
        }
    }
};