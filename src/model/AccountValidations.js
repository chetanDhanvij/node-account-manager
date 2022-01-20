import { iso4217 } from "../data/iso4217.js"


export const validateAccountNumber = (accountNumber) => {
    return validateAccountNumberMod11(accountNumber);
}

export const validateAccountNumberMod11 = (accountNumber) => {
    const  weights  =  [ 5 ,  4 ,  3 ,  2 ,  7 ,  6 ,  5 ,  4 ,  3 ,  2 ];
    const  accountNumberWithoutSpacesAndPeriods  =  accountNumber . replace ( /[\s.]+/g ,  '' );
    if  ( accountNumberWithoutSpacesAndPeriods.length  !==  11 )  {
      return  false ;
    }  else  {
      const  checkdigit  =  parseInt ( accountNumberWithoutSpacesAndPeriods . charAt ( 10 ),  10 );
      const  accountNumberOutCheckdigit  =  accountNumberWithoutSpacesAndPeriods . substring ( 0 ,  10 );
      let  sum  =  0 ;
      for  ( let  index  =  0 ;  index  <  10 ;  index ++ ) {
        sum  +=  parseInt ( accountNumberOutCheckdigit.charAt ( index ),  10 )  *  weights [ index ];
      }
      const  remainder  =  sum  %  11 ;
      return  checkdigit  ===  ( remainder  ===  0  ?  0:11  -  remainder  ) ;  }
}

export const validateAccountType = (accountType) => {
    return ["SAVING", "CHECKING"].includes(accountType);
}

export const validateCurrency = (currency) => {
    return iso4217.includes(currency);
}

export const validateAccount = (account) => {
    return validateAccountNumber(account.accountNumber) &&
           validateAccountType(account.accountType) &&
           validateCurrency(account.currency);
}