const formatDate = (value: Date): string =>
  Intl.DateTimeFormat('pt-br').format(Date.parse(value.toString()));

export default formatDate;
