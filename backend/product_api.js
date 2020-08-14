// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});
const user_table = "intern-User";
const product_table = "intern-product";
// const self_id = event["self_id"] || "abcdefghij";

//handler
exports.handler = async (event, context, callback) => {
    let OperationType = event['OperationType'];	//引数から操作タイプを取得

    //--OperationTypeごとに処理を分割--//

    //get description
    if (OperationType == 'DESCRIPTION') {
        return getDescription(product_id);
    }
    //get list
    // if (OperationType == 'LIST') {
    //     return getList;
    // }

    //update exchange
    if (OperationType == 'EXCHANGE') {
        header:
            return exchange(user_id,product_id);
    }

    //--以降でfunctionを定義--//
    //get discription
    async function getDescription(product_id) {
        //paramに対象のテーブル名とプライマリーキーを記述
        var params = {
            TableName: product_table,
            Key: {id: product_id}
        };

        console.log({params});
        const result = await getDescriptionData(params);
        console.log({result});
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };

        function getDescriptionData(params) {
            return docClient.get(params).promise();
        }
    }

    // async function getList(product_id) {
    //     //paramに対象のテーブル名とプライマリーキーを記述
    //     var params = {
    //         TableName: product_table,
    //         Key: {id: '1'}
    //     };

    //     console.log({params});
    //     const result = await getListData(params)
    //     console.log({result});
    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify(result.Item)
    //     }

    //     function getListData(params) {
    //         return docClient.get(params).promise();
    //     }
    // }


    // function postExchange(product_id, self_id) {



    //パラメータの設定
    // var userPoint = {
    //     TableName: user_table,
    //     Key: {id: '1'}
    // };

    // var productPpoint= {
    //     TableName: product_table,
    //     Key: {id: '1'}
    // };

    //functionの呼び出し
    // postUserExchangeData(userParams);
    // postProductExchangeData(productParams);
    //仮置きの変数
    // var point =
    // getPointData();
    // var value =getValueData();

    //dynamoから行をひっぱってくる
    //  function getPointData(userPpoint) {
    //     return docClient.get(userPoint).promise();
    // }
    // var point =getPointData(userPoint);

    async function exchange(user_id,product_id) {
        //paramに対象のテーブル名とプライマリーキーを記述
        var userPoint = {
            TableName: user_table,
            Key: {id: user_id}
        };
        var productPoint = {
            TableName: product_table,
            Key: {id: product_id}
        };

        console.log({userPoint});

        const userResult = await getPointData(userPoint);
        const productResult = await getPointData(productPoint);
        // console.log(result.Item);
        const change = productResult.Item.value - userResult.Item.point;
        console.log(change);
        if (productResult.Item.value < userResult.Item.point) {
            //userのポイントをproductのvalue分だけ減らすように更新処理
            updatePoint(user_id,change);
        }
    }

    //getPointDate
    function getPointData(userPoint) {
        return docClient.get(userPoint).promise();
    }

    //updatepoint
    async function updatePoint(user_id, point) {
        var params = {
            TableName: user_table,
            Key:{
                id: user_id
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
        console.log(data);
    }

    //updateData
    async function updateData(params) {
        return docClient.update(params).promise();
    }


    // return {
    //     // result.Item.value;
    //     statusCode: 200,
    //     body: change
    //  };
};