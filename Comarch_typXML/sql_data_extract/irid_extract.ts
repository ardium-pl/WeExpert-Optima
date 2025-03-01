import mysql, { Connection, ConnectionOptions } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Funkcja do tworzenia połączenia z bazą danych
export async function createConnection(config?: ConnectionOptions): Promise<Connection | null> {
    let connection: Connection | null = null;
    try {
        connection = await mysql.createConnection(config || {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,
        });

        return connection;
    } catch (error) {
        console.error("❌ Błąd podczas łączenia z bazą danych:", error);
        if (connection) {
            await connection.end();
        }
        return null;
    }
}

// Funkcja sprawdzająca, czy dokument istnieje w tabeli DokDefinicje
export async function extractUmwIrid(
    documentDefinition: string,
    dbConfig: ConnectionOptions
): Promise<{ importRowId: number | null, importRowId2: number | null } | null> {
    console.log(`🔍 Szukam dokumentu: "${documentDefinition}" w tabeli DokDefinicje...`);

    const connection = await createConnection(dbConfig);
    if (!connection) {
        console.log("❌ Nie udało się nawiązać połączenia z bazą.");
        return null;
    }

    try {
        console.log("📡 Wysyłam zapytanie SQL...");
        const [rows]: any = await connection.execute(
            `
            SELECT DDf_ImportRowId, DDf_ImportRowId2
            FROM DokDefinicje
            WHERE DDf_Nazwa = ?;
            `,
            [documentDefinition]
        );

        console.log("📄 Wynik zapytania:", rows);

        if (rows.length > 0) {
            return {
                importRowId: rows[0].DDf_ImportRowId,
                importRowId2: rows[0].DDf_ImportRowId2,
            };
        } else {
            console.log("❌ Brak wyników dla podanej nazwy dokumentu.");
            return null;
        }
    } catch (error) {
        console.error("❌ Błąd podczas sprawdzania dokumentu:", error);
        return null;
    } finally {
        await connection.end();
        console.log("🔌 Połączenie zamknięte.");
    }
}

// Funkcja sprawdzająca, czy dokument istnieje w tabeli TypWypłata
export async function extractUmwTwpIrid(
    contractType: string,
    dbConfig: ConnectionOptions
): Promise<{ importRowId: string | null, importRowId2: string | null } | null> {
    console.log(`🔍 Szukam wpisu: "${contractType}" w tabeli TypWypłata...`);

    const connection = await createConnection(dbConfig);
    if (!connection) {
        console.log("❌ Nie udało się nawiązać połączenia z bazą.");
        return null;
    }

    try {
        console.log("📡 Wysyłam zapytanie SQL...");
        const [rows]: any = await connection.execute(
            `
            SELECT TWP_ImportRowId, TWP_ImportRowId2
            FROM TypWyplata
            WHERE TWP_Nazwa = ?;
            `,
            [contractType]
        );

        console.log("📄 Wynik zapytania:", rows);

        if (rows.length > 0) {
            return {
                importRowId: rows[0].TWP_ImportRowId,
                importRowId2: rows[0].TWP_ImportRowId2,
            };
        } else {
            console.log("❌ Brak wyników dla podanej nazwy wpisu.");
            return null;
        }
    } catch (error) {
        console.error("❌ Błąd podczas sprawdzania wpisu:", error);
        return null;
    } finally {
        await connection.end();
        console.log("🔌 Połączenie zamknięte.");
    }
}

// Główna funkcja programu (do usunięcia po zaprezentowaniu)
async function main() {
    console.log("🚀 Start programu...");

    // Sprawdzenie połączenia
    const connection = await createConnection();
    if (!connection) {
        console.log("❌ Nie udało się nawiązać połączenia z bazą.");
        return;
    }
    console.log("✅ Połączenie z bazą zostało nawiązane!");

    // Sprawdzenie dokumentu "Umowa"
    const documentName = "Umowa";
    console.log(`🔍 Sprawdzam dokument: "${documentName}"`);

    const docResult = await extractUmwIrid(documentName, {
        host: process.env.DB_HOST as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
        port: Number(process.env.DB_PORT) || 3306,
    });

    if (docResult) {
        console.log(`✅ Dokument "${documentName}" istnieje!`);
        console.log(`📌 DDf_ImportRowId: ${docResult.importRowId}`);
        console.log(`📌 DDf_ImportRowId2: ${docResult.importRowId2}`);
    } else {
        console.log(`❌ Dokument "${documentName}" nie istnieje w bazie.`);
    }

    // Sprawdzenie wpisu "PIT-8B  6.Umowa o dzieło 20%" w TypWypłata
    const paymentType = "PIT-8B  6.Umowa o dzieło 20%";
    console.log(`🔍 Sprawdzam wpis: "${paymentType}" w TypWypłata`);

    const twpResult = await extractUmwTwpIrid(paymentType, {
        host: process.env.DB_HOST as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
        port: Number(process.env.DB_PORT) || 3306,
    });

    if (twpResult) {
        console.log(`✅ Wpis "${paymentType}" istnieje!`);
        console.log(`📌 TWP_ImportRowId: ${twpResult.importRowId}`);
        console.log(`📌 TWP_ImportRowId2: ${twpResult.importRowId2}`);
    } else {
        console.log(`❌ Wpis "${paymentType}" nie istnieje w bazie.`);
    }
}

// Uruchomienie funkcji main()
main();
