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
  count: yup
    .number()
    .required("Uždavinių kiekis yra privalomas")
    .min(1, "Mažiausiai 1 uždavinys")
    .max(50, "Daugiausiai 10 uždavinių"),
  extraPrompt: yup.string().required("Detali temos užklausa yra privaloma"),
});
