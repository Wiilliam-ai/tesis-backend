export class UpdateGlucoseDto {
  constructor(
    public readonly clucoseLevel: number,
    public readonly fasting: boolean,
    public readonly notes?: string
  ) {}

  static check(
    obj: any
  ): [error?: string, registerClucoseDto?: UpdateGlucoseDto] {
    const { clucoseLevel, fasting, notes, userRegisterId } = obj

    const errors: string[] = []

    if (!clucoseLevel) errors.push('clucoseLevel is required')
    if (fasting === undefined) errors.push('fasting is required')

    if (errors.length) return [errors.join(', ')]

    return [undefined, new UpdateGlucoseDto(clucoseLevel, fasting, notes)]
  }
}
