/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import _ from "lodash";
import { add, format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  recipeContainer: {
    backgroundColor: "#ffffff",
    display: "grid",
    padding: 5,
  },
  recipeDetails: {
    display: "grid",
    textAlign: "left",
  },
  kind: {
    fontSize: 18,
    marginBottom: 2,
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: 1300,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  recipeSubTitle: {
    fontSize: 24,
    fontWeight: "extrabold",
    textTransform: "lowercase",
    marginBottom: 15,
  },
  recipeOverview: {
    fontSize: 22,
    //whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
    //wordWarp: "unset",
    //wordWrap: "break-word",
    overflow: "unset",
    overflowWrap: "unset",
    hyphens: "none",
  },
  image: {
    height: 82,
    width: 82,
  },
  image_att: {
    height: 175,
    width: 175,
  },
  overviewContainer: {
    textAlign: "left",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
  },
  overviewPicto: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  boldOverview: {
    fontWeight: "bold",
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "column",
  },
  madein: {
    justifyContent: "space-around",
    alignContent: "flex-end",
    marginTop: 16,
    fontSize: 18,
    fontWeight: 700,
  },
});

export function PdfDocument(props) {
  const { sanitizeList, mixRisk, name, shop_name } = props;
  // console.log("props sanitizeList", sanitizeList);
  // console.log("props mixRisk", mixRisk);
  // console.log("props name", name);

  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

  const now = new Date();
  const nowadd6month = add(new Date(), {
    months: 6,
  });

  const [isH317, setIsH317] = useState({ arr: [], sum: null, b: false });
  const [isH317_1, setIsH317_1] = useState({ arr: "", sum: null, b: false });
  const [isH317_1A, setIsH317_1A] = useState({
    arr: "",
    sum: null,
    b: false,
  });
  const [isH317_1B, setIsH317_1B] = useState({
    arr: "",
    sum: null,
    b: false,
  });
  const [isH410, setIsH410] = useState({ arr: "", sum: null, b: false });
  const [isH411, setIsH411] = useState({ arr: "", sum: null, b: false });
  const [isH412, setIsH412] = useState({
    arr: "",
    sum: null,
    sum2: null,
    b: false,
  });
  const [isH413, setIsH413] = useState({ arr: "", sum: null, b: false });
  const [isH226, setIsH226] = useState({ arr: "", sum: null, b: false });
  const [isH319, setIsH319] = useState({ arr: "", sum: null, b: false });
  const [isEUH208A, setIsEUH208A] = useState({
    arr: "",
    sum: null,
    b: false,
  });
  const [isEUH208B, setIsEUH208B] = useState({
    arr: "",
    sum: null,
    b: false,
  });
  const [isEUH208C, setIsEUH208C] = useState({
    arr: "",
    sum: null,
    b: false,
  });

  // ? function to filter by risks the mol of the recipe
  const FilterByMolRisk = (risk) => {
    let newArr = [];
    //  Filter specifique risks
    const fsr = _.filter(mixRisk, function (i, k) {
      return i.Clas_ID === risk;
    });
    //  add the molecule mod_retenuAdd
    fsr.map((i, k) => {
      const mm = _.filter(sanitizeList, { Molecule_ID: i.Molecule_ID });
      newArr = [mm[0], ...newArr];
      return mm;
    });
    return newArr;
  };

  // ? function that return the data when ready for futur use
  const findRisk = async (risk) => {
    // console.log(`get the risks ${risk}`);
    const [allmol, sum] = await Promise.all([
      // get the risks
      FilterByMolRisk(risk),
      // sorting them
      FilterByMolRisk(risk).reduce((acc, curr) => acc + curr.mod_retenuAdd, 0),
    ]);
    return { allmol, sum };
  };

  // ? return bool and array of data of mols that meet a trigger condition
  const sortedTiggeredMols = (array, trigger) => {
    // format or merged array of mol with this risks
    const mergedArr = [...new Set(array.allmol.flat())];
    // check if condition is meet
    const bool = mergedArr
      .map((i) => (i.mod_retenuAdd >= trigger ? true : false))
      .includes(true);
    // check all molecules with this condition and if so push them into an array
    let newArr = [];
    const molsTriggered = mergedArr.map((i) => {
      if (i.mod_retenuAdd >= trigger) newArr = [i, ...newArr];
      return newArr;
    });
    return { b: bool, arr: molsTriggered };
  };

  //  ! True Hazard
  useEffect(() => {
    findRisk("H317-1A").then(
      (result) => {
        const x = sortedTiggeredMols(result, 0.1);
        setIsH317_1A({
          arr: x.arr !== undefined && [...new Set(x.arr.flat())],
          b: x.b,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );

    findRisk("H317-1").then(
      (result) => {
        const x = sortedTiggeredMols(result, 1);
        setIsH317_1({
          arr: x.arr !== undefined && [...new Set(x.arr.flat())],
          b: x.b,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );

    findRisk("H317-1B").then(
      (result) => {
        const x = sortedTiggeredMols(result, 1);
        setIsH317_1B({
          arr: x.arr !== undefined && [...new Set(x.arr.flat())],
          b: x.b,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );

    findRisk("H410").then(
      (result) => {
        setIsH410({
          arr: result.allmol,
          b: false,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );

    findRisk("H411").then(
      (result) => {
        setIsH411({
          arr: result.allmol,
          b: false,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );

    findRisk("H412").then(
      (result) => {
        setIsH412({
          arr: result.allmol,
          b: false,
          sum: result.sum,
          sum2: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );

    findRisk("H413").then(
      (result) => {
        setIsH413({
          arr: result.allmol,
          b: false,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );

    findRisk("H226").then(
      (result) => {
        setIsH226({
          arr: result.allmol,
          b: false,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );

    findRisk("H319").then(
      (result) => {
        setIsH319({
          arr: result.allmol,
          b: false,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  }, []);

  useEffect(() => {
    findRisk("H317-1A").then(
      (result) => {
        const x = sortedTiggeredMols(result, 0.01);
        setIsEUH208A({
          arr: x.arr !== undefined && [...new Set(x.arr.flat())],
          b: x.b,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  }, [isH317_1A]);

  useEffect(() => {
    findRisk("H317-1B").then(
      (result) => {
        const x = sortedTiggeredMols(result, 0.1);
        setIsEUH208B({
          arr: x.arr !== undefined && [...new Set(x.arr.flat())],
          b: x.b,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  }, [isH317_1B]);

  useEffect(() => {
    findRisk("H317-1").then(
      (result) => {
        const x = sortedTiggeredMols(result, 0.1);
        setIsEUH208C({
          arr: x.arr !== undefined && [...new Set(x.arr.flat())],
          b: x.b,
          sum: result.sum,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  }, [isH317_1]);

  // * final check for is H317
  useEffect(() => {
    //  condion H317 si une molecule H317_1A a une retenu sup a 0.1%  (0.001)
    const mergedArr = [...new Set([isH317_1A.arr, isH317_1.arr].flat())];
    const h3171A = mergedArr
      .map((i, k) => (i.mod_retenuAdd > 0.1 ? true : false))
      .includes(true);
    //  condion H317 si une molecule H317_1B et H317_1 a une retenu sup a 1% (0.01)
    // H317_1B and H317_1 have same condition so merged the arr
    const mergedArrs = [...new Set([isH317_1B.arr, isH317_1.arr].flat())];
    const h317_1B_h317_1 = mergedArrs
      .map((i, k) => (i.mod_retenuAdd > 1 ? true : false))
      .includes(true);

    h3171A === true || h317_1B_h317_1 === true
      ? setIsH317({
          arr: null,
          b: true,
          sum: null,
        })
      : setIsH317({
          arr: null,
          b: false,
          sum: null,
        });
  }, [isH317_1A, isH317_1B, isH317_1]);

  //  * final check for is H412
  const checkH411And410 = async () => {
    const res =
      (await isH410.sum) * 100 + (await isH411.sum) * 10 + (await isH412.sum);
    setIsH412({
      ...isH412,
      arr: isH412.arr,
      b: (await res) >= 25,
      sum: await res,
    });
  };

  useEffect(() => {
    checkH411And410();
    // console.log(` SUM H412: ${await isH410.sum}*100 + ${await isH411.sum}*10 + ${await isH412.sum}`);
  }, [isH411, isH410]);

  // * final check for is H413
  const checkH413 = async () => {
    if (isH412.b === false) {
      // const sumh411 = (await isH410.sum) * 10 + (await isH411.sum);
      const res =
        (await isH410.sum) +
        (await isH411.sum) +
        (await isH412.sum2) +
        (await isH413.sum);
      // console.log(
      //     ` SUM H413: ${await isH410.sum} + ${await isH411.sum} + ${await isH412.sum2} + ${await isH413.sum}`
      // );
      setIsH413({
        arr: isH413.arr,
        b: (await res) >= 25,
        sum: await res,
      });
    }
  };

  useEffect(() => {
    checkH413();
  }, [isH412.sum]);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.recipeContainer}>
          <View style={styles.recipeDetails}>
            <Text style={styles.recipeTitle}>bobble mix</Text>
            {/* // ? Check if name is okay  */}
            <Text style={styles.kind}>E-Liquide</Text>
            {name ? (
              <Text style={styles.recipeSubTitle}>{name}</Text>
            ) : (
              <Text style={styles.recipeSubTitle}>-</Text>
            )}
            <View style={styles.overviewContainer}>
              <Text style={styles.recipeOverview}>
                Volume : 40ml / Ratio PG/VG : 50/50
              </Text>
              <Text style={styles.recipeOverview}>
                Ingr??dients : Propyl??ne Glycol, Glyc??rine V??g??tale, Ar??mes
              </Text>
            </View>

            {isEUH208A.b || isEUH208B.b || isEUH208C.b ? (
              <View style={styles.overviewContainer}>
                {/* // ? check conditions to show molecules */}
                <Text style={styles.recipeOverview}>
                  Contient :
                  {isEUH208A.arr.length > 0 &&
                    isEUH208A.arr.map((i, k, arr) => (
                      <i key={k}>
                        {i.Molecule} ({i.Molecule_ID})
                        {arr.length - 1 === k && !isEUH208B.b && !isEUH208C.b
                          ? ". "
                          : ", "}
                      </i>
                    ))}
                  {isEUH208B.arr.length > 0 &&
                    isEUH208B.arr.map((i, k, arr) => (
                      <i key={k}>
                        {i.Molecule} ({i.Molecule_ID})
                        {arr.length - 1 === k && !isEUH208C.b ? ". " : ", "}
                      </i>
                    ))}
                  {isEUH208C.arr.length > 0 &&
                    isEUH208C.arr.map((i, k, arr) => (
                      <i key={k}>
                        {i.Molecule} ({i.Molecule_ID})
                        {arr.length - 1 === k ? ". " : ", "}
                      </i>
                    ))}
                  <i> Peut produire une r??action allergique.</i>
                </Text>
              </View>
            ) : null}
            <View style={styles.overviewContainer}>
              <Text style={styles.recipeOverview}>
                DDM : {format(nowadd6month, "dd.MM.yyyy", {})}
              </Text>
              <Text style={styles.recipeOverview}>
                N?? de lot : {format(now, "yyyyMMddHHmmss", {})}
              </Text>
            </View>
            <View style={styles.overviewPicto}>
              <Image
                style={styles.image}
                alt="recycling"
                source="https://res.cloudinary.com/dagmffgu0/image/upload/v1630925429/icone_bobble_mix/recycle_f617gc.png"
              />
              <Image
                style={styles.image}
                alt="adult"
                source="https://res.cloudinary.com/dagmffgu0/image/upload/v1630925429/icone_bobble_mix/-18_xt2qpo.png"
              />
              <Image
                style={styles.image}
                alt="pregnant"
                source="https://res.cloudinary.com/dagmffgu0/image/upload/v1630925429/icone_bobble_mix/femme_enceinte_d9a5iy.png"
              />
              {/* // ? check if we must show attention picto  */}
              {isH317.b && (
                <Image
                  style={styles.image_att}
                  alt="attention"
                  source="https://res.cloudinary.com/dagmffgu0/image/upload/v1630926475/icone_bobble_mix/attention_hyp4mu.png"
                />
              )}
            </View>
            <View style={styles.overviewContainer}>
              <Text style={styles.recipeOverview}>
                {/* // ? show notices  */}
                Pr??cautions d'emploi :{/* Cas1, m??lange non class??: */}
                {!isH317.b &&
                  !isH226.b &&
                  !isH412.b &&
                  !isH413.b &&
                  " En cas de consultation d'un m??decin, garder ?? disposition le r??cipient ou l'??tiquette Tenir hors de port??e des enfants. Se laver les mains soigneusement apr??s manipulation"}
                {/*  Cas2, m??lange class?? que H317  */}
                {isH317.b &&
                  !isH412.b &&
                  !isH413.b &&
                  " Peut provoquer une allergie cutan??e. En cas de consultation d???un m??decin, garder ?? disposition le r??cipient ou l?????tiquette. Tenir hors de port??e des enfants. Ne pas manger, boire ou fumer en manipulant ce produit. En cas de contact avec la peau : laver abondamment ?? l???eau et au savon. ??liminer le contenu dans un centre de traitement agr????."}
                {/* Cas4, m??lange class?? que H412 */}
                {isH412.b &&
                  !isH317.b &&
                  " Nocif pour les organismes aquatiques. entra??ne des effets n??fastes ?? long terme. En cas de consultation d???un m??decin, garder ?? disposition le r??cipient ou l?????tiquette. Tenir hors de port??e des enfants. Ne pas manger, boire, ou fumer en manipulant ce produit. Se laver les mains soigneusement apr??s manipulation. ??liminer le contenu dans un centre de traitement agr????."}
                {/* Cas5, m??lange class?? H413 */}
                {isH413.b &&
                  !isH317 &&
                  " Peut ??tre nocif ?? long terme pour les organismes aquatiques. En cas de consultation d???un m??decin, garder ?? disposition le r??cipient ou l?????tiquette. Tenir hors de port??e des enfants. Ne pas manger, boire, ou fumer en manipulant ce produit. Se laver les mains soigneusement apr??s manipulation."}
                {/* Cas6, m??lange class?? H317 + H412 */}
                {isH317.b &&
                  isH412.b &&
                  " Peut provoquer une allergie cutan??e. Nocif pour les organismes aquatiques. En cas de consultation d???un m??decin, garder ?? disposition le r??cipient ou l?????tiquette. Tenir hors de port??e des enfants. Ne pas manger, boire ou fumer en manipulant ce produit. En cas de contact avec la peau : laver abondamment ?? l???eau et au savon. ??liminer le contenu dans un centre de traitement agr????."}
                {/* Cas7, m??lange class?? H317 + H413 */}
                {isH317.b &&
                  isH413.b &&
                  " Peut provoquer une allergie cutan??e. Peut ??tre nocif ?? long terme pour les organismes aquatiques. En cas de consultation d???un m??decin, garder ?? disposition le r??cipient ou l?????tiquette. Tenir hors de port??e des enfants. Ne pas manger, boire ou fumer en manipulant ce produit. En cas de contact avec la peau : laver abondamment ?? l???eau et au savon. ??liminer le contenu dans un centre de traitement agr????."}
              </Text>
            </View>
            <View style={styles.detailsFooter}>
              <Text style={styles.madein}>Fabriqu?? en FRANCE par CEFOP</Text>
              <Text>
                7 Rue du 8 Mai 1945 94470 Boissy-St T??l. 01 84 69 00 30
                contact@bobbleliquide.com www.bobbleliquide.com. Mix?? et
                conditionn?? par {capitalize(shop_name)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
