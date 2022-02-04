import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "./GenLabel";
import {
  Button,
  Input,
  InputBlock,
  Title,
  LabelInput,
  Logo,
  SubTitle,
} from "./LabelStyled";
import { infosFromFingerprint } from "./libs/infoFromFingerprint";
import { sanitizedList } from "./libs/sanitizedList";

const Label = (props) => {
  const { recipe_id, rid, shop_name, shop_id } = props;
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [newFingerprint, setNewFingerprint] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [snl, setSnl] = useState([]);
  const [show, setShow] = useState(false);
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/rest/label"
      : process.env.REACT_APP_API_URL;

  const hasuraEndpoint =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/v1/graphql"
      : process.env.REACT_APP_HASURA_ENDPOINT;

  const hasuraAdminSec =
    process.env.NODE_ENV === "development"
      ? "hasuraadminpassword"
      : process.env.REACT_APP_HASURA_ADMIN_SECRET;

  useEffect(() => {
    if (recipe_id) {
      setNewFingerprint(recipe_id);
    }
  }, [recipe_id]);

  const fetchRecipe = async () => {
    try {
      let res = await Axios(`${url}/${newFingerprint}`);
      setRecipeDetails(res.data.recipes[0]);
      const ar = infosFromFingerprint(newFingerprint);
      const sl = sanitizedList(res.data.recipes[0], ar);
      setSnl(sl);
      setShow(res.data.recipes.length > 0 ? true : false);
    } catch (error) {
      console.log(error);
    }
  };

  const mutationRecipe = async (user_phone) => {
    const validated = user_phone.length > 4 ? true : false;
    try {
      const data = await Axios.post(
        hasuraEndpoint,
        {
          query: `mutation MyMutation($recipe_id: uuid, $shop_id: uuid, $user_phone: String, $validated: Boolean) {
            insert_transactions_one(object: {recipe_id: $recipe_id, shop_id: $shop_id, user_phone: $user_phone, validated: $validated}) {
              id
            }
          }
          `,
          variables: {
            recipe_id: rid,
            shop_id,
            user_phone,
            validated,
          },
        },
        {
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": hasuraAdminSec,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InputBlock>
      <Logo>
        <img
          src="https://res.cloudinary.com/dagmffgu0/image/upload/v1632390513/bobble_mix_assets/logos/logo_bobble_liquide_128px_kxhmkv.png"
          alt="logo bobble"
        />
      </Logo>
      <Title>générateur d'étiquettes depuis la recette</Title>
      <SubTitle>
        Nouvelle transaction pour {shop_name}
        <br />
        Cliquer sur le bouton Générer le pdf puis veuillez le télécharger
      </SubTitle>

      {/* user phone  */}
      <LabelInput htmlFor="userPhone">
        Téléphone du client (pas obligatoire)
      </LabelInput>
      <Input
        name="userPhone"
        value={userPhone}
        placeholder="0601020304"
        disabled={show}
        onChange={(e) => setUserPhone(e.target.value)}
      />

      {/* recette ID  */}
      <LabelInput htmlFor="recetteID">Recette ID</LabelInput>
      <Input
        name="recetteID"
        value={!recipe_id ? newFingerprint : recipe_id}
        placeholder="ID de la recette"
        onChange={(e) => setNewFingerprint(e.target.value)}
      />
      <Button
        onClick={async () => {
          await mutationRecipe(userPhone);
          await fetchRecipe();
        }}
      >
        Générer le pdf
      </Button>

      {show && (
        <PDFDownloadLink
          document={
            <PdfDocument
              sanitizeList={snl}
              mixRisk={recipeDetails.risks}
              name={recipeDetails.name}
              shop_name={shop_name}
            />
          }
          fileName={`bobblemix-${recipeDetails.name}.pdf`}
          className="download"
        >
          {({ blob, url, loading, error }) =>
            !error && loading ? "Chargement..." : "Télécharger le Pdf"
          }
        </PDFDownloadLink>
      )}
    </InputBlock>
  );
};

export default Label;
