const formatValue = (value: number): string => {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default formatValue;
