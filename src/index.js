// Судоку - Перебор-Исключение-Рекурсия
const findEmptyCell = matrix => {
	for (i = 0; i < 9; i++) {    
    j = matrix[i].findIndex(value => value === 0);
    if(j != -1) return [i, j];    
  }
  return false;
}
const findValues = (row, col, matrix) => {
  const values = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // Набор возможных значений в ячейке
  matrix[row].forEach(value => values.delete(value));     // Удаляем совпадающие значения в строке (по горизонтали)
  for (let row = 0; row < 9; row++) {                     // Удаляем совпадающие значения в столбце (по вертикали)
    values.delete(matrix[row][col]);
  }
  const [rowMin, colMin] = [Math.floor(row / 3) * 3, Math.floor(col / 3) * 3]; // Границы квадрата 3*3
  const [rowMax, colMax] = [rowMin + 3, colMin + 3];  
  for (i = rowMin; i < rowMax; i++) {                     // Удаляем совпдающие значения в квадрате 3*3
    for (j = colMin; j < colMax; j++) {
      values.delete(matrix[i][j]);
    }
  }
  return Array.from(values);
}
module.exports = function solveSudoku(matrix) {
	const emptyCell = findEmptyCell(matrix);      // Ищем пустую ячейку
  if (!emptyCell) return matrix;                // Если пустых ячеек нет - значит судоку решено
  const [row, col] = emptyCell;  
	const values = findValues(row, col, matrix);  // Ищем подходящие значения
  for (value of values) {
    matrix[row][col] = value;                   // Присваиваем найденное значение
    solveSudoku(matrix);                        // Рекурсивно переходим к следующей пустой ячейке
    if(!findEmptyCell(matrix)) return matrix;   // Если пустых ячеек нет - значит судоку решено
  }    
  matrix[row][col] = 0;                         // Если значений нет - возвращем в исходное состояние
}