import { connect } from "../database";

import { Pack } from "../interface/pack";
import { DatabaseConnection } from "../interface/databaseConnection";

export async function getPacksService(): Promise<Pack[]> {
    const connection: DatabaseConnection = await connect();
    const queryResults: any[] = await connection.query("SELECT * FROM packs");
    const packs: Pack[] = queryResults[0];
    
    return packs;
}
