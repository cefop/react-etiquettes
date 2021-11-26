import { useLocation } from "react-router-dom";
import Label from "./components/Label";
import Social from "./components/Social";

function App() {
  const search = useLocation().search;
  const recipe_id = new URLSearchParams(search).get("fingerprint");
  // console.log("ID de la recette: ", recipe_id);
  return (
    <>
      <Label recipe_id={recipe_id} />
      <Social />
    </>
  );
}
export default App;
