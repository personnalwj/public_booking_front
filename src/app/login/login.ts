import { signIn } from "supertokens-web-js/recipe/emailpassword";

async function signInClicked(
  email: string,
  password: string
): Promise<string[]> {
  const errors: string[] = [];
  try {
    let response = await signIn({
      formFields: [
        {
          id: "email",
          value: email,
        },
        {
          id: "password",
          value: password,
        },
      ],
    });
    if (response.status === "WRONG_CREDENTIALS_ERROR") {
      errors.push("la combinaison email/mot de passe est incorrect.");
    } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
      errors.push(response.reason);
    } else {
      return errors;
    }
    return errors;
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
        errors.push(err.message);
        return errors;
    } else {
        errors.push("Une erreur s'est produite, veuillez réessayez plus tard.");
        return errors;
    }
  }
}

export default signInClicked;
