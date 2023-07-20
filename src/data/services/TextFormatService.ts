const CurrencyFormatter = new Intl.NumberFormat('en-US', {
    style:'currency',
    currency: 'USD'
});

export const TextFormatService = {

    currency(value: string | undefined | number): string{
        if(!value){
            return ""
        }

        let price: number = +value!;

        if(isNaN(price)){
            price = 0;
        }

        return CurrencyFormatter.format(price);
    }
};