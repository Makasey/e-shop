export interface CardValidation {
  type: CardBrandEnum;
  patterns: number[];
  mask: any;
  format: RegExp;
  length: number[];
  cvvLength: number[];
  luhn: boolean;
}

export enum CardBrandEnum {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMERICANEXPRESS = 'AMERICANEXPRESS',
  DISCOVER = 'DISCOVER',
  DINERSCLUB = 'DINERSCLUB',
  JCB = 'JCB',
  MAESTRO = 'MAESTRO',
  UNIONPAY = 'UNIONPAY',
  DANKORT = 'DANKORT',
  FORBRUGSFORENINGEN = 'FORBRUGSFORENINGEN',
}
