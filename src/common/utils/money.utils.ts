export class MoneyUtils {
  static round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  static sum(values: Array<number | string>): number {
    const total = values.reduce<number>(
      (sum, v) => sum + Number(v),
      0,
    );

    return MoneyUtils.round(total);
  }
}
