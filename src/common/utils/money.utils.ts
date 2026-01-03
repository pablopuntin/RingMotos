export class MoneyUtils {
  /**
   * Redondea un número a N decimales (default 2).
   * Se usa para normalizar valores monetarios antes de responder al frontend.
   */
  static round(value: number, decimals = 2): number {
    return Number(value.toFixed(decimals));
  }

  /**
   * Suma valores monetarios evitando errores de precisión acumulados.
   */
  static sum(values: Array<number | string>, decimals = 2): number {
    const total = values.reduce<number>(
      (sum, v) => sum + Number(v),
      0,
    );

    return MoneyUtils.round(total, decimals);
  }
}

