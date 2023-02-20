import "react-i18next";
import pt from "./pt.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    // defaultNS: typeof defaultNS;
    resources: typeof pt;
  }
}
