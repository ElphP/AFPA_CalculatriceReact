import "./ClavierCalcul.css";
import Touche from "../Touche/Touche";
import Resultat from "../Resultat/Resultat";
import { useState } from "react";

function ClavierCalcul() {
    const [dataAffich, setdataAffich] = useState("");

    // function passed to the child with attribute component
    const childToParent = (valeur) => {
        switch (valeur) {
            case "sup":
                setdataAffich((dataChg) =>
                    dataChg.substring(0, dataChg.length - 1)
                );
                break;
            case "del":
                setdataAffich((dataChg) => dataChg.substring(dataChg.length));
                break;
            case "=":
                
                setdataAffich((dataChg) =>dataChg + valeur + calcul(dataChg)[0])
                break;
            default:
                setdataAffich((dataChg) => dataChg + valeur);
                break;
        }
    };
// fonction calcul appelée par le click du bouton "="
    function calcul(string) {
        let tabCalcul = [];
        let regex = /^([0-9\.]+[\/+\-*])+[0-9\.]+$/;
        let regexNbr = /^[0-9\.]+/;
        let regexOp = /^[+\-*\/]/;
        if (!regex.test(string)) {
            setdataAffich("error");
        } else {
            // transformation de la chaine en tableau
            while (string.length !== 0) {
                regexNbr.test(string)
                    ? tabCalcul.push(string.match(regexNbr)[0])
                    : tabCalcul.push(string.match(regexOp)[0]);

                string = string.slice(tabCalcul[tabCalcul.length - 1].length);
            }
        }
        //      Calcul => priorité sur les multiplications et divisions
        if (tabCalcul.includes("*") || tabCalcul.includes("/")) {
            for (let i = 0; i < tabCalcul.length; i++) {
                if (tabCalcul[i] === "*") {
                    tabCalcul[i - 1] =
                        Number(tabCalcul[i - 1]) * Number(tabCalcul[i + 1]);
                    tabCalcul.splice(i, 2);
                    i--;
                }

                if (tabCalcul[i] === "/") {
                    tabCalcul[i - 1] =
                        Number(tabCalcul[i - 1]) / Number(tabCalcul[i + 1]);
                    tabCalcul.splice(i, 2);
                    i--;
                }
            }
        }
        //additions et soustractions
        for (let i = 0; i < tabCalcul.length; i++) {
            if (tabCalcul[i] === "+") {
                tabCalcul[i - 1] = Number(tabCalcul[i - 1]) + Number(tabCalcul[i + 1]);
                 tabCalcul.splice(i, 2);
                i--;
            }
            if (tabCalcul[i] === "-") {
                tabCalcul[i - 1] =
                    Number(tabCalcul[i - 1]) - Number(tabCalcul[i + 1]);
                tabCalcul.splice(i, 2);
                i--;
            }
        }
        return tabCalcul
    }

    return (
        <div className="calculette"
        >
            <Resultat>{dataAffich}</Resultat>
            <div className="clavier">
                <div>
                    <Touche childToParent={childToParent} value="1">
                        1
                    </Touche>
                    <Touche childToParent={childToParent} value="2">
                        2
                    </Touche>
                    <Touche childToParent={childToParent} value="3">
                        3
                    </Touche>
                    <Touche childToParent={childToParent} value="/">
                        /
                    </Touche>
                </div>

                <div>
                    <Touche childToParent={childToParent} value="4">
                        4
                    </Touche>
                    <Touche childToParent={childToParent} value="5">
                        5
                    </Touche>
                    <Touche childToParent={childToParent} value="6">
                        6
                    </Touche>
                    <Touche childToParent={childToParent} value="*">
                        x
                    </Touche>
                </div>

                <div>
                    <Touche childToParent={childToParent} value="7">
                        7
                    </Touche>
                    <Touche childToParent={childToParent} value="8">
                        8
                    </Touche>
                    <Touche childToParent={childToParent} value="9">
                        9
                    </Touche>
                    <Touche childToParent={childToParent} value="-">
                        -
                    </Touche>
                </div>

                <div>
                    <Touche childToParent={childToParent} value="sup">
                        Suppr
                    </Touche>
                    <Touche childToParent={childToParent} value="0">
                        0
                    </Touche>
                    <Touche childToParent={childToParent} value=".">
                        .
                    </Touche>
                    <Touche childToParent={childToParent} value="+">
                        +
                    </Touche>
                </div>

                <div>
                    <Touche
                        childToParent={childToParent}
                        value="del"
                        className="btnDel"
                    >
                        Delete
                    </Touche>
                    <Touche childToParent={childToParent} value="=">
                        =
                    </Touche>
                </div>
            </div>
        </div>
    );
}

export default ClavierCalcul;
