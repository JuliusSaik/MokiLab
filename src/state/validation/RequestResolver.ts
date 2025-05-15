import * as yup from "yup";

export const promptSchema = yup.object().shape({
  subject: yup.string().required("Pamoka yra privaloma"),
  grade: yup
    .number()
    .required("Klasė yra privaloma")
    .positive("Klasė turi būti teigiama")
    .integer("Klasė turi būti sveikasis skaičius"),
  topic: yup.string().required("Tema yra privaloma"),
  difficulty: yup.string().required("Sudėtingumas yra privalomas"),
  extraPrompt: yup.string().required("Detali temos užklausa yra privaloma"),
});
