import { ddb } from "#lib/dynamodb.js";
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "PixTransactions";

export const saveTransaction = async (data: any) => {
  await ddb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: data,
    })
  );
};

export const updateTransaction = async (id: string, fields: any) => {
  const updateExpr = Object.keys(fields)
    .map((k, i) => `#f${i} = :v${i}`)
    .join(", ");
  const exprAttrNames = Object.keys(fields).reduce(
    (acc, k, i) => {
      acc[`#f${i}`] = k;
      return acc;
    },
    {} as Record<string, string>
  );
  const exprAttrValues = Object.entries(fields).reduce<Record<string, any>>(
    (acc, v, i) => {
      acc[`:v${i}`] = v;
      return acc;
    },
    {} as Record<string, any>
  );

  await ddb.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${updateExpr}`,
      ExpressionAttributeNames: exprAttrNames,
      ExpressionAttributeValues: exprAttrValues,
    })
  );
};
