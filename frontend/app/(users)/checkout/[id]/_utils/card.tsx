import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcDinersClub,
  FaCcJcb,
  FaCcStripe,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface CardInfo {
  brand: string;
  icon: IconType | null;
  backendBrand: string | null;
}

export const validateCardNumber = (numeroCartao: string): CardInfo => {
  const cleanedCardNumber = numeroCartao.replace(/\D/g, "");

  const patterns: { [key: string]: RegExp } = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^(5[1-5][0-9]{14}|2221[0-9]{12}|222[2-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12})$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    elo: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
    hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
  };

  const cardIcons: { [key: string]: IconType } = {
    visa: FaCcVisa,
    mastercard: FaCcMastercard,
    amex: FaCcAmex,
    discover: FaCcDiscover,
    diners: FaCcDinersClub,
    jcb: FaCcJcb,
    elo: FaCcStripe,
    hipercard: FaCcStripe,
  };

  const backendBrands: { [key: string]: string } = {
    visa: "pm_card_visa",
    mastercard: "pm_card_mastercard",
    amex: "pm_card_amex",
    discover: "pm_card_discover",
    diners: "pm_card_diners",
    jcb: "pm_card_jcb",
    elo: "pm_card_stripe",
    hipercard: "pm_card_stripe",
  };
  
  for (const [bandeira, regex] of Object.entries(patterns)) {
    if (regex.test(cleanedCardNumber)) {
      return { brand: bandeira, icon: cardIcons[bandeira], backendBrand: backendBrands[bandeira] };
    }
  }
  
  return { brand: 'cartao inválido', icon: null, backendBrand: null };
};

export const formatCardNumber = (value: string): string => {
  if (!value) return "";
  const cleanedValue = value.replace(/\D/g, "");
  const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(" ") || "";
  return formattedValue.substring(0, 19);
};

export const formatCardExpiry = (value: string): string => {
  if (!value) return "";
  const cleanedValue = value.replace(/\D/g, "");
  if (cleanedValue.length > 2) {
    return `${cleanedValue.substring(0, 2)} / ${cleanedValue.substring(2, 4)}`;
  }
  return cleanedValue;
};

export const formatCardCvc = (value: string): string => {
  if (!value) return "";
  const cleanedValue = value.replace(/\D/g, "");
  return cleanedValue.substring(0, 4);
};
