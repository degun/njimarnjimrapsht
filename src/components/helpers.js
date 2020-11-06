export function priced(number){
    return new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(number)
}