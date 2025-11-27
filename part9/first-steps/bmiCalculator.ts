interface Input {
  height: number
  weight: number
}

const parseArguments = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese'

const calculateBmi = (height: number, weight: number): BmiCategory => {
  const heightInMeters = height / 100
  if (heightInMeters <= 0) {
    throw new Error('Height must be greater than zero')
  }
  const bmi = weight / (heightInMeters * heightInMeters)

  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
  } catch (e) {
    if (e instanceof Error) {
      console.log('Error:', e.message)
    }
  }
}

export default calculateBmi
