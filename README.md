# React étiquette

> Tool to generate label from Bobble Mix recipe
> Levrage with [React-pdf](https://react-pdf.org/)


## Usage

> in developement you should use Hasura and make the Query [fetchRecipeFingerprint](https://github.com/cefop/BobbleMixNextJs/blob/5dcd6889b6ee509275c1acf973a75d8cffe63ae2/frontend/components/gql/graphql.js#L78) a REST API.

> It can detect queries parameters from url `http://localhost:3000/?fingerprint=NTAlLUFicmljb3QgLyA1MCUtQ29jby1EcmVhbQ==` to fill the input, just click on `Générer le pdf` and then `Télécharger le Pdf`

> Remove any queries inside the url `?fingerprint=NTAlLUFicmljb3QgLyA1MCUtQ29jby1EcmVhbQ==` Then Copy the recipe ID given on the recipe info page of [bobblemix.com](https://bobblemixfrontend.vercel.app/)