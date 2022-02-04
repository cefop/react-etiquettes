import { useLocation } from "react-router-dom";
import Label from "./components/Label";
import Social from "./components/Social";

function App() {
  const search = useLocation().search;
  const recipe_id = new URLSearchParams(search).get("fingerprint");
  // console.log("ID de la recette: ", recipe_id);
  const shop_name = new URLSearchParams(search).get("shop");
  // console.log("shop", shop_name);
  const shop_id = new URLSearchParams(search).get("shopid");
  // console.log("shop", shop_name);
  const rid = new URLSearchParams(search).get("rid");
  // console.log("shop", shop_name);

  return (
    <>
      <Label
        recipe_id={recipe_id}
        shop_name={shop_name}
        shop_id={shop_id}
        rid={rid}
      />
      <Social />
    </>
  );
}
export default App;
