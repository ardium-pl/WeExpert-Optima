import { logger } from "@server/utils/logger";
import { ImportRowId } from "@server/utils/types/optimaTypes";
import mysql, { Connection, ConnectionOptions } from "mysql2/promise";

export class ContractSql {
    private dbConfig: ConnectionOptions;

    constructor(dbConfig?: ConnectionOptions) {
        this.dbConfig = dbConfig || {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,
        };
    }

    // Metoda do tworzenia połączenia z bazą danych
    private async _createConnection(): Promise<Connection | null> {
        let connection: Connection | null = null;
        try {
            connection = await mysql.createConnection(this.dbConfig);
            return connection;
        } catch (error) {
            logger.error("❌ Błąd podczas łączenia z bazą danych:", error);
            if (connection) {
                await connection.end();
            }
            return null;
        }
    }

    // Metoda sprawdzająca, czy dokument istnieje w tabeli DokDefinicje
    public async extractUmwIrid(
        documentDefinition: string
    ): Promise< ImportRowId | null> {
        logger.info(`🔍 Szukam dokumentu: "${documentDefinition}" w tabeli DokDefinicje...`);

        const connection = await this._createConnection();
        if (!connection) {
            logger.info("❌ Nie udało się nawiązać połączenia z bazą.");
            return null;
        }

        try {
            logger.info("📡 Wysyłam zapytanie SQL...");
            const [rows]: any = await connection.execute(
                `
                SELECT DDf_ImportRowId, DDf_ImportRowId2
                FROM DokDefinicje
                WHERE DDf_Nazwa = ?;
                `,
                [documentDefinition]
            );

            logger.info("📄 Wynik zapytania:", rows);

            if (rows.length > 0) {
                return {
                    importRowId: rows[0].DDf_ImportRowId,
                    importRowId2: rows[0].DDf_ImportRowId2,
                };
            } else {
                logger.info("❌ Brak wyników dla podanej nazwy dokumentu.");
                return null;
            }
        } catch (error) {
            logger.error("❌ Błąd podczas sprawdzania dokumentu:", error);
            return null;
        } finally {
            await connection.end();
            logger.info("🔌 Połączenie zamknięte.");
        }
    }

    
    public async extractUmwTwpIrid(
        contractType: string
    ): Promise< ImportRowId | null> {
        logger.info(`🔍 Szukam wpisu: "${contractType}" w tabeli TypWyplata...`);

        const connection = await this._createConnection();
        if (!connection) {
            logger.info("❌ Nie udało się nawiązać połączenia z bazą.");
            return null;
        }

        try {
            logger.info("📡 Wysyłam zapytanie SQL...");
            const [rows]: any = await connection.execute(
                `
                SELECT TWP_ImportRowId, TWP_ImportRowId2
                FROM TypWyplata
                WHERE TWP_Nazwa = ?;
                `,
                [contractType]
            );

            logger.info("📄 Wynik zapytania:", rows);

            if (rows.length > 0) {
                return {
                    importRowId: rows[0].TWP_ImportRowId,
                    importRowId2: rows[0].TWP_ImportRowId2,
                };
            } else {
                logger.info("❌ Brak wyników dla podanej nazwy wpisu.");
                return null;
            }
        } catch (error) {
            logger.error("❌ Błąd podczas sprawdzania wpisu:", error);
            return null;
        } finally {
            await connection.end();
            logger.info("🔌 Połączenie zamknięte.");
        }
    }
}
