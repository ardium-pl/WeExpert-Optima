import { createCDATA, PRACOWNIK } from './typescript_type';
import { v4 as uuidv4 } from 'uuid'; // Import funkcji uuid

function testPracownik() {
    // Generowanie unikalnego PRA_IRID
    const another_pra_irid = createCDATA(uuidv4().toUpperCase());

    const pracownik: PRACOWNIK = {
        PRA_IRID: another_pra_irid,
        PRA_KOD: createCDATA("KOD1"),
        PRA_ARCHIWALNY: "Nie",
        PRA_NADRZEDNY: 'Nie',
        PRACOWNIK_EXT_ETATY: {
            PRACOWNIK_EXT_ETAT: []
        },
        UMOWY: {
            UMOWA: []
        },
        PRACOWNIK_EXT_IDX_GROUP: {
            PRACOWNIK_EXT_IDX: []
        }
    };

    console.log("PRA_IRID:", pracownik.PRA_IRID.value); // Wyświetli unikalne ID
    console.log("PRA_IRID XML:", pracownik.PRA_IRID.toXML()); // Wyświetli <![CDATA[UNIKALNE-ID]]>

    console.log("PRA_KOD:", pracownik.PRA_KOD.value); // Wyświetli: KOD1
    console.log("PRA_KOD XML:", pracownik.PRA_KOD.toXML()); // Wyświetli <![CDATA[KOD1]]>

    console.log("PRA_ARCHIWALNY:", pracownik.PRA_ARCHIWALNY); // Wyświetli: Nie
}

testPracownik();
