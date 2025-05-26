import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get("type");

  try {
    const data = await client.send(
      new ScanCommand({
        TableName: "PixTransactions",
      })
    );

    let items = data.Items ?? [];

    if (type === "cashin" || type === "cashout") {
      items = items.filter((item) => item.type === type);
    }

    console.log(data.Items);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Erro ao buscar transções", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
