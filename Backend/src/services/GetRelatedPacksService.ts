import { connect } from "../database";

import { DatabaseConnection } from "../interface/databaseConnection";
import { RelatedPack } from "../interface/relatedPack";

export async function getRelatedPacksService(code: Number): Promise<RelatedPack[]> {
    const connection: DatabaseConnection = await connect();
    const queryResults: any[] = await connection.query("SELECT DISTINCT pack_id FROM packs WHERE pack_id = ? OR product_id = ?",[code,code]);
    const packs: RelatedPack[] = queryResults[0];
    
    return packs;
}
