import { IProduct } from '../interface';

export const getSplitName = (name: string) => {
  return name.substring(0, name.length / 2);
};

export const getFirstLetter = (name: string) => {
  return name.substring(0, 1);
};

export const sortArray = (array: IProduct[], quantity: number) => {
  return array.slice(0, quantity).sort((a, b) => {
    if (a.ProName < b.ProName) return -1;
    if (a.ProName > b.ProName) return 1;
    return 0;
  });
};

export const sortProduct = (products: IProduct[], filter: string) => {
  if (!filter || filter === '') {
    return products;
  }
  console.log(getSplitName(filter));
  console.log(filter);
  console.log('Aceituna'.includes('Aceite'));
  console.log('Aceituna'.includes(getSplitName('Aceite')));
  const matches = products.filter(
    (x: IProduct) => x.ProName.includes(filter) || x.ProName.includes(getSplitName(filter))
  );
  //console.log(matches);
  return sortArray(matches, 10);
};
