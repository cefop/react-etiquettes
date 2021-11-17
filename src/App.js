import { useLocation } from "react-router-dom";
import Label from "./components/Label";

function App() {
  const search = useLocation().search;
  const recipe_id = new URLSearchParams(search).get("fingerprint");
  // console.log("ID de la recette: ", recipe_id);
  return <Label recipe_id={recipe_id} />;
}
export default App;
