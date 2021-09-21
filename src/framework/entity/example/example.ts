export default ()=>{
    return {
        CalculateTaxFee: (fullAmount: number, taxFee: number)=>{
            return fullAmount * (taxFee / 100);
        },
        CalculatePriceIncTaxFee(fullAmount: number, taxFee: number){
            return fullAmount + (this.CalculateTaxFee(fullAmount, taxFee));
        }
    }
}